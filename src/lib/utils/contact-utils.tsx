const handleContact = ({ contactInfo }: { contactInfo: string }) => {
  const message = `Olá! Tenho interesse nos Artesanatos que você faz.`;
  const whatsappUrl = `https://wa.me/${contactInfo}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default handleContact;
