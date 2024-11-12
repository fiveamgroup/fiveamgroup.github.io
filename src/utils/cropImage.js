export const getCroppedImg = (imageSrc, crop, rotation, imageDimensions) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Ensure that the crop coordinates and dimensions are properly calculated
      const safeArea = Math.max(image.width, image.height) * 2;
      canvas.width = safeArea;
      canvas.height = safeArea;

      ctx.translate(safeArea / 2, safeArea / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      const data = ctx.getImageData(0, 0, safeArea, safeArea);
      canvas.width = crop.width;
      canvas.height = crop.height;

      // Adjust the crop dimensions and coordinates based on the original image size
      ctx.putImageData(data, -crop.x, -crop.y);

      // Crop the image to the selected area
      canvas.toBlob((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    };
    image.onerror = (error) => reject(error);
  });
