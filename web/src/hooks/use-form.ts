"use client"

import * as React from "react"

interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isValid: boolean
  isDirty: boolean
}

interface FormOptions<T> {
  initialValues: T
  onSubmit?: (values: T) => void | Promise<void>
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useForm<T extends Record<string, any>>({ initialValues, onSubmit, validate }: FormOptions<T>) {
  const [state, setState] = React.useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
    isDirty: false,
  })

  // Reset form when initialValues change
  React.useEffect(() => {
    console.log("Resetting form with initialValues", initialValues)
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
      isDirty: false,
    })
  }, [initialValues])

  const validateForm = React.useCallback(
    (values: T) => {
      if (!validate) return {}
      return validate(values)
    },
    [validate],
  )

  const setFieldValue = React.useCallback(
    (name: keyof T, value: any) => {
      setState((prev) => {
        const newValues = { ...prev.values, [name]: value }
        const errors = validateForm(newValues)
        const isValid = Object.keys(errors).length === 0

        return {
          ...prev,
          values: newValues,
          errors,
          isValid,
          isDirty: true,
          touched: { ...prev.touched, [name]: true },
        }
      })
    },
    [validateForm],
  )

  const handleSubmit = React.useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault()

      const errors = validateForm(state.values)
      const isValid = Object.keys(errors).length === 0

      setState((prev) => ({
        ...prev,
        errors,
        isValid,
        touched: Object.keys(prev.values).reduce(
          (acc, key) => {
            acc[key as keyof T] = true
            return acc
          },
          {} as Partial<Record<keyof T, boolean>>,
        ),
      }))

      if (isValid && onSubmit) {
        await onSubmit(state.values)

        // Reset dirty state after successful submit
        setState((prev) => ({
          ...prev,
          isDirty: false,
        }))
      }
    },
    [onSubmit, state.values, validateForm],
  )

  const resetForm = React.useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
      isDirty: false,
    })
  }, [initialValues])

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    isDirty: state.isDirty,
    setFieldValue,
    handleSubmit,
    resetForm,
  }
}
