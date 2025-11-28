import { Upload } from "lucide-react";

export default function DragHere() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 md:py-12">
      <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
      <p className="text-gray-600 text-xs md:text-sm lg:text-base">
        Drag here to upload
      </p>
      <p className="text-gray-600 text-xs md:text-sm md:hidden">
        or click to select from gallery
      </p>
    </div>
  );
}
