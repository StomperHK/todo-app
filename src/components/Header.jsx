import { useState } from "react"

import { IconButton } from "./IconButton"
import { Sun, Moon } from "react-feather"

function ColorSwitch() {
  const [colorMode, setColorMode] = useState("dark")

  function toggleColorMode() {
    const newColorMode = colorMode === "light" ? "dark" : "light"

    setColorMode(newColorMode)
  }

  return (
    <IconButton className="rounded-full" onClick={toggleColorMode}>
      {colorMode === "dark" ? <Sun /> : <Moon />}
    </IconButton>
  )
}

export function Header() {
  return (
    <header className=" p-4 bg-zinc-800">
      <div className="flex justify-between items-center max-w-5xl m-auto">  {/* flex-wrapper */}
        <p>logo</p>
        <div className="h-fit">
          <ColorSwitch />
        </div>
      </div>
    </header>
  )
}