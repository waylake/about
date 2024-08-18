import { useState, useEffect } from "react";

export const useImageLoader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const imageElements = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      return img;
    });

    return () => {
      imageElements.forEach((img) => {
        img.onload = img.onerror = null;
      });
    };
  }, [imageUrls]);

  return imagesLoaded;
};
