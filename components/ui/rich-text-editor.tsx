"use client";

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorView } from '@tiptap/pm/view';
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, Heading2, List, ListOrdered } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUploaded?: (url: string, path: string) => void;
}

export function RichTextEditor({ 
  value, 
  onChange,
  onImageUploaded 
}: RichTextEditorProps) {
  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `inline-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    toast.loading("Uploading image...");

    const { error: uploadError } = await supabase.storage
      .from('email-assets')
      .upload(filePath, file);

    if (uploadError) {
      toast.dismiss();
      toast.error("Image upload failed", { description: uploadError.message });
      return null;
    }

    const { data } = supabase.storage
      .from('email-assets')
      .getPublicUrl(filePath);
      
    toast.dismiss();
    
    if (onImageUploaded) onImageUploaded(data.publicUrl, filePath);
    
    return data.publicUrl;
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ 
        inline: true, 
        HTMLAttributes: { class: 'rounded-xl max-w-full my-4 border border-border shadow-sm' } 
      }),
      Link.configure({ 
        openOnClick: false, 
        HTMLAttributes: { class: 'text-blue-600 underline' }
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none p-4',
      },
      handlePaste: (view: EditorView, event: ClipboardEvent) => {
        const items = Array.from(event.clipboardData?.items || []) as DataTransferItem[];
        const imageItem = items.find((item) => item.type.startsWith('image'));
        
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            handleImageUpload(file).then((url) => {
              if (url) {
                view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src: url })));
              }
            });
          }
          return true;
        }
        return false;
      }
    },
    onUpdate: ({ editor }: { editor: Editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = await handleImageUpload(file);
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl || '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border-0 bg-background h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-1 bg-muted/30 p-2 border-b border-border sticky top-0 z-10">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('bold') ? 'bg-muted text-blue-600' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('italic') ? 'bg-muted text-blue-600' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-2" />
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          className={`p-2 rounded hover:bg-muted transition-colors font-bold text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-muted text-blue-600' : ''}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-2" />
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('bulletList') ? 'bg-muted text-blue-600' : ''}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('orderedList') ? 'bg-muted text-blue-600' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-2" />
        
        <button 
          type="button" 
          onClick={setLink} 
          className={`p-2 rounded hover:bg-muted transition-colors ${editor.isActive('link') ? 'bg-muted text-blue-600' : ''}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button 
          type="button" 
          onClick={addImage} 
          className="p-2 rounded hover:bg-muted flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ImageIcon className="w-4 h-4" /> Insert Image
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-64">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}