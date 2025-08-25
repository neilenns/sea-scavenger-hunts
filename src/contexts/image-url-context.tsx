"use client";

import { createContext, useContext, useCallback, useRef, ReactNode, useEffect } from "react";

interface ImageUrlContextValue {
  getObjectUrl: (file: File) => string;
  revokeObjectUrl: (file: File) => void;
  revokeAllUrls: () => void;
  getFileKey: (file: File) => string;
}

const ImageUrlContext = createContext<ImageUrlContextValue | undefined>(undefined);

interface ImageUrlProviderProperties {
  children: ReactNode;
}

/**
 * Provides a shared cache for object URLs to prevent creating multiple URLs
 * for the same file across different components.
 */
export function ImageUrlProvider({ children }: ImageUrlProviderProperties) {
  // Use a Map to store file -> object URL mappings
  // The key is generated from file name and lastModified to identify unique files
  const urlCacheReference = useRef(new Map<string, { file: File; url: string }>());

  const getFileKey = useCallback((file: File): string => {
    return `${file.name}-${file.lastModified}-${file.size}`;
  }, []);

  const getObjectUrl = useCallback((file: File): string => {
    const key = getFileKey(file);
    const cache = urlCacheReference.current;
    
    // Return existing URL if we already have one for this file
    if (cache.has(key)) {
      return cache.get(key)!.url;
    }
    
    // Create new URL and cache it
    const url = URL.createObjectURL(file);
    cache.set(key, { file, url });
    return url;
  }, [getFileKey]);

  const revokeObjectUrl = useCallback((file: File): void => {
    const key = getFileKey(file);
    const cache = urlCacheReference.current;
    const entry = cache.get(key);
    
    if (entry) {
      URL.revokeObjectURL(entry.url);
      cache.delete(key);
    }
  }, [getFileKey]);

  const revokeAllUrls = useCallback((): void => {
    const cache = urlCacheReference.current;
    for (const { url } of cache.values()) {
      URL.revokeObjectURL(url);
    }
    cache.clear();
  }, []);

  const contextValue: ImageUrlContextValue = {
    getObjectUrl,
    revokeObjectUrl,
    revokeAllUrls,
    getFileKey,
  };

  // Cleanup all URLs when the provider unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      revokeAllUrls();
    };
  }, [revokeAllUrls]);

  return (
    <ImageUrlContext.Provider value={contextValue}>
      {children}
    </ImageUrlContext.Provider>
  );
}

export function useImageUrl(): ImageUrlContextValue {
  const context = useContext(ImageUrlContext);
  if (!context) {
    throw new Error("useImageUrl must be used within an ImageUrlProvider");
  }
  return context;
}