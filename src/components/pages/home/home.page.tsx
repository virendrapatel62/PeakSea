import ImageUploader from "@/components/organisms/Image-uploader/image-uploader.component";

export default function HomePage() {
  return (
    <div className="w-full">
      <ImageUploader className="w-full" buttonClassName="mt-4" />
    </div>
  );
}
