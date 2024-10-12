import styles from "./css/Checkbox.module.css"

export function Checkbox({ checked, onChange, ...props }) {
  const { checkboxInput, checkboxChecker } = styles;

  return (
    <div className="checkboxPlaceholder w-5.5 h-5.5 border-2 border-zinc-300 rounded relative">
      <input type="checkbox" checked={checked} onChange={onChange} {...props} className={`${checkboxInput} w-5 h-5 opacity-0`} />
      <div className={`${checkboxChecker} w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none rounded-sm bg-zinc-300 transition-transform duration-150 ease-linear`}></div>
    </div>
  )
}