import { Capacitor } from "@capacitor/core";

export const isNative = Capacitor.isNativePlatform();

export async function pickImageFromGallery(): Promise<string | null> {
  try {
    if (isNative) {
      const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera");
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      return image.dataUrl ?? null;
    } else {
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*";
        input.multiple = false;
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return resolve(null);
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        };
        input.click();
      });
    }
  } catch {
    return null;
  }
}

export async function pickMultipleImages(): Promise<string[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.multiple = true;
    input.onchange = async () => {
      const files = Array.from(input.files || []);
      if (!files.length) return resolve([]);
      const results = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((res) => {
              const reader = new FileReader();
              reader.onload = () => res(reader.result as string);
              reader.readAsDataURL(file);
            })
        )
      );
      resolve(results);
    };
    input.click();
  });
}

export async function getCurrentLocation(): Promise<{
  lat: number;
  lng: number;
  city?: string;
} | null> {
  try {
    if (isNative) {
      const { Geolocation } = await import("@capacitor/geolocation");
      const pos = await Geolocation.getCurrentPosition();
      return { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } else {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => resolve(null)
        );
      });
    }
  } catch {
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    if (isNative) {
      const { PushNotifications } = await import("@capacitor/push-notifications");
      const result = await PushNotifications.requestPermissions();
      return result.receive === "granted";
    } else {
      if ("Notification" in window) {
        const result = await Notification.requestPermission();
        return result === "granted";
      }
      return false;
    }
  } catch {
    return false;
  }
}

export function showLocalNotification(title: string, body: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

export function generateVideoThumbnail(videoUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 1;
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 400;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    video.onerror = () => resolve("");
  });
}

export async function saveToGallery(dataUrl: string): Promise<void> {
  if (isNative) {
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const base64 = dataUrl.split(",")[1];
    await Filesystem.writeFile({
      path: `vibehub_${Date.now()}.jpg`,
      data: base64,
      directory: Directory.Documents,
    });
  } else {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `vibehub_${Date.now()}.jpg`;
    a.click();
  }
}

const DB_KEY = "vibehub_offline_queue";

export function queueOfflineAction(action: object) {
  const existing = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
  existing.push({ ...action, timestamp: Date.now() });
  localStorage.setItem(DB_KEY, JSON.stringify(existing));
}

export function getOfflineQueue(): object[] {
  return JSON.parse(localStorage.getItem(DB_KEY) || "[]");
}

export function clearOfflineQueue() {
  localStorage.removeItem(DB_KEY);
}
