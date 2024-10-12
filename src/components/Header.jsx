import { useState } from "react"

import { Sun, Moon } from "react-feather"

function ColorSwitch() {
  const [colorMode, setColorMode] = useState("dark")

  function toggleColorMode() {
    const newColorMode = colorMode === "light" ? "dark" : "light"

    setColorMode(newColorMode)
  }

  return (
    <button onClick={toggleColorMode}>
      {colorMode === "dark" ? <Sun /> : <Moon />}
    </button>
  )
}

export function Header() {
  return (
    <header className=" p-4 bg-zinc-800">
      <div className="flex justify-between items-center max-w-5xl m-auto">  {/* flex-wrapper */}
        <p>logo</p>
        <div>
          <ColorSwitch />
        </div>
      </div>
    </header>
  )
}