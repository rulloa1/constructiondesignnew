import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface VideoUploadProps {
  projectId: string;
  onUploadComplete: () => void;
}

export const VideoUpload = ({ projectId, onUploadComplete }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('=== VIDEO UPLOAD STARTED ===');
    const file = event.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeMB: (file.size / (1024 * 1024)).toFixed(2)
    });

    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid video file (MP4, WebM, MOV, or AVI)");
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      toast.error("Video file must be less than 500MB");
      return;
    }

    setUploading(true);
    try {
      // Check session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('Session check:', { 
        hasSession: !!session, 
        userId: session?.user?.id,
        email: session?.user?.email,
        sessionError 
      });

      if (!session) {
        throw new Error('Not authenticated. Please log in again.');
      }

      // Check admin role
      const { data: roleCheck, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');
      
      console.log('Role check:', { roleCheck, roleError, hasRole: roleCheck && roleCheck.length > 0 });

      if (roleError) {
        throw new Error(`Role check failed: ${roleError.message}`);
      }

      if (!roleCheck || roleCheck.length === 0) {
        throw new Error('Admin privileges required to upload videos');
      }

      // Prepare upload
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Date.now()}.${fileExt}`;
      console.log('Uploading to:', fileName);

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      console.log('Storage upload result:', { uploadData, uploadError });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message} (${JSON.stringify(uploadError)})`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-videos')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', publicUrl);

      // Save to database
      const { data: dbData, error: dbError } = await supabase
        .from('project_videos')
        .insert({
          project_id: projectId,
          video_url: publicUrl,
          title: title || file.name,
          description: description || null,
        })
        .select();

      console.log('Database insert result:', { dbData, dbError });

      if (dbError) {
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      console.log('=== VIDEO UPLOAD SUCCESSFUL ===');
      toast.success("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      onUploadComplete();
      
      if (event.target) event.target.value = '';
    } catch (error: any) {
      console.error('=== VIDEO UPLOAD FAILED ===');
      console.error('Error details:', error);
      const errorMessage = error.message || "Failed to upload video";
      toast.error(errorMessage, { duration: 8000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold text-foreground">Upload Video</h3>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="video-title" className="text-sm font-medium text-foreground">
            Title (optional)
          </label>
          <Input
            id="video-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="video-description" className="text-sm font-medium text-foreground">
            Description (optional)
          </label>
          <Input
            id="video-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Video description"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="video-file" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="w-full"
              asChild
            >
              <span>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Choose Video File"}
              </span>
            </Button>
          </label>
          <input
            id="video-file"
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: MP4, WebM, MOV, AVI (max 500MB)
          </p>
        </div>
      </div>
    </div>
  );
};
