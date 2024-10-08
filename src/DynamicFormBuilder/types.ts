export type FieldType = 'text' | 'checkbox' | 'dropdown'

export interface Field {
  id: string
  type: FieldType
  label: string
  value: string | boolean
}

export interface DefaultValues {
  text: string
  checkbox: boolean
  dropdown: string
}

export type Action =
  | { type: 'fieldAdd'; fieldType: FieldType }
  | { type: 'fieldRemove'; id: string }
  | { type: 'labelChange'; id: string; label: string }
  | { type: 'valueChange'; id: string; value: string | boolean }
  | { type: 'formReset' }
