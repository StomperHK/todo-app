export function Button({ children, className="", ...props }) {
  className = "flex items-center gap-2 px-3 py-2 bg-zinc-700 rounded transition-colors duration-150 hover:bg-zinc-600" + " " + className

  return (
    <button {...props}
      className={className}
    >
      {children}
    </button>
  )
}