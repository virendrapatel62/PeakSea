import { useCallback, useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (droppedFiles.length > 0) {
        onFilesSelected(droppedFiles);
      }
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onFilesSelected(selectedFiles);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [onFilesSelected]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleGalleryUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={cn(
          "relative bg-white rounded-2xl border-2 border-dashed cursor-pointer",
          "transition-all duration-300 ease-out overflow-hidden",
          isMobile ? "p-8 min-h-[280px]" : "p-12 min-h-[320px]",
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.02] shadow-lg"
            : isHovered
            ? "border-slate-300 bg-slate-50 shadow-md"
            : "border-slate-200 shadow-sm",
          dragContainerClassName
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Upload Icon */}
          <div
            className={cn(
              "rounded-full p-6 mb-6 transition-all duration-300",
              isDragging
                ? "bg-blue-100 scale-110"
                : isHovered
                ? "bg-slate-100 scale-105"
                : "bg-slate-50"
            )}
          >
            {isDragging ? (
              <ImageIcon
                className={cn(
                  "transition-all duration-300 text-blue-500",
                  isMobile ? "w-10 h-10" : "w-12 h-12"
                )}
              />
            ) : (
              <Upload
                className={cn(
                  "transition-all duration-300",
                  isHovered ? "text-yellow-500" : "text-slate-400",
                  isMobile ? "w-10 h-10" : "w-12 h-12"
                )}
              />
            )}
          </div>

          {/* Text */}
          <div className="space-y-2">
            <p
              className={cn(
                "transition-colors duration-200",
                isDragging ? "text-yellow-600" : "text-slate-900",
                isMobile ? "text-sm md:text-base" : "text-base"
              )}
            >
              {isDragging
                ? "Drop your images here"
                : "Drag & drop your images here"}
            </p>
            <p
              className={cn(
                "text-slate-500",
                isMobile ? "text-xs md:text-sm" : "text-sm"
              )}
            >
              Or click to browse files
            </p>

            {/* File Type Info */}
            <div className="pt-4">
              <p className="text-xs text-slate-400">
                Supported formats: JPG, PNG, GIF, WebP
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Maximum file size: 5MB
              </p>
            </div>
          </div>

          {/* Mobile Gallery Button */}
          {isMobile && (
            <button
              onClick={handleGalleryUpload}
              className={cn(
                "mt-6 px-6 py-2 bg-yellow-600 text-white rounded-xl",
                "hover:bg-yellow-500 active:scale-95 transition-all duration-200",
                "shadow-md hover:shadow-lg text-xs md:text-base",
                buttonClassName
              )}
            >
              Upload from Gallery
            </button>
          )}
        </div>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-5 pointer-events-none animate-in fade-in duration-200" />
        )}
      </div>
    </div>
  );
}
