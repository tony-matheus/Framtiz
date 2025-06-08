import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import { getSupabaseClient } from '../client';

type UploadProps = {
  file: File;
  bucket?: string;
  folder?: string;
};

export const uploadImage = async ({
  file,
  bucket = 'public-images',
  folder,
}: UploadProps) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: '', error: 'Image compression failed' };
  }

  const { storage } = getSupabaseClient();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: '', error: 'Image upload failed' };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;

  return { imageUrl, error: '' };
};

export const deleteImage = async (imageUrl: string) => {
  const bucketAndPathString = imageUrl.split('/storage/v1/object/public/')[1];
  const firstSlashIndex = bucketAndPathString.indexOf('/');

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const { storage } = getSupabaseClient();

  const { data, error } = await storage.from(bucket).remove([path]);

  return { data, error };
};

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/');
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
}

export function generateUploadId(): string {
  return `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
