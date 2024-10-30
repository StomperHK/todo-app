import { forwardRef } from "react"


export const IconButton = forwardRef(function IconButton({ children, className="",  sm=false, ...props }, ref) {
  className = `${sm ? "p-1" : "p-2"} border-2 rounded border-zinc-500 bg-zinc-800 transition-colors duration-150  active:bg-opacity-40 focus-visible:bg-opacity-60 focus-visible:outline-none focus-visible:border-zinc-200` + " " + className

  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  )
})