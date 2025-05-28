import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi"
import notificationsData from "@/db-mock/notifications.json";

type Notification = {
  id: string;
  type: string;
  message: string;
  date: string;
}

function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function ModeratorNotification() {
  const notifications: Notification[] = [...notificationsData]
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="w-2/3 mx-auto flex flex-col mb-20">
      <div className="w-full mx-auto flex justify-between bg-solar text-sm py-4 px-6 items-center font-bold rounded-t-3xl">
        <p>NOTIFICAÇÕES</p>
        <Button
          className="text-[#711B29] hover:bg-solar hover:text-white cursor-pointer "
          variant={'ghost'}
        >
          VER TODAS
          <FiChevronRight />
        </Button>
      </div>
      <div className="w-full flex flex-col gap-4 p-6 mx-auto bg-white rounded-b-xl font-semibold shadow-sm shadow-magenta-700/50 ">
        {notifications.length > 0 ? (
          notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className="w-full h-full flex flex-col text-sm text-gray-700 bg-gray-100 rounded py-2">
              <div className="flex justify-between items-center text-sm ">
                <p className="text-magenta font-semibold mb-2">{notification.type}</p>
                <p className="text-magenta font-semibold">{notification.date}</p>
              </div>
              <div className="flex flex-col gap-2">              
              <p>{notification.message}</p>
              <Link href="" className="w-fit hover:text-solar transition">Ver {notification.type}</Link>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-sm text-gray-500">Você não possui notificações</p>
            <p className="text-sm text-gray-500">Quando houver novas notificações, elas aparecerão aqui.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ModeratorNotification