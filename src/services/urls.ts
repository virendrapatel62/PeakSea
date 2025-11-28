export function getImageUploadUrl(): string {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY || "";
  if (!apiKey) {
    throw new Error("VITE_IMGBB_API_KEY is not set in environment variables");
  }
  return `https://api.imgbb.com/1/upload?key=${apiKey}`;
}
