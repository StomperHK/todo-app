import { Link } from "react-router-dom"

import { Header } from "../components/Header"
import { Button } from "../components/Button"

import { ArrowRight } from "react-feather"

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <div className="max-w-6xl m-auto">
          <figure className="flex gap-10 items-center min-h-[80vh] p-6">
            <figcaption className="w-[45%]">
              <h1 className="mb-4">Gerencie suas Tarefas de Forma Simples</h1>
              <p className="mb-4 text-lg">
                Sem login, sem recursos complexos, apenas o essencial para você ser mais produtivo. É tudo tão simples quanto essa página.
              </p>
              <Link to="/todo-app"><Button className="text-white">começar a usar <ArrowRight size={20} /></Button></Link>
            </figcaption>

              <img src="../assets/floating.svg" alt="asdw" />
          </figure>
        </div>
      </main>
    </>
  )
}