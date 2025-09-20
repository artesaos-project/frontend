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
import SignUpComplete from '@/components/features/sign-up/sign-up-complete';
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
    if (step >= 4 && step <= 10) {
      const confirmLeave = window.confirm(
        'Seu cadastro será perdido. Deseja sair mesmo assim?',
      );
      if (!confirmLeave) return;
    }
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
    <div className="flex md:w-screen md:h-screen justify-center items-center bg-[url('/fundo-cadastro-login.svg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col md:border-2 p-6 md:p-25 rounded-4xl md:shadow-2xl ">
        <div className="flex mb-10 justify-between">
          {step < 10 && (
            <FiChevronLeft
              size={24}
              onClick={handleBack}
              className="cursor-pointer"
            />
          )}
          {step <= 10 && (
            <FiX size={24} className="cursor-pointer" onClick={handleGoHome} />
          )}
          {step > 10 && (
            <div className="flex-1 flex justify-end">
              <FiX
                size={24}
                className="cursor-pointer"
                onClick={handleGoHome}
              />
            </div>
          )}
        </div>
        <div
          className={
            step > 3 && step <= 10
              ? 'flex flex-row flex-wrap items-center justify-center mb-6 rounded-2xl border-1 p-1'
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
              <div key={idx} className="flex items-center justify-between ">
                {idx !== 0 && (
                  <div
                    className={`w-6 sm:w-8 md:12 h-0.5 rounded-full transition-colors ${
                      step > (prevActiveStep ?? 0)
                        ? 'bg-olivine-600'
                        : 'bg-gray-100 '
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
        {step > 10 && <SignUpComplete />}
      </div>
    </div>
  );
}

export default SignUp;
