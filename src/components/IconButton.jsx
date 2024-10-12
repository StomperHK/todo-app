export function IconButton({ children, className="",  sm=false, ...props }) {
  className = `${sm ? "p-1" : "p-2"} bg-zinc-600 transition-colors duration-150 active:bg-zinc-500` + " " + className

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}