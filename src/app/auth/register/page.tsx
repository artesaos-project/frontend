'use client';

import {
  ArtisanStepAddress,
  ArtisanStepHistory,
  ArtisanStepMedia,
  ArtisanStepPurpose,
  ArtisanStepRawMaterial,
  ArtisanStepSicab,
  ArtisanStepTechnique,
} from '@/components/features/register/artisan-steps';
import SignUpComplete from '@/components/features/register/register-complete';
import {
  StepChoice,
  StepComplete,
  StepRegister,
} from '@/components/features/register/user-steps';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import useStoreUser from '@/hooks/use-store-user';
import { ClipboardPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { IoIosWarning } from 'react-icons/io';
import { LuFileUser } from 'react-icons/lu';
import { RiImage2Fill } from 'react-icons/ri';
import { authApi } from '@/services/api';
import { AxiosError } from 'axios';

function SignUp() {
  const router = useRouter();
  const resetArtisan = useArtisanRegister((s) => s.reset);
  const isAuthenticated = useStoreUser((s) => s.user.isAuthenticated);
  const artisanApplicationId = useArtisanRegister((s) => s.applicationId);
  const [step, setStep] = useState(1);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Ocorreu um erro. Por favor, tente novamente.',
  );

  useEffect(() => {
    if (errorAlert) {
      const timer = setTimeout(() => setErrorAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  useEffect(() => {
    if (isAuthenticated && step === 1) {
      setStep(2);
    } else if (artisanApplicationId && step < 4) {
      setStep(4);
    }
  }, [isAuthenticated, artisanApplicationId, step]);

  const handleError = (msg?: string) => {
    setErrorMessage(msg || 'Preencha com dados válidos');
    setErrorAlert(true);
  };

  const handleSubmit = async () => {
    try {
      const user = useStoreUser.getState().user;
      if (!user.isAuthenticated) {
        throw new Error('Usuário não autenticado');
      }
      const sicabDataCadastro = useArtisanRegister.getState().sicabDataCadastro;
      const sicabValidade = useArtisanRegister.getState().sicabValidade;

      await authApi.complete({
        applicationId: useArtisanRegister.getState().applicationId,
        rawMaterial: useArtisanRegister.getState().materiasPrimas,
        technique: useArtisanRegister.getState().tecnicas,
        finalityClassification: useArtisanRegister.getState().finalidades,
        bio: useArtisanRegister.getState().historico,
        sicab: useArtisanRegister.getState().sicab,
        sicabRegistrationDate: sicabDataCadastro
          ? new Date(sicabDataCadastro).toISOString()
          : undefined,
        sicabValidUntil: sicabValidade
          ? new Date(sicabValidade).toISOString()
          : undefined,
      });

      setStep(11);
      resetArtisan();
    } catch (error: unknown) {
      let backendMessage = 'Erro ao cadastrar artesão';

      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        backendMessage = Array.isArray(message)
          ? message[0]
          : message || backendMessage;
      }

      setErrorMessage(backendMessage);
      setErrorAlert(true);
    }
  };

  const handleNext = () => {
    if (step === 10 && isAuthenticated) {
      handleSubmit();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      if (isAuthenticated && step === 2) {
        return;
      }
      setStep((prev) => prev - 1);
    } else {
      router.push('/auth');
    }
  };

  const handleGoHome = () => {
    if (step >= 4 && step <= 10) {
      const confirmLeave = window.confirm(
        'Seu cadastro será perdido. Deseja sair mesmo assim?',
      );
      if (!confirmLeave) return;
      resetArtisan();
    } else if (step > 10) {
      resetArtisan();
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
    <div className="min-h-screen w-full flex justify-center items-center bg-[url('/fundo-cadastro-login.svg')] bg-no-repeat bg-cover bg-center md:p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col md:border-2 p-6 md:p-25 rounded-4xl md:shadow-2xl ">
        {errorAlert ? (
          <Alert
            variant="destructive"
            className="w-full bg-salmon text-white flex justify-between rounded-full mb-7"
          >
            <div className="flex gap-5 items-center">
              <IoIosWarning size={22} />
              <AlertTitle>{errorMessage}</AlertTitle>
            </div>
            <FiX
              className="cursor-pointer"
              onClick={() => setErrorAlert(false)}
            />
          </Alert>
        ) : (
          <div className="flex mb-10 justify-between">
            {step <= 10 && (
              <FiChevronLeft
                size={24}
                onClick={handleBack}
                className="cursor-pointer"
              />
            )}
            {step <= 10 && (
              <FiX
                size={24}
                className="cursor-pointer"
                onClick={handleGoHome}
              />
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
        )}
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

        {step === 1 && (
          <StepRegister onNext={handleNext} onError={handleError} />
        )}
        {step === 2 && <StepChoice onNext={handleNext} goHome={handleGoHome} />}
        {step === 3 && (
          <StepComplete onNext={handleNext} goHome={handleGoHome} />
        )}
        {step === 4 && <ArtisanStepAddress onNext={handleNext} />}
        {step === 5 && <ArtisanStepSicab onNext={handleNext} />}
        {step === 6 && <ArtisanStepRawMaterial onNext={handleNext} />}
        {step === 7 && <ArtisanStepTechnique onNext={handleNext} />}
        {step === 8 && <ArtisanStepPurpose onNext={handleNext} />}
        {step === 9 && <ArtisanStepHistory onNext={handleNext} />}
        {step === 10 && <ArtisanStepMedia onNext={handleNext} />}
        {step > 10 && <SignUpComplete goHome={handleGoHome} />}
      </div>
    </div>
  );
}

export default SignUp;
