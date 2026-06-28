export const IMAGE_THEMES = [
  { id: "normal",   name: "Normal",   filter: "none" },
  { id: "warm",     name: "Warm",     filter: "sepia(0.4) saturate(1.4) brightness(1.05)" },
  { id: "cool",     name: "Cool",     filter: "hue-rotate(30deg) saturate(1.2) brightness(1.05)" },
  { id: "vivid",    name: "Vivid",    filter: "saturate(1.8) contrast(1.1)" },
  { id: "dramatic", name: "Dramatic", filter: "contrast(1.4) brightness(0.9) saturate(0.8)" },
  { id: "vintage",  name: "Vintage",  filter: "sepia(0.6) contrast(1.1) brightness(0.95) saturate(0.8)" },
  { id: "noir",     name: "Noir",     filter: "grayscale(1) contrast(1.3) brightness(0.95)" },
  { id: "golden",   name: "Golden",   filter: "sepia(0.3) hue-rotate(-20deg) saturate(1.6) brightness(1.1)" },
  { id: "fade",     name: "Fade",     filter: "brightness(1.1) saturate(0.6) contrast(0.85)" },
  { id: "rose",     name: "Rose",     filter: "hue-rotate(300deg) saturate(1.3) brightness(1.05)" },
  { id: "cold",     name: "Cold",     filter: "hue-rotate(180deg) saturate(0.8) brightness(1.1)" },
  { id: "lomo",     name: "Lomo",     filter: "contrast(1.5) saturate(1.5) brightness(0.85) hue-rotate(-10deg)" },
];

export async function compressImage(
  file: File,
  opts: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<string> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.82 } = opts;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function compressImages(
  files: FileList | File[],
  maxCount: number,
  opts?: { maxWidth?: number; maxHeight?: number; quality?: number }
): Promise<string[]> {
  const arr = Array.from(files).slice(0, maxCount);
  return Promise.all(arr.map((f) => compressImage(f, opts)));
}
