import { memo } from 'react'
import { defaultValues } from './defaultValues'
import { Field } from './types'

interface FieldProps {
  field: Field
  onLabelChange: (id: string, label: string) => void
  onValueChange: (id: string, value: string | boolean) => void
  onRemove: (id: string) => void
}

export const FieldItem = memo((props: FieldProps): JSX.Element => {
  const { field, onLabelChange, onValueChange, onRemove } = props

  return (
    <div className='field'>
      <input
        type='text'
        placeholder='Label'
        value={field.label}
        onChange={(e) => onLabelChange(field.id, e.target.value)}
        required
      />
      {field.type === 'text' && (
        <input
          type='text'
          placeholder='Enter text'
          value={String(field.value)}
          onChange={(e) => onValueChange(field.id, e.target.value)}
          required
        />
      )}
      {field.type === 'checkbox' && (
        <input
          type='checkbox'
          checked={Boolean(field.value)}
          onChange={(e) => onValueChange(field.id, e.target.checked)}
          required
        />
      )}
      {field.type === 'dropdown' && (
        <select
          value={String(field.value)}
          onChange={(e) => onValueChange(field.id, e.target.value)}
        >
          <option>{defaultValues.dropdown}</option>
          <option>Option 2</option>
        </select>
      )}

      <button type='button' onClick={() => onRemove(field.id)}>
        Удалить
      </button>
    </div>
  )
})
