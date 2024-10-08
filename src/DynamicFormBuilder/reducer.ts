import { Field, Action } from './types'
import { v4 as uuidv4 } from 'uuid'
import { defaultValues } from './defaultValues'

export const fieldReducer = (state: Field[], action: Action): Field[] => {
  switch (action.type) {
    case 'fieldAdd':
      return [
        ...state,
        {
          id: uuidv4(),
          type: action.fieldType,
          label: '',
          value: defaultValues[action.fieldType]
        }
      ]

    case 'fieldRemove':
      return state.filter((field) => field.id !== action.id)

    case 'labelChange':
      return state.map((field) =>
        field.id === action.id ? { ...field, label: action.label } : field
      )

    case 'valueChange':
      return state.map((field) =>
        field.id === action.id ? { ...field, value: action.value } : field
      )

    case 'formReset':
      return []

    default:
      return state
  }
}
