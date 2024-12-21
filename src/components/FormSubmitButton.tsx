"use client"

import { useFormStatus } from "react-dom"
import { Loader } from "lucide-react"

import { Button } from "./ui/button"

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={props.disabled || pending} {...props}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  )
}
