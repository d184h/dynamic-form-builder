import { useCallback, useReducer } from 'react'
import { FieldType } from './types'
import { FieldItem } from './FieldItem'
import './styles.css'
import { fieldReducer } from './reducer'

export const DynamicForm = () => {
  const [fields, dispatch] = useReducer(fieldReducer, [])

  const addField = useCallback(
    (type: FieldType) => {
      dispatch({ type: 'fieldAdd', fieldType: type })
    },
    [dispatch]
  )

  const removeField = useCallback(
    (id: string) => {
      dispatch({ type: 'fieldRemove', id })
    },
    [dispatch]
  )

  const handleLabelChange = useCallback(
    (id: string, label: string) => {
      dispatch({ type: 'labelChange', id, label })
    },
    [dispatch]
  )

  const handleValueChange = useCallback(
    (id: string, value: string | boolean) => {
      dispatch({ type: 'valueChange', id, value })
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (fields.length) {
        console.log(fields)
        dispatch({ type: 'formReset' })
      }
    },
    [fields, dispatch]
  )

  return (
    <div className='form'>
      <h1>Dynamic Form Builder</h1>

      <div className='btn'>
        <button onClick={() => addField('text')}>
          Добавить текстовое поле
        </button>
        <button onClick={() => addField('checkbox')}>Добавить checkbox</button>
        <button onClick={() => addField('dropdown')}>Добавить dropdown</button>
      </div>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FieldItem
            key={field.id}
            field={field}
            onLabelChange={(id, label) => handleLabelChange(id, label)}
            onValueChange={(id, value) => handleValueChange(id, value)}
            onRemove={(id) => removeField(id)}
          />
        ))}

        <button
          type='submit'
          disabled={!fields.length}
          style={{ marginTop: '10px' }}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}
