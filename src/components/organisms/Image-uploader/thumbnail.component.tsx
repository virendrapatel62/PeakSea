import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircleIcon, Loader2Icon, XCircleIcon } from "lucide-react";

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
    <div className="relative w-full h-full">
      {/* Border Progress Bar */}

      {/* Image Container */}
      <div className="w-full h-full bg-gray-200 cursor-pointer rounded-lg overflow-hidden m-1 md:m-2 relative">
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
              <Loader2Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-500 animate-spin" />
              <p className="text-gray-500 text-xs md:text-sm">Uploading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0">
            <div className="absolute bg-white/50 border-2 border-red-300 rounded-lg inset-0 flex flex-col items-center justify-center gap-2">
              <XCircleIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-500" />
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer text-xs md:text-sm"
                onClick={onRetry}
              >
                Retry Upload
              </Button>
            </div>
          </div>
        )}

        {!isUploading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20">
            <CheckCircleIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
}
