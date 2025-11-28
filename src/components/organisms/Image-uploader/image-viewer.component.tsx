import Thumbnail from "./thumbnail.component";

interface ImageFile {
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
}

export default function ImageViewer({ files, onRetry }: ImageViewerProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm md:text-base lg:text-lg">
          No images uploaded
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 justify-center">
      {files.map((file) => (
        <Thumbnail
          key={file.id}
          imageUrl={file.imageUrl}
          isUploading={file.isUploading}
          progress={file.progress}
          error={file.error}
          onRetry={onRetry ? () => onRetry(file.id) : undefined}
        />
      ))}
    </div>
  );
}

export type { ImageFile };
