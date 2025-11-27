import { useCallback } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import DragHere from "./drag-here.component";
import DropHere from "./drop-here.component";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";
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
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "w-full border-2 border-dashed rounded-lg transition-colors flex items-center justify-center",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400",
          dragContainerClassName,
          "cursor-pointer"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? <DropHere /> : <DragHere />}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className={cn(
          "w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity",
          buttonClassName
        )}
      >
        <Upload className="w-5 h-5" />
        <span>Upload</span>
      </button>
    </div>
  );
}
