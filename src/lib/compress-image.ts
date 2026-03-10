"use client";

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const previewUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(previewUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error("Unable to read image."));
    };

    image.src = previewUrl;
  });
}

function createBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to compress image."));
          return;
        }

        resolve(blob);
      },
      "image/webp",
      quality
    );
  });
}

export async function compressImageFile(file: File, maxSizeKB = 100) {
  const maxSizeBytes = maxSizeKB * 1024;

  if (file.type === "image/svg+xml" || file.size <= maxSizeBytes) {
    return file;
  }

  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return file;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, image.width, image.height);

  let compressedBlob: Blob | null = null;

  for (const quality of [0.8, 0.6, 0.4, 0.2]) {
    const blob = await createBlob(canvas, quality);

    compressedBlob = blob;

    if (blob.size <= maxSizeBytes) {
      break;
    }
  }

  if (!compressedBlob || compressedBlob.size >= file.size) {
    return file;
  }

  const fileName = file.name.replace(/\.[^.]+$/, "") || "image";

  return new File([compressedBlob], `${fileName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}
