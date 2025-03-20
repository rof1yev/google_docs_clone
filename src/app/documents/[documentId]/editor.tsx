"use client";

import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHightExtension } from "@/extensions/line-hight";
import { useEditorStore } from "@/store/use-editor-store";
import { Ruler } from "./ruler";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";
import { LEFT_MARGIN, RIGHT_MARGIN } from "@/constants";

interface EditorProps {
  initialContent: string | undefined;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const { setEditor } = useEditorStore();
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => setEditor(editor),
    onDestroy: () => setEditor(null),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
    editorProps: {
      attributes: {
        style: `padding-right: ${rightMargin ?? RIGHT_MARGIN}px; padding-left: ${leftMargin ?? LEFT_MARGIN}px;`,
        class:
          "focus:outline-none print:border-none bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Image,
      ImageResize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontSizeExtension,
      LineHightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHight: "normal",
      }),
    ],
  });

  return (
    <div className="size-full overflow-x-auto bg-[#fafbfd] px-2 md:px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
};
