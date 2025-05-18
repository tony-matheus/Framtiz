'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

import DropZone from './drop-zone';
import UploadPlaceholder from './upload-placeholder';
import {
  uploadFile,
  generateUploadId,
  isImageFile,
  isVideoFile,
} from '@/lib/services/storage/upload-service';

type UploadingFile = {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'error' | 'success';
  error?: string;
  url?: string;
};

interface BlogContentEditorProps {
  content: string;
  onContentChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function BlogContentEditor({
  content,
  onContentChange,
}: BlogContentEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileDrop = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (isImageFile(file) || isVideoFile(file)) {
        handleFileUpload(file);
      }
    });
  };

  const handleFileUpload = async (file: File) => {
    const uploadId = generateUploadId();

    const placeholderText = `![Uploading ${file.name}...](upload-placeholder-${uploadId})`;

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;

      const textBefore = content.substring(0, cursorPos);
      const textAfter = content.substring(cursorPos);

      const newTextBefore =
        textBefore.endsWith('\n') || textBefore === ''
          ? textBefore
          : textBefore + '\n';
      const newTextAfter =
        textAfter.startsWith('\n') || textAfter === ''
          ? textAfter
          : '\n' + textAfter;

      onContentChange(newTextBefore + placeholderText + newTextAfter);

      setUploadingFiles((prev) => [
        ...prev,
        {
          id: uploadId,
          file,
          progress: 0,
          status: 'uploading',
        },
      ]);
    }

    try {
      const progressInterval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((item) =>
            item.id === uploadId
              ? { ...item, progress: Math.min(item.progress + 10, 90) }
              : item
          )
        );
      }, 300);

      const response = await uploadFile(file);

      clearInterval(progressInterval);

      setUploadingFiles((prev) =>
        prev.map((item) =>
          item.id === uploadId
            ? { ...item, progress: 100, status: 'success', url: response.url }
            : item
        )
      );

      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const markdownText =
        fileType === 'image'
          ? `![${file.name}](${response.url})`
          : `<video controls src="${response.url}" title="${file.name}"></video>`;

      onContentChange((prev) => prev.replace(placeholderText, markdownText));

      setUploadingFiles((prev) => prev.filter((item) => item.id !== uploadId));
    } catch (error) {
      console.error('Upload failed:', error);

      setUploadingFiles((prev) =>
        prev.map((item) =>
          item.id === uploadId
            ? {
                ...item,
                status: 'error',
                error: 'Upload failed. Please try again.',
              }
            : item
        )
      );

      onContentChange((prev) =>
        prev.replace(placeholderText, `<!-- Upload failed for ${file.name} -->`)
      );
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          handleFileUpload(file);
          break;
        }
      }
    }
  };

  return (
    <>
      {/* Tabs */}
      <div className='border-b border-slate-800'>
        <div className='flex space-x-1'>
          <button
            onClick={() => setActiveTab('edit')}
            className={cn(
              'px-4 py-2 font-mono text-sm flex items-center gap-2',
              activeTab === 'edit'
                ? 'border-b-2 border-purple-600 text-purple-300'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Edit3 size={16} />
            EDIT
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'px-4 py-2 font-mono text-sm flex items-center gap-2',
              activeTab === 'preview'
                ? 'border-b-2 border-green-400 text-green-300'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Eye size={16} />
            PREVIEW
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className='min-h-[400px]'>
        {activeTab === 'edit' ? (
          <div className='relative'>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className='w-full h-[400px] bg-slate-800 border border-slate-700 p-4 text-slate-200 focus:border-purple-600 outline-none transition-colors font-mono resize-none'
              placeholder='Write your blog post in Markdown... Drag and drop images to upload'
              onPaste={handlePaste}
            />

            {/* Drop Zone for file uploads */}
            <DropZone onFileDrop={handleFileDrop} />

            {/* Display uploading files */}
            {uploadingFiles.length > 0 && (
              <div className='mt-4 space-y-2'>
                {uploadingFiles.map((file) => (
                  <UploadPlaceholder
                    key={file.id}
                    id={file.id}
                    name={file.file.name}
                    size={file.file.size}
                    status={file.status}
                    progress={file.progress}
                    error={file.error}
                  />
                ))}
              </div>
            )}

            {/* Drag overlay hint */}
            <div className='text-xs text-slate-500 pointer-events-none'>
              Drag & drop images to upload
            </div>
          </div>
        ) : (
          <CyberCard
            withCornerAccents={false}
            className='h-[400px] overflow-auto'
          >
            <CyberCardContent className='prose prose-invert max-w-none'>
              {content ? (
                <ReactMarkdown>{content === '' ? null : content}</ReactMarkdown>
              ) : (
                <div className='text-slate-500 italic'>
                  No content to preview
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        )}
      </div>
    </>
  );
}
