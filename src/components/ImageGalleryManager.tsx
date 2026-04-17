import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { projects } from "@/data/projects";
import { ImageUploadForm } from "@/components/admin/ImageUploadForm";
import { ImageGrid } from "@/components/admin/ImageGrid";

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

export const ImageGalleryManager = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", selectedProject)
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Failed to fetch images");
    } else {
      setImages(data || []);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) fetchImages();
  }, [selectedProject, fetchImages]);

  const handleUploadFile = async (blob: Blob, fileName: string, title: string) => {
    if (!selectedProject) return;
    setUploading(true);
    try {
      const uploadFileName = `${selectedProject}/${Date.now()}-${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(uploadFileName, blob, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("project-images").getPublicUrl(uploadFileName);

      const { error: dbError } = await supabase.from("project_images").insert({
        project_id: selectedProject,
        image_url: publicUrl,
        title: title || fileName,
        display_order: images.length,
        is_before: false,
        is_after: false,
      });
      if (dbError) throw dbError;

      toast.success("Image uploaded successfully");
      fetchImages();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(`Failed to upload: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAddByUrl = async (url: string, title: string) => {
    if (!url || !selectedProject) {
      toast.error("Please enter an image URL and select a project");
      return;
    }
    setUploading(true);
    const { error } = await supabase.from("project_images").insert({
      project_id: selectedProject,
      image_url: url,
      title: title || `Image ${images.length + 1}`,
      display_order: images.length,
      is_before: false,
      is_after: false,
    });
    setUploading(false);
    if (error) {
      toast.error(`Failed to add image: ${error.message}`);
    } else {
      toast.success("Image added successfully");
      fetchImages();
    }
  };

  const handleReorder = async (reordered: ProjectImage[]) => {
    for (const [index, img] of reordered.entries()) {
      await supabase.from("project_images").update({ display_order: index }).eq("id", img.id);
    }
    toast.success("Order updated");
    fetchImages();
  };

  const handleDelete = async (image: ProjectImage) => {
    const fileName = image.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("project-images").remove([`${selectedProject}/${fileName}`]);
    }
    const { error } = await supabase.from("project_images").delete().eq("id", image.id);
    if (error) {
      toast.error("Failed to delete image");
    } else {
      toast.success("Image deleted");
      fetchImages();
    }
  };

  const handleToggleBeforeAfter = async (image: ProjectImage, field: "is_before" | "is_after") => {
    const { error } = await supabase
      .from("project_images")
      .update({ [field]: !image[field] })
      .eq("id", image.id);
    if (error) {
      toast.error("Failed to update image");
    } else {
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
        <Label htmlFor="project">Select Project</Label>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Choose a project" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProject && (
          <div className="mt-4">
            <ImageUploadForm
              selectedProject={selectedProject}
              uploading={uploading}
              onUploadFile={handleUploadFile}
              onAddByUrl={handleAddByUrl}
            />
          </div>
        )}
      </div>

      <ImageGrid
        images={images}
        onReorder={handleReorder}
        onDelete={handleDelete}
        onToggleBeforeAfter={handleToggleBeforeAfter}
      />
    </div>
  );
};
