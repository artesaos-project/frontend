import ModerateArtisanButton from './moderate-artisan-button';

function ModerateArtisanInstructions() {
  return (
    <div className="hidden lg:flex flex-col">
      <div className="w-full rounded-md border border-midnight p-2 text-midnight font-bold">
        <p>Instruções das ações</p>
      </div>

      <div className="flex flex-col text-sm font-semibold text-midnight">
        <div className="flex gap-6 mx-3 pt-4">
          <span>Ação/Botão</span>
          <span>Função</span>
        </div>

        <div className="flex gap-4 pt-2 items-center">
          <ModerateArtisanButton variant={'activate'} />
          <span>
            Ativar usuários desativados anteriormente, permitindo que o usuário
            volte a acessar o sistema.
          </span>
        </div>

        <div className="flex gap-4 pt-2 items-center">
          <ModerateArtisanButton variant={'deactivate'} />
          <span>Desativar usuários e bloqueiar o acesso ao sistema.</span>
        </div>

        <div className="flex gap-4 pt-2 items-center">
          <ModerateArtisanButton variant={'approve'} />
          <span>Validar a ação ou cadastro.</span>
        </div>

        <div className="flex gap-4 pt-2 items-center">
          <ModerateArtisanButton variant={'reject'} />
          <span>Rejeitar o pedido de cadastro e impedir a continuidade.</span>
        </div>
        <div className="flex gap-4 pt-2 items-center">
          <ModerateArtisanButton variant={'edit'} />
          <span>
            Abrir as informações deste registro para atualização ou correção de
            dados.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ModerateArtisanInstructions;
