export interface UploadResponse {
  url: string;
  name: string;
  size: number;
  type: string;
  id: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Create a local object URL for the file (for demo purposes)
  // In a real app, you would upload to a server and get a URL back
  const url = URL.createObjectURL(file);

  // Return mock response
  return {
    url,
    name: file.name,
    size: file.size,
    type: file.type,
    id: `file-${Date.now()}`,
  };
}

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
