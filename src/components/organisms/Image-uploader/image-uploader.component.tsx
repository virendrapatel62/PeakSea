import { useCallback, useState } from "react";
import shortid from "shortid";
import { uploadImage } from "@/services/image-upload.service";
import ImageSelector from "./image-selector.component";
import ImageViewer, { type ImageFile } from "./image-viewer.component";

interface ImageUploaderProps {
  className?: string;
  dragContainerClassName?: string;
  buttonClassName?: string;
}

export default function ImageUploader({
  className,
  dragContainerClassName,
  buttonClassName,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<ImageFile[]>([]);

  // Reusable upload function
  const uploadFile = useCallback(
    (file: File, fileId: string, imageUrl: string) => {
      // Update state to show uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                isUploading: true,
                progress: 0,
                error: false,
              }
            : f
        )
      );

      // Start upload with progress tracking
      uploadImage(file, (progress) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  progress: progress.progress,
                  isUploading: progress.progress < 100,
                }
              : f
          )
        );
      })
        .then((response) => {
          // Update with final URL from server
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    imageUrl: response.data?.url || imageUrl,
                    isUploading: false,
                    progress: 100,
                    error: false,
                  }
                : f
            )
          );
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    isUploading: false,
                    progress: 0,
                    error: true,
                  }
                : f
            )
          );
        });
    },
    []
  );

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      selectedFiles.forEach((file) => {
        const fileId = shortid.generate();
        const imageUrl = URL.createObjectURL(file);

        // Add file to state immediately
        setFiles((prev) => [
          ...prev,
          {
            id: fileId,
            imageUrl,
            isUploading: true,
            progress: 0,
            error: false,
            file, // Store original file for retry
          },
        ]);

        // Start upload
        uploadFile(file, fileId, imageUrl);
      });
    },
    [uploadFile]
  );

  const handleRetry = useCallback(
    (fileId: string) => {
      const fileToRetry = files.find((f) => f.id === fileId);
      if (fileToRetry?.file) {
        uploadFile(fileToRetry.file, fileId, fileToRetry.imageUrl);
      }
    },
    [files, uploadFile]
  );

  const handleRemove = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  return (
    <div className="max-w-5xl mx-auto grid p-4  gap-6">
      <ImageSelector
        onFilesSelected={handleFilesSelected}
        className={className}
        dragContainerClassName={dragContainerClassName}
        buttonClassName={buttonClassName}
      />
      <ImageViewer
        onRetry={handleRetry}
        onRemove={handleRemove}
        files={files}
      />
    </div>
  );
}
