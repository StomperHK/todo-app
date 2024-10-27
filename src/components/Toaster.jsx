import { useRef, useEffect } from "react";

import { X } from "react-feather";

import styles from "./css/modal.module.css";


export function Toaster({ toasterState: {isVisible, status, title}, setToasterState }) {
  const dialogRef = useRef(null)
  const closeToasterTimeout = useRef(null)

  const {modal} = styles
  const isErrorStatus = status === "error"
  

  useEffect(showToaster)
  

  function showToaster() {
    if (isVisible) {
      dialogRef.current.show()

      clearTimeout(closeToasterTimeout.current)     // automatically closes modal clearing timeout
      closeToasterTimeout.current = setTimeout(closeToaster, 3000)
    }
    else {
      dialogRef.current.close()
    }
  }

  function closeToaster() {
    setToasterState(toasterState => ({...toasterState, isVisible: false}))
  }

  return (
    <dialog ref={dialogRef} autoFocus aria-describedby={title} role="alertdialog" className={`${modal} ${isErrorStatus ? "bg-red-500" : "bg-green-300 text-black" } justify-between items-center w-full p-2 px-3 fixed top-0 left-0 right-0`}>
      <h2 className="text-base text-current">{title}</h2>

      <button onClick={closeToaster} aria-label="fechar modal de aviso" className="p-1 bg-zinc-100 bg-opacity-30 rounded focus-visible:outline-none focus-visible:bg-opacity-60 focus-visible:border-zinc-200">
        <X size={20} color="#666" />
      </button>
    </dialog>
  )
}