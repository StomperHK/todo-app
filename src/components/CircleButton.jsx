export function CircleButton({ onClick, children, ...props }) {
  return (
    <button onClick={onClick} className="p-2 rounded-full bg-zinc-700 transition-colors duration-150 active:bg-zinc-600" {...props}>
      {children}
    </button>
  )
}