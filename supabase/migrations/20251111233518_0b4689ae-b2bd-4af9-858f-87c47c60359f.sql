-- Create storage bucket for project documents
INSERT INTO storage.buckets (id, name) 
VALUES ('project-documents', 'project-documents');

-- Create project_documents table
CREATE TABLE public.project_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  document_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for document access
CREATE POLICY "Documents are viewable by everyone" 
ON public.project_documents 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert documents" 
ON public.project_documents 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update documents" 
ON public.project_documents 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete documents" 
ON public.project_documents 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create storage policies for documents
CREATE POLICY "Documents are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-documents');

CREATE POLICY "Authenticated users can upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update their documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-documents' AND auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_documents_updated_at
BEFORE UPDATE ON public.project_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();