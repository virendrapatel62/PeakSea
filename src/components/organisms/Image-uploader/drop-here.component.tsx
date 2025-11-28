import { Upload } from "lucide-react";

export default function DropHere() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 md:py-12">
      <Upload className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
      <p className="text-blue-600 text-sm md:text-base lg:text-lg font-medium">
        Drop the file here
      </p>
    </div>
  );
}
