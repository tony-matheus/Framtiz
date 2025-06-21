'use client';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import Spinner from '@/components/ui/spinner';
import useStorage from '@/hooks/storage/use-storage';
import { cn } from '@/lib/utils';
import { Pencil, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ImagePreviewUploadProps {
  currentImageUrl: string | null | undefined;
  onFileSelected?: ((arg0: File | null) => void) | null;
  onFileUpload?: ((arg0: string) => void) | null;
  autoSync?: boolean;
}

export default function ImagePreviewUpload({
  currentImageUrl,
  onFileSelected = null,
  onFileUpload = null,
  autoSync = true,
}: ImagePreviewUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
    currentImageUrl
  );

  const { uploadImage, deleteImage, isDeleting, isLoading } = useStorage();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const blob = e.target.files?.[0] || null;

    if (!blob) return;

    if (autoSync) {
      if (currentImageUrl) {
        await deleteImage(currentImageUrl);
      }

      return uploadImage(blob, (imageUrl) => {
        setPreviewUrl(imageUrl);
        onFileUpload?.(imageUrl);
      });
    }

    setPreviewUrl(URL.createObjectURL(blob));
    onFileSelected?.(blob);
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className=' group/wrapper relative w-full'>
      {/* Label makes the whole area clickable */}
      <label
        className='group/image relative block h-40 cursor-pointer overflow-hidden rounded-lg border border-slate-800 focus-within:ring-2 focus-within:ring-purple-500 hover:bg-black/30'
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt='Selected image'
            className='rounded-lg object-cover'
            fill
          />
        ) : (
          <Image
            src='/placeholder.svg'
            alt='placeholder'
            className='rounded-lg object-cover '
            fill
          />
        )}
        <div
          className={cn(
            'absolute inset-0 hidden items-center justify-center bg-black/30',
            'group-hover/image:flex'
          )}
        >
          <div className='relative flex size-full items-center justify-center'>
            {(isDeleting || isLoading) && <Spinner className={cn('size-4')} />}

            {previewUrl ? (
              <div className='absolute right-2 top-2 z-50 flex flex-col items-center gap-1'>
                <CyberButton
                  variant='ghost'
                  size='icon'
                  className='absolute size-7 opacity-0 transition-opacity group-hover/image:top-0 group-hover/wrapper:opacity-100'
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  <Pencil size={14} />
                </CyberButton>
                <CyberButton
                  variant='ghost'
                  size='icon'
                  className='absolute top-[-36] size-7 text-red-500 opacity-0 transition-all hover:bg-red-900/30 hover:text-red-500 group-hover/wrapper:top-3 group-hover/wrapper:opacity-100'
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  <Trash2 size={14} />
                </CyberButton>
              </div>
            ) : (
              <div className='rounded-full bg-slate-950/30 p-4'>
                <Upload size={30} />
              </div>
            )}
          </div>
        </div>
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        name='image-uploader'
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileSelected}
      />

      {/* Action buttons */}
    </div>
  );
}
