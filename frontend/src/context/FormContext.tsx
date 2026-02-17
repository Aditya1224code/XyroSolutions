import { createContext } from "react"

// Export context utilities for form components
type FormItemContextValue = {
  id: string
}

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

type FormFieldContextValue = {
  name: string
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)