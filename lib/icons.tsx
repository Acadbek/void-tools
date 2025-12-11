import {
  FileText,
  Image as ImageIcon,
  FileStack,
  Type,
  QrCode,
  Shrink,
  Wrench,
  LucideIcon
} from "lucide-react";

// String nomidan Ikonka komponentini qaytaradi
export const getIconByName = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    "FileStack": FileStack,   // PDF
    "Type": Type,             // Text
    "Image": ImageIcon,       // Image
    "QrCode": QrCode,         // Generator
    "Shrink": Shrink,         // Compressor
    // Default fallback
    "default": Wrench
  };

  return icons[name] || icons["default"];
};
