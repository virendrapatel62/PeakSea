import ImageUploader from "@/components/organisms/Image-uploader/image-uploader.component";
import Thumbnail from "@/components/organisms/Image-uploader/thumbnail.component";

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_2fr] gap-6">
        <div className="w-full h-[60vh] flex justify-center items-cente sticky top-10">
          <ImageUploader
            className="w-full"
            dragContainerClassName="h-60"
            buttonClassName="mt-4"
          />
        </div>

        <div>
          <h2 className="text-2xl font-medium mb-4 text-center">
            Uploaded Images
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 50 }).map((_, index) => (
              <Thumbnail
                key={index}
                imageUrl={`https://picsum.photos/200/300?random=${index}`}
                isUploading={index < 3}
                progress={index < 3 ? index * 20 : undefined}
                error={index === 4}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
