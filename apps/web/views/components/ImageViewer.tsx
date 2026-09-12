'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageViewerProps {
  src: string;
  alt: string;
  sizes?: string;
}

const ImageViewer = ({ src, alt, sizes = '100vw' }: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block h-full w-full cursor-zoom-in"
        aria-label={`Open ${alt} image`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} image preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 max2xs:p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative h-full w-full">
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 rounded-full bg-black/60 px-3 py-1 text-2xl leading-none text-white hover:bg-black/80"
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
