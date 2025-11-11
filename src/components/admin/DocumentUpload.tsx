import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Trash2, FileText, Download, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectDocument {
  id: string;
  project_id: string;
  document_url: string;
  title: string | null;
  description: string | null;
  file_name: string;
  file_size: number | null;
  display_order: number;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

interface DocumentUploadProps {
  projectId: string;
}

export const DocumentUpload = ({ projectId }: DocumentUploadProps) => {
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  useEffect(() => {
    if (projectId) {
      fetchDocuments();
    }
  }, [projectId]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('project_documents')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true });

    if (error) {
      toast.error("Failed to fetch documents");
    } else {
      setDocuments(data || []);
    }
  };

  const uploadFiles = async (files: FileList | File[]) => {
    if (!projectId) {
      toast.error("Please select a project first");
      return;
    }

    setUploading(true);
    const fileArray = Array.from(files);
    const progressArray: UploadProgress[] = fileArray.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'uploading' as const,
    }));
    setUploadProgress(progressArray);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      try {
        // Update progress to 30%
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, progress: 30 } : p
        ));

        const { error: uploadError } = await supabase.storage
          .from('project-documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Update progress to 60%
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, progress: 60 } : p
        ));

        const { data: { publicUrl } } = supabase.storage
          .from('project-documents')
          .getPublicUrl(fileName);

        const { error: dbError } = await supabase
          .from('project_documents')
          .insert({
            project_id: projectId,
            document_url: publicUrl,
            file_name: file.name,
            file_size: file.size,
            display_order: documents.length + i,
          });

        if (dbError) throw dbError;

        // Mark as complete
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, progress: 100, status: 'complete' } : p
        ));
      } catch (error) {
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, status: 'error' } : p
        ));
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    toast.success("Documents uploaded successfully");
    fetchDocuments();
    
    // Clear progress after 2 seconds
    setTimeout(() => setUploadProgress([]), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await uploadFiles(e.target.files);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    await uploadFiles(e.dataTransfer.files);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDragOverFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = async (document: ProjectDocument) => {
    const fileName = document.document_url.split('/').pop();
    if (!fileName) return;

    await supabase.storage
      .from('project-documents')
      .remove([`${projectId}/${fileName}`]);

    const { error } = await supabase
      .from('project_documents')
      .delete()
      .eq('id', document.id);

    if (error) {
      toast.error("Failed to delete document");
    } else {
      toast.success("Document deleted");
      fetchDocuments();
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
        <div className="mb-4">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <div 
              className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-all ${
                isDraggingFile 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-charcoal/30 hover:border-charcoal/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOverFile}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center">
                <Upload className={`mx-auto h-8 w-8 mb-2 transition-colors ${
                  isDraggingFile ? 'text-primary' : 'text-charcoal/50'
                }`} />
                <span className={`text-sm transition-colors ${
                  isDraggingFile ? 'text-primary font-medium' : 'text-charcoal/60'
                }`}>
                  {isDraggingFile ? 'Drop PDF here' : 'Click to upload PDF or drag & drop'}
                </span>
              </div>
            </div>
          </Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadProgress.map((progress, index) => (
              <div key={index} className="bg-cream/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium truncate flex-1">{progress.fileName}</span>
                  {progress.status === 'complete' && (
                    <span className="text-emerald-600 text-xs">✓ Complete</span>
                  )}
                  {progress.status === 'error' && (
                    <span className="text-red-600 text-xs flex items-center gap-1">
                      <X className="h-3 w-3" /> Failed
                    </span>
                  )}
                </div>
                <Progress 
                  value={progress.progress} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {documents.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
          <h2 className="text-xl font-playfair font-semibold mb-4">
            Project Documents ({documents.length})
          </h2>
          <div className="space-y-3">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center gap-4 p-4 bg-cream/20 rounded-lg hover:bg-cream/30 transition-colors"
              >
                <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{document.file_name}</p>
                  <p className="text-sm text-charcoal/60">{formatFileSize(document.file_size)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(document.document_url, '_blank')}
                    className="h-9 px-3"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(document)}
                    className="h-9 w-9 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};