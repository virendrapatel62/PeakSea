import ImageUploader from "@/components/organisms/Image-uploader/image-uploader.component";

export default function HomePage() {
  return (
    <div className="w-full">
      <ImageUploader
        className="w-full"
        dragContainerClassName="h-40 md:h-60"
        buttonClassName="mt-4"
      />
    </div>
  );
}
