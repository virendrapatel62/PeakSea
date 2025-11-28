import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import { getImageUploadUrl } from "./urls";

interface UploadProgress {
  progress: number; // 0-100
  loaded: number;
  total: number;
}

interface ImageUploadResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  error?: {
    message: string;
    code: number;
  };
}

interface UploadResult {
  progress: number;
  response?: ImageUploadResponse;
  error?: Error;
}

/**
 * Uploads an image to imgbb.com with progress tracking
 * @param file - The image file to upload
 * @param onProgress - Callback function that receives progress updates (0-100)
 * @returns Promise that resolves with the upload response
 */
export async function uploadImage(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<ImageUploadResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const url = getImageUploadUrl();

  try {
    const response = await axios.post<ImageUploadResponse>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress({
            progress,
            loaded: progressEvent.loaded,
            total: progressEvent.total,
          });
        }
      },
    });

    const responseData = response.data;

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.error?.message || "Upload failed");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData = error.response.data as ImageUploadResponse;
        throw new Error(
          errorData.error?.message ||
            `Upload failed with status ${error.response.status}`
        );
      } else if (error.request) {
        throw new Error("Network error occurred during upload");
      }
    }
    throw error;
  }
}

export type { UploadProgress, ImageUploadResponse, UploadResult };
