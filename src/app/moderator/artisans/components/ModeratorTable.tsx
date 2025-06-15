import { Button } from "@/components/ui/button";
import { BsXLg } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import artisans from "../../../../db-mock/artisans.json";
import Link from "next/link";

function ModeratorTable() {
  const statusTranslated: Record<string, string> = {
    'PENDING': 'Pendente',
    'APPROVED': 'Aprovado',
    'REJECTED': 'Recusado',
    'INACTIVE': 'Inativo',
  };


  return (
    <div>
      <table className="w-2/3 mx-auto mt-10 text-center text-midnight border-b border-midnight text-sm">
        <thead className="bg-baby-blue">
          <tr>
            <th scope="col" className="font-semibold p-2 text-sm rounded-tl-md ring-[0.5px]">Nome</th>
            <th scope="col" className="font-semibold text-sm ring-[0.5px]">Email</th>
            <th scope="col" className="font-semibold px-6 text-sm ring-[0.5px]">Status</th>
            <th scope="col" className="font-semibold text-sm rounded-tr-md ring-[0.5px]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {artisans.map((artisan) => {
            let actionCell;

            if (artisan.status === "PENDING") {
              actionCell = (
                <div className="flex py-1 justify-center items-center gap-2.5">
                  <Button className="h-6 text-xs my-1 bg-green-600" aria-label="Aprovar artesão">
                    <FaCheck className="text-white" />
                    APROVAR
                  </Button>
                  <Button className="h-6 text-xs my-1 bg-yellow-600/75" aria-label="Editar artesão">
                    <LuPencil className="text-white" />
                    EDITAR
                  </Button>
                  <Button className="h-6 text-xs my-1 bg-red-700" aria-label="Recusar artesão">
                    <BsXLg className="text-white" />
                    RECUSAR
                  </Button>
                </div>
              );
            } else if (artisan.status === "APPROVED") {
              actionCell = (
                <div className="flex justify-center items-center gap-2.5">
                  <Button className="h-6 text-xs my-1 bg-yellow-600/75" aria-label="Editar artesão">
                    <LuPencil className="text-white" />
                    EDITAR
                  </Button>
                  <Button className="h-6 text-xs my-1 bg-white font-bold border border-red-600 text-red-600" aria-label="Desativar artesão">
                    <BsXLg className="text-red-600" />
                    DESATIVAR
                  </Button>
                </div>
              );
            } else if (artisan.status === "REJECTED") {
              actionCell = (
                <div className="flex justify-center items-center gap-2.5">
                  <Button className="h-6 text-xs my-1 bg-green-600" aria-label="Aprovar artesão">
                    <FaCheck className="text-white" />
                    APROVAR
                  </Button>
                  <Button className="h-6 text-xs my-1 bg-yellow-600/75" aria-label="Editar artesão">
                    <LuPencil className="text-white" />
                    EDITAR
                  </Button>
                </div>
              );
            } else if (artisan.status === "INACTIVE") {
              actionCell = (
                <div className="flex justify-center items-center gap-2.5">
                  <Button className="h-6 text-xs my-1 bg-white border border-green-600 text-green-600" aria-label="Aprovar artesão">
                    <FaCheck className="text-green-600" />
                    ATIVAR
                  </Button>
                  <Button className="h-6 text-xs my-1 bg-yellow-600/75" aria-label="Editar artesão">
                    <LuPencil className="text-white" />
                    EDITAR
                  </Button>
                </div>
              );
            }

            return (
              <tr key={artisan.id} className="h-9">
                <td className="ring-[0.5px]">
                  <Link href={`/moderator/artisans/${artisan.id}`} className="hover:font-semibold transition underline">
                    {artisan.name}
                  </Link>
                </td>
                <td className="ring-[0.5px]">{artisan.email}</td>
                <td className="font-semibold ring-[0.5px]">{statusTranslated[artisan.status]}</td>
                <td className="ring-[0.5px]">{actionCell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ModeratorTable;
