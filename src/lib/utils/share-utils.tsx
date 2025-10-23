import { toast } from 'sonner';
export const handleShare = async (
  title: string,
  text: string,
  url?: string,
) => {
  const shareUrl = url || window.location.href;

  const shareData = { title, text, url: shareUrl };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      toast.success('Compartilhado com sucesso!');
    } catch (err) {
      toast.error('Erro ao compartilhar:' + err);
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      toast.error('Não foi possível compartilhar nem copiar o link.');
    }
  } else {
    const input = document.createElement('input');
    input.value = shareUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast.success('Link copiado para a área de transferência!');
  }
};
