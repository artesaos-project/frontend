"use client";

function ContactButtons({ contactInfo, className, icon }: { contactInfo: string, className?: string, icon?: React.ReactNode }) {
    const handleContact = () => {
        const message = `Olá! Tenho interesse nos Artesanatos que você faz.`;
        const whatsappUrl = `https://wa.me/55${contactInfo}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className="flex space-x-4">
      <button onClick={handleContact} className={className}>
       {icon && <span className="mr-2">{icon}</span>}  
        Entrar em Contato
      </button>
    </div>
  );
}

export default ContactButtons;