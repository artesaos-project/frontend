import { Input } from "@/components/ui/input";

interface SignInputProps{
  placeholder: string;
}

function SignInput(props: SignInputProps){
  return(
    <Input className="bg-[#E4F5E9] w-[265px] h-[38px] rounded-3xl ml-12 px-5 py-[15px] mt-5 placeholder:text-[#859E80] shadow-inner shadow-neutral-500 font-semibold" placeholder={props.placeholder}/>
  )
}

export default SignInput;