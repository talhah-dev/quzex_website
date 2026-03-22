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

  function syncEditor() {
    onChange(editorRef.current?.innerHTML || "");
  }

  function runCommand(command: string, commandValue?: string) {
    focusEditor();
    document.execCommand(command, false, commandValue);
    syncEditor();
  }

  function insertHtml(html: string) {
    focusEditor();
    document.execCommand("insertHTML", false, html);
    syncEditor();
  }

  function insertLink() {
    const url = window.prompt("Enter link URL");

    if (!url) {
      return;
    }

    runCommand("createLink", url);
  }

  function insertTable() {
    insertHtml(
      '<table><thead><tr><th>Heading 1</th><th>Heading 2</th></tr></thead><tbody><tr><td>Value 1</td><td>Value 2</td></tr><tr><td>Value 3</td><td>Value 4</td></tr></tbody></table><p></p>'
    );
  }

  function highlightText() {
    focusEditor();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("hiliteColor", false, "#FFF2A8");
    syncEditor();
  }

  return (
    <div className="grid gap-3 md:col-span-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("formatBlock", "p")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Paragraph
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
            onClick={highlightText}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Highlight
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("insertUnorderedList")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Bullet List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runCommand("insertOrderedList")}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Numbered List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={insertTable}
            className="h-9 border-[#0A211F]/12 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            Table
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
            className="min-h-52 w-full rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6 [&_a]:font-medium [&_a]:text-[#0A211F] [&_a]:underline [&_em]:italic [&_h2]:my-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#0A211F] [&_h3]:my-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0A211F] [&_li]:ml-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_p]:mb-3 [&_strong]:font-semibold [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#0A211F]/12 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-[#0A211F]/12 [&_th]:bg-[#EDF6E8] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_u]:underline [&_ul]:mb-3 [&_ul]:list-disc"
          />
        </div>

        <div className="mt-4 rounded-xl border border-[#0A211F]/10 bg-white p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
            Preview
          </p>
          <div
            className="space-y-3 text-sm leading-8 text-[#0A211F]/72 [&_a]:font-medium [&_a]:text-[#0A211F] [&_a]:underline [&_em]:italic [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#0A211F] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0A211F] [&_li]:ml-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_p]:mb-3 [&_strong]:font-semibold [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#0A211F]/12 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-[#0A211F]/12 [&_th]:bg-[#EDF6E8] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_u]:underline [&_ul]:mb-3 [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: previewMarkup(value) }}
          />
        </div>
      </div>
    </div>
  );
}
