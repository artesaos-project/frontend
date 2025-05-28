import Image from 'next/image';

function ModeratorTitle() {
  return (
    <div className='w-2/3 flex flex-col mx-auto my-16 gap-6'>
      <Image src="/Criarte.svg" alt="Moderator" width={150} height={100} />
      <h1 className="font-bold text-3xl">Moderação</h1>
    </div>
  )
}

export default ModeratorTitle