'use client';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import Spinner from '@/components/ui/spinner';
import useStorage from '@/hooks/storage/use-storage';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
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
    <div className=' group/wrapper relative mb-3 w-full'>
      {/* Label makes the whole area clickable */}
      <label
        className='group/image relative block h-40 cursor-pointer rounded-lg border border-slate-800 focus-within:ring-2 focus-within:ring-purple-500'
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt='Selected image'
              className='rounded-lg object-cover'
              fill
            />
          </>
        ) : (
          <Image
            src='/placeholder.svg'
            alt='placeholder'
            className='rounded-lg object-cover'
            fill
          />
        )}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 ',
            !!previewUrl && 'group-hover/image:opacity-100',
            isLoading && 'opacity-100'
          )}
        >
          <Spinner
            className={cn(
              'size-4',
              isDeleting || isLoading ? 'opacity-100' : 'opacity-0'
            )}
          />
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
      {previewUrl && (
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
      )}
    </div>
  );
}
