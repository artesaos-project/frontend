'use client';

import Image from 'next/image';
import * as React from 'react';
import AuthButton from '@/components/common/auth-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { MessageSquare, Star } from 'lucide-react';
import { FaRegImage } from 'react-icons/fa6';
import { LuVideo } from 'react-icons/lu';
import { TbTrash } from 'react-icons/tb';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-8 w-8 cursor-pointer ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

// Removed FileUploadBox in favor of native <input type="file" />

type ToastType = 'success' | 'error' | null;

export default function ProductEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastType(null);
      setToastMessage('');
    }, 4000);
  };

  const id = params?.id as string;
  useEffect(() => {
    if (id) {
      apiProduto(id);
    }
  }, [id]);

  const apiProduto = async (id: string) => {
    if (!id) return;
    try {
      if (id === '1') {
        setProduct({
          id: '1',
          authorName: 'João Silva',
          authorUserName: 'joao.silva',
          authorId: 'user-1',
          title: 'Vaso de Cerâmica Artesanal',
          description: 'Vaso feito à mão, perfeito para decoração.',
          priceInCents: 12000,
          categoryId: 10,
          stock: 5,
          likesCount: 42,
          averageRating: 4.7,
          photos: [
            'https://placehold.co/100x100.png',
            'https://placehold.co/100x100.png',
          ],
          photosIds: ['photo-1', 'photo-2'],
          coverPhoto: 'https://placehold.co/100x100.png',
        });
        return;
      }
      const response = await productApi.getById(id);
      setProduct(response);
    } catch (error) {
      console.error('Erro ao buscar produto', error);
    }
  };

  const [rating, setRating] = React.useState<number>(0);

  const handleCustomClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setMedia((prev) => [...prev, ...files]);
  };

  const handleRemove = () => {
    setMedia([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveOne = (idx: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (rating === 0) {
      showToast(
        'Por favor, avalie o produto com pelo menos 1 estrela!',
        'error',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implementar chamada à API
      // const formData = new FormData();
      // formData.append('productId', id);
      // formData.append('rating', rating.toString());
      // formData.append('reviewText', reviewText);
      // formData.append('isAnonymous', isAnonymous.toString());
      // media.forEach((file) => formData.append('media', file));
      // await reviewApi.create(formData);

      // Simulação de envio (remover quando integrar com API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast(
        'Avaliação enviada com sucesso! Obrigado pelo seu feedback!',
        'success',
      );

      // Limpar formulário
      setRating(0);
      setReviewText('');
      setMedia([]);
      setIsAnonymous(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Redirecionar de volta para a página do produto após 2 segundos
      setTimeout(() => {
        router.push(`/product/${id}`);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      showToast(
        'Erro ao enviar avaliação. Por favor, tente novamente.',
        'error',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div>
      {/* Toast Notification */}
      {toastType && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium animate-fade-in ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toastMessage}
        </div>
      )}

      <div className="bg-green-600 px-4 py-3 flex items-center justify-center gap-4">
        <Button
          onClick={() => {
            // Garante que ao voltar o scroll vá para o topo
            // Preferimos navegar explicitamente para /product/[id] para evitar histórico inconsistente
            router.push(`/product/${id}`);
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-700 p-2 absolute left-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-white" />
          <h1 className="text-xl font-semibold text-white">Avaliar produto</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Info */}
          <div className="flex items-center rounded-lg border p-4">
            <Image
              src={product.coverPhoto || 'https://placehold.co/100x100.png'}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product?.title}</h2>
              <p className="text-sm text-gray-600">+ informações</p>
              <p className="mt-2 text-sm text-gray-500">
                Artesão: {product?.authorName}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Avalie este produto</h3>
            <StarRating rating={rating} setRating={setRating} />
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-8">
          <Label
            htmlFor="review"
            className="text-lg font-semibold text-center block"
          >
            Compartilhe sua opinião sobre o produto
          </Label>
          <Textarea
            id="review"
            placeholder="Escreva aqui..."
            className="mt-4 min-h-[120px]"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-center block">
            Adicione foto(s) e/ou vídeo(s)
          </h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
          <button
            type="button"
            onClick={handleCustomClick}
            className="flex flex-row w-full mb-4 border-2 mt-4 border-dashed justify-center gap-15 items-center border-sakura rounded-xl p-6 text-midnight text-center hover:bg-sakura-100 transition"
          >
            <div className="flex flex-row items-center text-sakura">
              <FaRegImage size={40} />
              <span>Foto</span>
            </div>
            <div className="flex flex-row items-center text-sakura">
              <LuVideo size={40} />
              <span>Vídeo</span>
            </div>
          </button>

          <div className="flex flex-wrap gap-4 mb-4">
            {media.map((file, idx) => {
              const url = URL.createObjectURL(file);
              if (file.type.startsWith('image/')) {
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={file.name}
                    className="w-36 h-32 object-cover rounded-lg border"
                    onLoad={() => URL.revokeObjectURL(url)}
                    onClick={handleRemoveOne.bind(null, idx)}
                  />
                );
              }
              if (file.type.startsWith('video/')) {
                return (
                  <video
                    key={idx}
                    src={url}
                    controls
                    className="w-36 h-32 object-cover rounded-lg border"
                    onLoadedData={() => URL.revokeObjectURL(url)}
                    onClick={handleRemoveOne.bind(null, idx)}
                  />
                );
              }
              return null;
            })}
          </div>
          <AuthButton
            className="mb-4 bg-olivine"
            text=" + Adicionar"
            onClick={handleCustomClick}
          />
          <AuthButton
            className=" bg-sakura hover:bg-salmon mb-4"
            text="Remover todas as mídias"
            onClick={handleRemove}
            icon={<TbTrash size={20} className="inline-block mr-2" />}
          />
        </div>

        <div className="mt-8 flex items-center">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
          />
          <Label htmlFor="anonymous" className="ml-2">
            Avaliar anonimamente
          </Label>
        </div>

        <AuthButton
          className="mt-8 bg-olivine"
          text={isSubmitting ? 'Enviando...' : 'Enviar avaliação'}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
        {/* <Button className="mt-8 w-full bg-green-600 py-3 text-lg text-white hover:bg-green-700">
          Enviar avaliação
        </Button> */}
      </div>
    </div>
  );
}
