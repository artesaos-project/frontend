import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"

function ModeratorHeader() {
  return (
    <header className="w-full bg-solar-600">
      <nav className="pb-11 pt-17 flex justify-center gap-30 text-white font-semibold">

        <Button asChild className="text-sm py-7 !px-10 bg-solar-900 rounded-2xl hover:bg-amber-900 cursor-pointer">
          <Link href="/">
            <FiChevronLeft />
            VOLTAR
          </Link>
        </Button>
        <Button
          asChild
          className="text-sm py-7 !px-14 bg-solar-300 drop-shadow-sm shadow-black/15 hover:bg-amber-900 rounded-2xl custor-pointer">
          <Link href="/moderator">
            INÍCIO
          </Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white cursor-pointer">
          <Link href="/moderator/artisans">
            ARTESÃOS
          </Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white cursor-pointer">
          <Link href="/moderator/events">
            EVENTOS
          </Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white cursor-pointer">
          <Link href="/moderator/documents">
            DOCUMENTAÇÃO
          </Link>
        </Button>
      </nav>
    </header >
  )
}

export default ModeratorHeader