"use client";

import { useEffect, useRef } from "react";
import { Bold, Heading2, Heading3, Italic, Link2, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ServiceRichTextEditorProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function previewMarkup(content: string) {
  if (!content.trim()) {
    return "<p>Add content to preview formatted text here.</p>";
  }

  return content;
}

export default function ServiceRichTextEditor({
  id,
  label,
  value,
  placeholder,
  onChange,
}: ServiceRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    if (editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command: string, commandValue?: string) {
    focusEditor();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  }

  function insertHtml(html: string) {
    focusEditor();
    document.execCommand("insertHTML", false, html);
    onChange(editorRef.current?.innerHTML || "");
  }

  function insertLink() {
    const url = window.prompt("Enter link URL");

    if (!url) {
      return;
    }

    runCommand("createLink", url);
  }

  return (
    <div className="grid gap-3 md:col-span-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("bold")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Bold className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("italic")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Italic className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("underline")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Underline className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("formatBlock", "h2")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Heading2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("formatBlock", "h3")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Heading3 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={insertLink}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Link2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => insertHtml("<br />")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Line Break
          </Button>
        </div>

        <div className="relative">
          {!value.trim() ? (
            <p className="pointer-events-none absolute left-3 top-3 text-sm text-[#0A211F]/40">
              {placeholder}
            </p>
          ) : null}

          <div
            ref={editorRef}
            id={id}
            contentEditable
            suppressContentEditableWarning
            onInput={(event) => onChange(event.currentTarget.innerHTML)}
            className="min-h-44 w-full rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6 [&_a]:font-medium [&_a]:text-[#0A211F] [&_a]:underline [&_em]:italic [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#0A211F] [&_h2]:my-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0A211F] [&_h3]:my-2 [&_p]:mb-3 [&_strong]:font-semibold [&_u]:underline"
          />
        </div>

        <div className="mt-4 rounded-xl border border-[#0A211F]/10 bg-white p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
            Preview
          </p>
          <div
            className="space-y-3 text-sm leading-8 text-[#0A211F]/72 [&_a]:font-medium [&_a]:text-[#0A211F] [&_a]:underline [&_em]:italic [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#0A211F] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0A211F] [&_p]:mb-3 [&_strong]:font-semibold [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: previewMarkup(value) }}
          />
        </div>
      </div>
    </div>
  );
}
