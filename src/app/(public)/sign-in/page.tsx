import { FiChevronLeft } from "react-icons/fi";
import  Link  from "next/link";
import { Button } from "@/components/ui/button"
import SignInput from "./components/SignInput";



function page(){
  return(
    <div className="flex flex-col w-[393px] m-auto justify-center">
      <header className="w-full h-36">
        <Link href="/initial" className="pointer"><FiChevronLeft className="m-12" size={24}/></Link>
      </header>
      <div className="w-full">
        <h1 className="font-bold text-[45px] ml-12">Olá!</h1>
        <p className="italic text-[15px] ml-12">Bom te ver de novo!</p>
        <SignInput placeholder={"email"}/>
        <SignInput placeholder={"senha"}/>
      </div>
      <div className="w-[305px] flex justify-end italic">
        <Link href="/#" className=" pointer underline text-right mt-7">Esqueceu sua senha?</Link>
      </div>
      <div className="w-full flex justify-center">
        <Button className="bg-[#E05D00] w-44 h-10 rounded-xl inset-shadow-border shadow-neutral-800 inset-shadow-xl">Continuar</Button>
      </div>
      
    </div>
    
  );
}

export default page;