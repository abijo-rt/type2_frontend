"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useTheme } from "@/app/theme"

export function Toaster() {
  const { toasts } = useToast()
  const {currentTheme} = useTheme()

  return (
    <ToastProvider duration={3000}  >
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className={`${currentTheme.secondary} border-2 ${currentTheme.border }`}  key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
