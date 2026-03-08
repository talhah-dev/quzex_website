"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import type { CSSProperties } from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border border-[#0A211F]/12 bg-[#EDF6E8] text-[#0A211F] shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]",
          title: "text-[#0A211F]",
          description: "text-[#0A211F]/70",
          actionButton:
            "bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]",
          cancelButton:
            "border border-[#0A211F]/12 bg-white text-[#0A211F] hover:bg-[#f7f9f2]",
          success:
            "border border-[#0A211F]/12 bg-[#D8F782] text-[#0A211F]",
          error:
            "border border-[#C24141]/15 bg-[#FFF5F5] text-[#8B1E1E]",
          info:
            "border border-[#0A211F]/12 bg-[#EDF6E8] text-[#0A211F]",
          warning:
            "border border-[#D6A100]/20 bg-[#FFF8E1] text-[#7A5A00]",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#EDF6E8",
          "--normal-text": "#0A211F",
          "--normal-border": "rgba(10,33,31,0.12)",
          "--success-bg": "#D8F782",
          "--success-text": "#0A211F",
          "--success-border": "rgba(10,33,31,0.12)",
          "--error-bg": "#FFF5F5",
          "--error-text": "#8B1E1E",
          "--error-border": "rgba(194,65,65,0.15)",
          "--warning-bg": "#FFF8E1",
          "--warning-text": "#7A5A00",
          "--warning-border": "rgba(214,161,0,0.2)",
          "--info-bg": "#EDF6E8",
          "--info-text": "#0A211F",
          "--info-border": "rgba(10,33,31,0.12)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
