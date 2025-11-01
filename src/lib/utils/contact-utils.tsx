type HandleContactParams = {
  contactInfo: string;
  productId?: string;
  productTitle?: string;
  productAuthor?: string;
  priceInCents?: number;
  message?: string;
  baseUrl?: string;
};

const handleContact = ({
  contactInfo,
  productId,
  productTitle,
  productAuthor,
  priceInCents,
  message,
  baseUrl,
}: HandleContactParams) => {
  const sanitizedPhone = (contactInfo || '').replace(/\D/g, '');
  const origin =
    baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  let finalMessage =
    message || 'Olá! Tenho interesse nos Artesanatos que você faz.';

  if (productId) {
    const productUrl = `${origin}/product/${productId}`;
    const priceText =
      typeof priceInCents === 'number'
        ? ` Preço: R$ ${(priceInCents / 100).toFixed(2)}`
        : '';
    finalMessage =
      `Olá! Tenho interesse no produto: ${productTitle || ''} por ${productAuthor || ''}.${priceText} ${productUrl}`.trim();
  }

  const whatsappUrl = `https://wa.me/+55${sanitizedPhone}?text=${encodeURIComponent(finalMessage)}`;
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank');
  }
};

export default handleContact;
