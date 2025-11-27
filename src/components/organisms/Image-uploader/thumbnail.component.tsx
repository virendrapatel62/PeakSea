import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircleIcon, Loader2Icon, X, XCircleIcon } from "lucide-react";

interface ThumbnailProps {
  imageUrl: string;
  isUploading?: boolean;
  progress?: number;
  error?: boolean;
  onRetry?: () => void;
}

export default function Thumbnail({
  imageUrl,
  isUploading = true,
  progress,
  error = false,
  onRetry,
}: ThumbnailProps) {
  return (
    <div className="relative w-40 h-40">
      {/* Border Progress Bar */}

      {/* Image Container */}
      <div className="w-40 h-40 bg-gray-200 cursor-pointer rounded-lg overflow-hidden m-2 relative">
        <img
          src={imageUrl}
          alt="Uploaded Image"
          className="w-full h-full object-cover"
        />

        {isUploading && (
          <div className="absolute inset-0">
            <Progress
              value={progress}
              className="w-full absolute bottom-0 bg-gray-300  h-2"
            />

            <div className="absolute bg-gray-400/20 inset-0 flex flex-col items-center justify-center gap-2">
              <Loader2Icon className="w-10 h-10 text-gray-500 animate-spin" />
              <p className="text-gray-500 text-xs">Uploading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0">
            <div className="absolute bg-white/50 border-2 border-red-300 rounded-lg inset-0 flex flex-col items-center justify-center gap-2">
              <XCircleIcon className="w-10 h-10 text-red-500" />
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={onRetry}
              >
                Retry Upload
              </Button>
            </div>
          </div>
        )}

        {!isUploading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20">
            <CheckCircleIcon className="w-10 h-10  text-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
}
