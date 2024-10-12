export function Button({ onClick, children, ...props }) {
  return (
    <button onClick={onClick} {...props}
      className="flex items-center gap-2 px-3 py-2 bg-zinc-700 rounded transition-colors duration-150 hover:bg-zinc-800"
    >
      {children}
      </button>
  )
}