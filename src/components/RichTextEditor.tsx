"use client"

import { forwardRef } from "react"
import dynamic from "next/dynamic"
import type { EditorProps } from "react-draft-wysiwyg"

import { cn } from "@/lib/utils"

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
)

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default forwardRef<object, EditorProps>(function RichTextEditor(
  props,
  ref
) {
  return (
    <Editor
      editorClassName={cn(
        "border rounded-md px-3 min-h[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        props.editorClassName
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r)
        } else if (ref) {
          ref.current = r
        }
      }}
      {...props}
    />
  )
})
