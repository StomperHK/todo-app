import { useRef, useEffect } from "react";

import { X } from "react-feather";

import styles from "./css/modal.module.css";


export function Toaster({ toasterState: {isVisible, status, text}, setToasterState }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeToasterTimeout = useRef(null)

  const {showModal, hideModal} = styles
  const isErrorStatus = status === "error"


  useEffect(showToaster)
  

  function showToaster() {
    if (isVisible) {
      dialogRef.current.show()
      closeButtonRef.current.focus()

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
    <dialog ref={dialogRef} className={`${isVisible && showModal} ${isErrorStatus ? "bg-red-500" : "bg-green-300 text-black" } justify-between items-center w-full p-2 px-3 fixed top-0 left-0`}>
      <h2 className="text-base text-current">{text}</h2>

      <button onClick={closeToaster} ref={closeButtonRef} aria-label="fechar modal de aviso" className="p-1 bg-zinc-100 bg-opacity-30 rounded">
        <X size={20} color="#666" />
      </button>
    </dialog>
  )
}