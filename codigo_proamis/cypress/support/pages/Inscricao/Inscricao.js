
// Essa pages trata de todos as paginas da inscrição:
// - Dados Pessoais
// - Dados do Orgão
// - Dados do Berçário
// - Cursos
// - Enviar Cadastro

export const inscricaoElements = {
  // MENUS E SUBMENOS
  menuMenuPrincipal: '.menu-icon',
  menuMeuCadastro: 'a:contains("Meu Cadastro")  ',
  
  //BOTOES
  botaoSalvarEContinuar: 'button:contains("Salvar e Avançar")',
  botaoSalvar: 'span:contains("Salvar")',
  botaoEnviar: 'button:contains("Enviar")',

  // INPUTS
  inputNome: '#Input_Nome',
  inputCPF: '#Input_CPF',
  inputEmail: '#Input_Email',
  inputTelefone: '#Input_TelefoneCelular',
  inputDescricaoDeDeficiencia: '#TextArea_DescricaoDeficiencia',
  inputPesquisarCID: '#Input_SearchCid',
  inputMatriculaDeOrigem: '#Input_MatriculaOrigem',
  inputMatriculaEmExercicio: '#Input_MatriculaEmExercicio',
  inputCargoEfetivo: '#Input_CargoEfetivo',
  inputCargoEmComissao: '#Input_CargoEmComissao',
  inputJornadaDeTrabalho: '#Input_JornadaTrabalho',
  inputRemuneracaoBruta: '#Input_RemuneracaoBruta',
  inputDataDeInicioDeServicoPublico: '#Input_DataInicioServicoPublico',
  inputTelefoneDeTrabalho: '#Input_TelefoneTrabalho',
  inputEmailInstitucional: '#Input_Email_Institucional',
  inputNomeDependente: 'input[id^="l7-"][id$="Input_NomeDependente"]',
  inputDataNascimentoDependente: 'input[id^="l7-"][id$="Input_DataNascimento"]',
  inputIdadeGestacional: '#Input_IdadeGestacional',
  inputDataPrevistaDoParto: '#Input_DataPrevistaParto',
  inputCursoOuPalestra: 'input[id$="Input_Curso"]',
  inputCargaHorariaDoCurso: 'input[id$="Input_CargaHoraria"]',
  

  //MENSAGENS
  mensagemDeAvisoSobreSexoMasculino: '#DropdownSexo_DescribedBy',
  mensagemDeAvisoCPFInvalido: '#Input_CPF_DescribedBy',
  mensagemDeAvisoTelefoneInvalido: '#Input_TelefoneCelular_DescribedBy',
  mensagemDeAvisoEmailInvalido: '#Input_Email_DescribedBy',
  mensagemDeAvisoInformeOSexo: '#DropdownSexo_DescribedBy',
  mensagemDeAvisoDeDeficiencia: '#TextArea_DescricaoDeficiencia_DescribedBy',
  mensagemDeAvisoOrgaoEmExercicio: '#DropdownOrgaoAtual_DescribedBy',
  mensagemDeAvisoMatriculaEmExercicio: '#Input_MatriculaEmExercicio_DescribedBy',
  mensagemDeAvisoCargoEfetivo: '#Input_CargoEfetivo_DescribedBy',
  mensagemDeAvisoCargoEmComissao: '#Input_CargoEmComissao_DescribedBy',
  mensagemDeAvisoJornadaDeTrabalho: '#Input_JornadaTrabalho_DescribedBy',
  mensagemDeAvisoRemuneracaoBruta: '#Input_RemuneracaoBruta_DescribedBy',
  mensagemDeAvisoDataDeInicioDeServico: '#Input_DataInicioServicoPublico_DescribedBy',
  mensagemDeAvisoTelefoneDeTrabalho: '#Input_TelefoneTrabalho_DescribedBy',
  mensagemDeAvisoEmailInstitucional: '#Input_Email_Institucional_DescribedBy',
  mensagemDeAvisoContracheque: '#UploadContraCheque_DescribedBy',
  mensagemDeAvisoIdadeGestacional: '#Input_IdadeGestacional_DescribedBy',
  mensagemDeAvisoDataDoParto: '#Input_DataPrevistaParto_DescribedBy',
  mensagemDeAvisoQuantidadeDeBebes: '#Input_Qtd_bebes_DescribedBy',

  
  //DROPBOX
  dropboxSexo: '#DropdownSexo',
  dropboxOrgaoDeOrigem: '#DropdownOrgaoOrigem',
  dropboxOrgaoEmExercicio: '#DropdownOrgaoAtual',

 
  //CHECKS
  checkTermoDeAceito: '#CheckboxTermosAceitos',
  checkNaoParaDeficiencia: '#RadioButtonNao-input',
  checkSimParaDeficiencia: '#RadioButtonSim-input',
  checkOpcaoDePesquisaCid: 'span:contains("A00: Cólera")',
  checkPleitarVagaBercario: '#RadioButtonPleitear-input',
  checkNaoPleitarVagaBercario: '#RadioButtonNaoPleitear-input',
  checkSimParaGestante: '#RadioButtonGestante-input',
  checkNaoGestacaoUnica: '#RadioButtonNaoGestantacaoUnica-input',
  checkNaoRealizouCursos: '#RadioGroupRealizouCurso',
  checkSimRealizouCursos: '#RadioButtonRealizou-input',



  //ICONES
  iconeDeLixeira: 'i.fa-trash',
  iconeDeExclusaoDeFilho: 'i.text-error',
  iconeDeInclusaoDeFilho: '.ThemeGrid_MarginGutter > .icon',

  //UPLOADS
  uploadContraCheque: '#UploadContraCheque input[type="file"]',
  uploadCertidaoDeNascimento: 'label[id^="l7-"][id$="UploadCertidao"] input[type="file"]',
  uploadCertifcadoDoCursoOuPalestra: 'label[id$="UploadCertificado"] input[type="file"]',
};


   
//'label:contains("Nome completo do dependente 1:") + span input'
  
   