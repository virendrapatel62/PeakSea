import FilePreviewItem from "./file-preview-item.component";

export interface ImageFile {
  id: string;
  imageUrl: string;
  isUploading: boolean;
  progress: number;
  error?: boolean;
  file?: File; // Store original file for retry
}

interface ImageViewerProps {
  files: ImageFile[];
  onRetry?: (fileId: string) => void;
  onRemove?: (fileId: string) => void;
}

export default function ImageViewer({
  files,
  onRetry,
  onRemove,
}: ImageViewerProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-gray-500 text-sm md:text-base lg:text-lg">
          No images uploaded
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2">
      {files.map((file) => (
        <FilePreviewItem
          key={file.id}
          file={file}
          onRetry={onRetry || (() => {})}
          onRemove={onRemove || (() => {})}
        />
      ))}
    </div>
  );
}
