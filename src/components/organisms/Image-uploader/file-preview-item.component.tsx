import { Progress } from "@/components/ui/progress";
import {
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { ImageFile } from "./image-viewer.component";

interface FilePreviewItemProps {
  file: ImageFile;
  onRemove: (fileId: string) => void;
  onRetry: (fileId: string) => void;
}

export default function FilePreviewItem({
  file,
  onRemove,
  onRetry,
}: FilePreviewItemProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getStatus = () => {
    if (file.error) return "error";
    if (file.isUploading) return "uploading";
    if (file.progress === 100) return "success";
    return "pending";
  };

  const status = getStatus();
  const fileName = file.file?.name || "image";
  const fileSize = file.file?.size || 0;

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "uploading":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
            <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            Uploading
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            Complete
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
            <AlertCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
    }
  };

  return (
    <div
      className={`
        bg-white rounded-xl p-4 transition-all duration-300
        ${
          status === "error"
            ? "border-2 border-red-200 shadow-sm"
            : "border border-slate-100 shadow-sm hover:shadow-md"
        }
      `}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
            <img
              src={file.imageUrl}
              alt={fileName}
              className="w-full h-full object-cover"
            />
            {status === "success" && (
              <div className="absolute inset-0 bg-green-500/10 bg-opacity-20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            )}
            {status === "error" && (
              <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            )}
          </div>
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 truncate" title={fileName}>
                {fileName}
              </p>
              <p className="text-slate-500 text-sm mt-0.5">
                {formatFileSize(fileSize)}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">{getStatusBadge()}</div>
          </div>

          {/* Progress Bar */}
          {(status === "uploading" || status === "pending") && (
            <div className="mb-2">
              <Progress value={file.progress} className="h-2" />
              <p className="text-xs text-slate-500 mt-1">
                {Math.round(file.progress)}% uploaded
              </p>
            </div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <div className="mb-2">
              <p className="text-sm text-red-600">
                Upload failed. Please try again.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            {status === "error" && (
              <button
                onClick={() => onRetry(file.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white 
                         rounded-lg hover:bg-blue-600 active:scale-95 transition-all text-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            )}
            <button
              onClick={() => onRemove(file.id)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                cursor-pointer
                active:scale-95 transition-all text-sm
                ${
                  status === "error"
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
              `}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
