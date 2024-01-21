import type { JSX } from 'solid-js'
import styles from './CheckBox.module.scss'

export interface CheckBoxProps {
  class?: string
  isChecked: boolean
  children?: JSX.Element
  onChange: (checked: boolean) => void
}

export function CheckBox({
  class: cl,
  isChecked,
  children,
  onChange,
}: CheckBoxProps) {
  return (
    <label class={cl == null ? styles.CheckBox : `${styles.CheckBox} ${cl}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(event) => {
          onChange(event.target.checked)
        }}
      />
      <span></span>
      {children && <span>{children}</span>}
    </label>
  )
}
