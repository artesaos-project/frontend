'use client';

import {
  ArtisanStep1,
  ArtisanStep2,
  ArtisanStep3,
  ArtisanStep4,
  ArtisanStep5,
  ArtisanStep6,
  ArtisanStep7,
} from '@/components/features/sign-up/artisan-steps';
import { Step1, Step2, Step3 } from '@/components/features/sign-up/user-steps';
import { ClipboardPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { LuFileUser } from 'react-icons/lu';
import { RiImage2Fill } from 'react-icons/ri';

function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.push('/');
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const stepsIcons = [
    { icon: ClipboardPen, activeStep: 4 },
    { icon: FaRegAddressCard, activeStep: 5 },
    { icon: LuFileUser, activeStep: [6, 7, 8] },
    { icon: BsChatDots, activeStep: 9 },
    { icon: RiImage2Fill, activeStep: 10 },
  ];

  return (
    <div className="flex lg:w-screen lg:h-screen justify-center items-center bg-[url('/fundo-cadastro-login.svg')] bg-no-repeat bg-cover">
      <div className="w-full max-w-2xl mx-auto flex flex-col md:border-2 p-6 md:p-25 rounded-4xl">
        <div className="flex mb-10 justify-between">
          <FiChevronLeft size={24} onClick={handleBack} />
          <FiX size={24} />
        </div>
        <div
          className={
            step > 3
              ? 'flex flex-row items-center justify-center mb-6'
              : 'hidden'
          }
        >
          {stepsIcons.map(({ icon: Icon, activeStep }, idx) => {
            const stepsArr = Array.isArray(activeStep)
              ? activeStep
              : [activeStep];
            const isCurrent = stepsArr.includes(step);
            const isPast = step > Math.max(...stepsArr);
            const isFuture = step < Math.min(...stepsArr);

            let prevActiveStep = null;
            if (idx > 0) {
              const prev = stepsIcons[idx - 1].activeStep;
              prevActiveStep = Array.isArray(prev) ? Math.max(...prev) : prev;
            }

            return (
              <div key={idx} className="flex items-center justify-between">
                {idx !== 0 && (
                  <div
                    className={`w-6 lg:w-8 h-1 rounded-full transition-colors ${
                      step > (prevActiveStep ?? 0)
                        ? 'bg-olivine-600'
                        : 'bg-gray-100'
                    }`}
                  />
                )}
                <div
                  className={
                    isCurrent
                      ? 'flex bg-golden/40 rounded-full w-10 h-10 justify-center items-center mx-auto'
                      : 'flex rounded-full w-10 h-10 justify-center items-center mx-auto'
                  }
                >
                  <Icon
                    size={24}
                    className={
                      isPast
                        ? 'mx-auto text-olivine-600'
                        : isFuture
                          ? 'mx-auto text-gray-200'
                          : 'mx-auto text-golden'
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} goHome={handleGoHome} />}
        {step === 3 && <Step3 onNext={handleNext} goHome={handleGoHome} />}
        {step === 4 && <ArtisanStep1 onNext={handleNext} />}
        {step === 5 && <ArtisanStep2 onNext={handleNext} />}
        {step === 6 && <ArtisanStep3 onNext={handleNext} />}
        {step === 7 && <ArtisanStep4 onNext={handleNext} />}
        {step === 8 && <ArtisanStep5 onNext={handleNext} />}
        {step === 9 && <ArtisanStep6 onNext={handleNext} />}
        {step === 10 && <ArtisanStep7 onNext={handleNext} />}
        {step > 10 && (
          <div className="text-midnight text-center">
            <h1 className="text-2xl font-bold text-olivine-600 mb-2">
              Cadastro concluído!
            </h1>
            <h2 className="text-lg font-bold mb-1">
              Bem-vindo à comunidade Artesão!
            </h2>
            <p className="text-md mt-4">
              Seu perfil foi criado com sucesso. Agora você pode explorar,
              conectar-se com outros artesãos e começar a compartilhar suas
              criações.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
