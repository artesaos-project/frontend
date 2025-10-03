'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import products from '@/db-mock/products.json';
import { FileImage, Star, Video } from 'lucide-react';

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

const FileUploadBox = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:bg-gray-50">
      {icon}
      <span className="mt-2 text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default function ProductEvaluationPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === Number(params.id));
  const [rating, setRating] = React.useState(4);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="bg-green-500 px-4 py-3 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-600 p-2 absolute left-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-semibold text-white">Avaliar produto</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Info */}
          <div className="flex items-center rounded-lg border p-4">
            <Image
              src={`/${product.img}`}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">+ informações</p>
              <p className="mt-2 text-sm text-gray-500">
                Artesão: {product.author}
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
            placeholder="Lorem ipsum dolor sit amet consectetur. Nunc risus cursus ut viverra. Pellentesque donec. Nunc ut ac aliquet non quis non id. Vitae tempus a massa velit in. Nunc sed sagittis in non. Potenti andrerit fusce ultrices morbi. Fermentum ut id ipsum aliquet adipiscing imperdiet diem convallis fringilla. Tortor libero pretium ac integer. Aliquam duis"
            className="mt-4 min-h-[120px]"
          />
        </div>

        {/* File Upload */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-center block">
            Adicione foto(s) e/ou vídeo(s)
          </h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <FileUploadBox
              icon={<FileImage className="h-8 w-8 text-gray-400" />}
              label="Foto"
            />
            <FileUploadBox
              icon={<Video className="h-8 w-8 text-gray-400" />}
              label="Vídeo"
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed"
                >
                  <FileImage className="h-8 w-8 text-gray-400" />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8 flex items-center">
          <Checkbox id="anonymous" />
          <Label htmlFor="anonymous" className="ml-2">
            Avaliar anonimamente
          </Label>
        </div>

        <Button className="mt-8 w-full bg-green-600 py-3 text-lg text-white hover:bg-green-700">
          Enviar avaliação
        </Button>
      </div>
    </div>
  );
}
