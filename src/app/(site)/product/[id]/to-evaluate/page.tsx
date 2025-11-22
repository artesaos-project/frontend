'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productApi, reviewsApi, uploadApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { TbTrash } from 'react-icons/tb';
import { toast } from 'sonner';

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-8 w-8 cursor-pointer transition-all duration-200 ${
            star <= (hoveredRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      ))}
    </div>
  );
};

export default function ProductEvaluationPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const id = params?.id as string;

  useEffect(() => {
    if (id) apiProduto(id);
  }, [id]);

  const apiProduto = async (id: string) => {
    try {
      setIsLoadingProduct(true);
      const response = await productApi.getById(id);
      setProduct(response);
    } catch (error) {
      console.error('Erro ao buscar produto', error);
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Produto não encontrado.';
        toast.error(message);
      } else {
        toast.error('Erro ao carregar produto. Tente novamente.');
      }
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    // Validar tamanho dos arquivos (máximo 10MB por arquivo)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`O arquivo ${file.name} é muito grande. Máximo 10MB.`);
        return false;
      }
      return true;
    });

    setMedia((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveAll = () => {
    setMedia([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveOne = (idx: number) =>
    setMedia((prev) => prev.filter((_, i) => i !== idx));

  const createReviewMutation = useMutation({
    mutationFn: async () => {
      if (!id || rating === 0) {
        throw new Error('Avalie o produto com pelo menos 1 estrela.');
      }

      const attachmentIds: string[] = [];

      // Upload de arquivos em paralelo para melhor performance
      if (media.length > 0) {
        try {
          const uploadPromises = media.map((file) =>
            uploadApi.uploadFile(file),
          );
          const uploadResponses = await Promise.all(uploadPromises);

          uploadResponses.forEach((response) => {
            if (response?.attachmentId) {
              attachmentIds.push(response.attachmentId);
            }
          });
        } catch (error) {
          console.error('Erro ao fazer upload dos arquivos', error);
          throw new Error(
            'Erro ao fazer upload dos arquivos. Tente novamente.',
          );
        }
      }

      const payload = {
        productId: id,
        rating,
        comment: reviewText || null,
        imageIds: attachmentIds.length ? attachmentIds : null,
      };

      return reviewsApi.createReview(id, payload);
    },
    onSuccess: () => {
      toast.success('Avaliação enviada com sucesso!');

      setRating(0);
      setReviewText('');
      setMedia([]);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => {
        router.push(`/product/${id}`);
        window.scrollTo({ top: 0 });
      }, 1200);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Ocorreu um erro desconhecido.';
        toast.error(message);
      } else {
        toast.error('Ocorreu um erro ao fazer review do produto.');
      }
    },
  });

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando produto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Produto não encontrado</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-green-600 px-4 py-3 flex items-center justify-center gap-4 relative">
        <Button
          onClick={() => {
            router.push(`/product/${id}`);
            window.scrollTo({ top: 0 });
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
          <div className="flex items-center rounded-lg border p-4">
            <Image
              src={product.coverPhoto || 'https://placehold.co/100x100.png'}
              alt={product.title}
              width={150}
              height={100}
              className="rounded-lg object-fill h-full"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="mt-2 text-sm text-gray-500">
                Artesão: {product.authorName}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Avalie este produto</h3>
            <StarRating rating={rating} setRating={setRating} />
          </div>
        </div>

        <div className="mt-8">
          <Label htmlFor="review" className="text-lg font-semibold block">
            Compartilhe sua opinião
          </Label>
          <Textarea
            id="review"
            placeholder="Escreva aqui..."
            className="mt-4 min-h-[120px]"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-center">
            Adicione foto(s)
          </h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-row w-full mb-4 border-2 mt-4 border-dashed justify-center gap-15 items-center border-sakura rounded-xl p-6 text-midnight text-center hover:bg-sakura-100 transition"
          >
            <div className="flex flex-row items-center text-sakura gap-2">
              <FaRegImage size={32} />
              <span>Foto</span>
            </div>
          </button>

          <div className="flex flex-wrap gap-4 mb-4">
            {media
              .filter((file) => file.type.startsWith('image/'))
              .map((file, idx) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={file.name}
                    className="w-36 h-32 object-cover rounded-lg border cursor-pointer"
                    onClick={() => handleRemoveOne(idx)}
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                );
              })}
          </div>

          <div className="w-full flex flex-col gap-5">
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-full text-lg"
            >
              + Adicionar
            </Button>
            <Button
              variant="secondary"
              onClick={handleRemoveAll}
              className="w-full rounded-full text-lg"
            >
              <TbTrash size={20} className="inline-block mr-2" />
              Remover todas as mídias
            </Button>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => createReviewMutation.mutate()}
          disabled={createReviewMutation.isPending}
          className="mt-8 w-full text-lg rounded-full"
        >
          {createReviewMutation.isPending ? 'Enviando...' : 'Enviar avaliação'}
        </Button>
      </div>
    </div>
  );
}
