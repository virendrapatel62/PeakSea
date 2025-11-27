import { Upload } from "lucide-react";

export default function DragHere() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Upload className="w-12 h-12 text-gray-400" />
      <p className="text-gray-600 text-lg">Drag here to upload</p>
    </div>
  );
}
