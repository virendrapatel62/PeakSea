import { useCallback } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import DragHere from "./drag-here.component";
import DropHere from "./drop-here.component";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
  onFilesSelected: (files: File[]) => void;
  className?: string;
  dragContainerClassName?: string;
  buttonClassName?: string;
}

export default function ImageSelector({
  onFilesSelected,
  className,
  dragContainerClassName,
  buttonClassName,
}: ImageSelectorProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

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
          "w-full mt-4 flex items-center justify-center gap-2 py-2 md:py-3 px-3 md:px-4 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base",
          buttonClassName
        )}
      >
        <Upload className="w-4 h-4 md:w-5 md:h-5" />
        <span className="md:hidden">Select from gallery</span>
        <span className="hidden md:inline">Upload</span>
      </button>
    </div>
  );
}
