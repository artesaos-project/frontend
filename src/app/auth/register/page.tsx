'use client';

import AlertDialog from '@/components/common/alert-dialog';
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
import { StepIndicator } from '@/components/features/register/step-indicator';
import {
  StepChoice,
  StepComplete,
  StepRegister,
} from '@/components/features/register/user-steps';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import useStoreUser from '@/hooks/use-store-user';
import { authApi } from '@/services/api';
import { AxiosError } from 'axios';
import { ClipboardPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { IoIosWarning } from 'react-icons/io';
import { LuFileUser } from 'react-icons/lu';
import { RiImage2Fill } from 'react-icons/ri';

function SignUp() {
  const router = useRouter();
  const resetArtisan = useArtisanRegister((s) => s.reset);
  const isAuthenticated = useStoreUser((s) => s.user.isAuthenticated);
  const user = useStoreUser((s) => s.user);
  const artisanApplicationId = useArtisanRegister((s) => s.applicationId);
  const [step, setStep] = useState<number | null>(null);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Ocorreu um erro. Por favor, tente novamente.',
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (errorAlert) {
      const timer = setTimeout(() => setErrorAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  useEffect(() => {
    if (step === null) setStep(1);
    else if (
      (user.applicationStatus === 'APPROVED' ||
        user.applicationStatus === 'PENDING') &&
      step < 11
    ) {
      setStep(11);
    } else if (
      ((user.applicationStatus === 'NOT_FINISHED' && user.applicationId) ||
        artisanApplicationId) &&
      step < 4
    ) {
      setStep(4);
    } else if (isAuthenticated && step < 2) {
      setStep(2);
    }
  }, [
    isAuthenticated,
    artisanApplicationId,
    step,
    user.applicationId,
    user.postnedApplication,
    user.applicationStatus,
  ]);

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

      await authApi.complete({
        applicationId:
          useArtisanRegister.getState().applicationId || user.applicationId!,
        photosIds: useArtisanRegister.getState().attachmentIds,
        rawMaterial: useArtisanRegister.getState().materiasPrimas,
        technique: useArtisanRegister.getState().tecnicas,
        finalityClassification: useArtisanRegister.getState().finalidades,
        bio: useArtisanRegister.getState().historico,
        sicab: useArtisanRegister.getState().sicab,
        sicabRegistrationDate: useArtisanRegister.getState().sicabDataCadastro,
        sicabValidUntil: useArtisanRegister.getState().sicabValidade,
        comercialName: useArtisanRegister.getState().nomeComercial,
        address: useArtisanRegister.getState().endereco,
        zipCode: useArtisanRegister.getState().cep,
        addressNumber: useArtisanRegister.getState().numero,
        addressComplement: useArtisanRegister.getState().complemento,
        neighborhood: useArtisanRegister.getState().bairro,
        city: useArtisanRegister.getState().cidade,
        state: useArtisanRegister.getState().estado,
      });

      useStoreUser.getState().setUser({
        ...user,
        applicationStatus: 'PENDING',
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
    setStep((prev) => (prev === null ? 1 : prev + 1));
  };

  const handleBack = () => {
    if (step && step > 1) {
      if (isAuthenticated && step === 2) {
        return;
      }
      setStep((prev) => (prev === null ? 1 : prev - 1));
    } else {
      router.push('/auth');
    }
  };

  const handleGoHome = () => {
    if (step && step >= 4 && step <= 10) {
      setIsConfirmModalOpen(true);
    } else {
      if (step && step > 10) {
        resetArtisan();
      }
      router.push('/');
    }
  };

  const handleModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleModalConfirm = () => {
    resetArtisan();
    router.push('/');
    setIsConfirmModalOpen(false);
  };

  const stepIcons = [
    { icon: ClipboardPen, activeStep: 4 },
    { icon: FaRegAddressCard, activeStep: 5 },
    { icon: LuFileUser, activeStep: [6, 7, 8] },
    { icon: BsChatDots, activeStep: 9 },
    { icon: RiImage2Fill, activeStep: 10 },
  ];

  if (step === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepRegister onNext={handleNext} onError={handleError} />;
      case 2:
        return <StepChoice onNext={handleNext} goHome={handleGoHome} />;
      case 3:
        return <StepComplete onNext={handleNext} goHome={handleGoHome} />;
      case 4:
        return <ArtisanStepAddress onNext={handleNext} />;
      case 5:
        return <ArtisanStepSicab onNext={handleNext} />;
      case 6:
        return <ArtisanStepRawMaterial onNext={handleNext} />;
      case 7:
        return <ArtisanStepTechnique onNext={handleNext} />;
      case 8:
        return <ArtisanStepPurpose onNext={handleNext} />;
      case 9:
        return <ArtisanStepHistory onNext={handleNext} />;
      case 10:
        return <ArtisanStepMedia onNext={handleNext} />;
      default:
        return <SignUpComplete goHome={handleGoHome} />;
    }
  };

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
        {step > 3 && step <= 10 && (
          <div className="flex items-center justify-center mb-6 border rounded-2xl p-2">
            {stepIcons.map((item, idx) => (
              <StepIndicator
                key={idx}
                icon={item.icon}
                index={idx}
                step={step}
                activeStep={item.activeStep}
                isLast={idx === stepIcons.length - 1}
              />
            ))}
          </div>
        )}
        <div>{renderStep()}</div>
        <AlertDialog
          isOpen={isConfirmModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          icon={<IoIosWarning size={40} color="salmon" />}
          dialogTitle="Se você sair agora, as alterações feitas serão perdidas"
          textButton1="Sair"
          textButton2="Voltar"
        />
      </div>
    </div>
  );
}

export default SignUp;
