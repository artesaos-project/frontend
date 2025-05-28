import { MdSupervisorAccount } from "react-icons/md"
import ModeratorCard from "./components/ModeratorCard"
import ModeratorHeader from "./components/ModeratorHeader"
import ModeratorTitle from "./components/ModeratorTitle"
import ModeratorNotification from "./components/ModeratorNotification"

function page() {
  return (
    <>
      <ModeratorHeader />
      <ModeratorTitle imageSrc={"Criarte.svg"} />
      <ModeratorNotification/>
      <div className="w-2/3 mx-auto flex justify-center gap-10 mb-20">
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Artesãos"} description={"Aprovar, editar, desativar contas..."} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Produtos"} description={"Visualizar, excluir produtos."} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Denúncias"} description={"Gerenciar denúncias"} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Documentação"} description={"Acessar documentos importantes."} pending={0} finished={56} />
      </div>
      

    </>

  )
}

export default page