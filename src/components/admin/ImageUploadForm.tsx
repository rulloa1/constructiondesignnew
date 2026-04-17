import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageEditor } from "@/components/ImageEditor";

interface Props {
  selectedProject: string;
  uploading: boolean;
  onUploadFile: (blob: Blob, fileName: string, title: string) => Promise<void>;
  onAddByUrl: (url: string, title: string) => Promise<void>;
}

export const ImageUploadForm = ({ selectedProject, uploading, onUploadFile, onAddByUrl }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [editingImage, setEditingImage] = useState<{ url: string; fileName: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProject) return;
    setEditingImage({ url: URL.createObjectURL(file), fileName: file.name });
    if (e.target) e.target.value = "";
  };

  const handleSave = async (blob: Blob, fileName: string) => {
    setEditingImage(null);
    await onUploadFile(blob, fileName, imageTitle);
    setImageTitle("");
  };

  const handleAddUrl = async () => {
    await onAddByUrl(imageUrl.trim(), imageTitle.trim());
    setImageUrl("");
    setImageTitle("");
  };

  if (!selectedProject) return null;

  return (
    <>
      {editingImage && (
        <ImageEditor
          imageUrl={editingImage.url}
          fileName={editingImage.fileName}
          onSave={handleSave}
          onCancel={() => setEditingImage(null)}
        />
      )}
      <div className="space-y-4">
        <div>
          <Label htmlFor="image-title">Image Title (optional)</Label>
          <Input
            id="image-title"
            type="text"
            placeholder="e.g., Living Room View"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            disabled={uploading}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="file-upload">Upload from Device</Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="mt-1"
          />
          <p className="text-xs text-charcoal/60 mt-1">Upload photos directly from your phone or computer</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-charcoal/60">Or add by URL</span>
          </div>
        </div>

        <div>
          <Label htmlFor="image-url">Image URL or Path</Label>
          <Input
            id="image-url"
            type="text"
            placeholder="/assets/project-name/image.jpg or https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={uploading}
            className="mt-1"
          />
          <p className="text-xs text-charcoal/60 mt-1">Enter a path to an image in your assets folder or an external URL</p>
        </div>

        <Button onClick={handleAddUrl} disabled={uploading || !imageUrl.trim()} className="w-full">
          {uploading ? "Adding..." : "Add Image by URL"}
        </Button>
      </div>
    </>
  );
};
