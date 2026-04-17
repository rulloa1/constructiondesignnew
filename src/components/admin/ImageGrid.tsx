import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, GripVertical } from "lucide-react";

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_before: boolean;
  is_after: boolean;
}

interface Props {
  images: ProjectImage[];
  onReorder: (reordered: ProjectImage[]) => Promise<void>;
  onDelete: (image: ProjectImage) => Promise<void>;
  onToggleBeforeAfter: (image: ProjectImage, field: "is_before" | "is_after") => Promise<void>;
}

export const ImageGrid = ({ images, onReorder, onDelete, onToggleBeforeAfter }: Props) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [localImages, setLocalImages] = useState<ProjectImage[]>(images);

  // Sync local state when parent images prop changes (e.g. after fetch)
  useEffect(() => {
    if (draggedIndex === null) {
      setLocalImages(images);
    }
  }, [images, draggedIndex]);

  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
    if (draggedIndex === null || draggedIndex === index) return;
    const next = [...localImages];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(index, 0, moved);
    setLocalImages(next);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    if (draggedIndex === null) return;
    setDraggedIndex(null);
    setDragOverIndex(null);
    await onReorder(localImages);
  };

  if (localImages.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-playfair font-semibold">Project Images ({localImages.length})</h2>
        <p className="text-sm text-charcoal/60 flex items-center gap-2">
          <GripVertical className="h-4 w-4" />
          Drag to reorder
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {localImages.map((image, index) => {
          const isDragging = draggedIndex === index;
          const isDropTarget = dragOverIndex === index && draggedIndex !== index;
          return (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDragLeave={() => setDragOverIndex(null)}
              className={`relative group rounded-lg transition-all duration-200 cursor-move overflow-hidden border-2 ${
                isDragging
                  ? "opacity-40 scale-95 ring-2 ring-primary border-primary"
                  : isDropTarget
                  ? "ring-4 ring-accent scale-105 shadow-lg border-accent"
                  : "bg-cream/20 hover:bg-cream/40 hover:shadow-md border-transparent hover:border-primary/30"
              }`}
            >
              <div className="absolute top-2 left-2 z-10 bg-primary/90 rounded-full p-1.5 shadow-md group-hover:bg-primary transition-colors">
                <GripVertical className="h-5 w-5 text-white" />
              </div>
              <img src={image.image_url} alt={image.title || "Project image"} className="w-full aspect-square object-cover" />
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Image {index + 1}</p>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(image)} className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Checkbox checked={image.is_before} onCheckedChange={() => onToggleBeforeAfter(image, "is_before")} />
                    <Label className="text-xs cursor-pointer">Before</Label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Checkbox checked={image.is_after} onCheckedChange={() => onToggleBeforeAfter(image, "is_after")} />
                    <Label className="text-xs cursor-pointer">After</Label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
