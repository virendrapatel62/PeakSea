import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import type { ImageFile } from "./image-viewer.component";

interface OverallProgressProps {
  files: ImageFile[];
  onClearAll: () => void;
}

export default function OverallProgress({
  files,
  onClearAll,
}: OverallProgressProps) {
  // Calculate overall progress with useMemo for optimization
  const { totalProgress, successCount } = useMemo(() => {
    if (files.length === 0) {
      return { totalProgress: 0, successCount: 0 };
    }

    const totalProgressValue =
      files.reduce((sum, file) => sum + file.progress, 0) / files.length;

    const successCountValue = files.filter(
      (file) => !file.isUploading && !file.error && file.progress === 100
    ).length;

    return {
      totalProgress: totalProgressValue,
      successCount: successCountValue,
    };
  }, [files]);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-slate-900 font-medium">Upload Progress</h3>
          <p className="text-slate-500 text-sm mt-1">
            {successCount} of {files.length} files uploaded
          </p>
        </div>
        <div className="text-blue-600 text-2xl font-semibold">
          {Math.round(totalProgress)}%
        </div>
      </div>
      <Progress value={totalProgress} className="h-2" />

      <button
        onClick={onClearAll}
        className="mt-4 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}
