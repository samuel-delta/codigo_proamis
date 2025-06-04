import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const telefone = faker.phone.number('(##) 9####-####');


import { inscricaoElements as el } from '@pages/Inscricao/Inscricao.js';

//CT01: Incrição - Validar Campos Obrigatórios de Dados Pessoais
Dado('o usuário esteja na pagina de inscrição do PROAMIS, na paágina de Dados Pessoais', () => {
  cy.login_sistema();
});

Quando('o usuário deixar de preencher todos os campos obrigatórios', () => {
  //Essa parte faz um clear das anotações caso elas existam:
  cy.get(el.inputNome).clear();
  cy.get(el.inputCPF).clear();
  cy.get(el.inputEmail).clear();
  cy.get(el.inputTelefone).clear();
  cy.get(el.inputTelefone).clear();
  cy.get(el.dropboxSexo).select('Selecione o sexo');
  //Nessa parte ele confere se tem alguma coisa registrada como deficiencia e então limpa as opções:
  cy.get('body').then(($body) => {
    if ($body.find(el.iconeDeLixeira).length > 0 && $body.find(el.iconeDeLixeira).is(':visible')) {
      cy.get(el.iconeDeLixeira).click();
      cy.get(el.inputDescricaoDeDeficiencia).clear();
      cy.get(el.checkNaoParaDeficiencia).click();
  }
  });


  cy.get(el.inputNome).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).should('be.disabled'); //Confere se o botão está desabilitado
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoCPFInvalido).should('contain.text', 'CPF inválido!');
  cy.get(el.mensagemDeAvisoTelefoneInvalido).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInvalido).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoInformeOSexo).should('contain.text', 'Informe o sexo!');
  cy.get(el.inputCPF).type(fakerBr.br.cpf());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoTelefoneInvalido).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInvalido).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoInformeOSexo).should('contain.text', 'Informe o sexo!');
  cy.get(el.inputEmail).type(faker.internet.email());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoTelefoneInvalido).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoInformeOSexo).should('contain.text', 'Informe o sexo!');
  cy.get(el.dropboxSexo).select('Masculino');
  cy.get(el.mensagemDeAvisoSobreSexoMasculino).should('contain.text', 'Inscrição não disponível para o sexo selecionado!');
  cy.get(el.dropboxSexo).select('Feminino');
  cy.get(el.checkSimParaDeficiencia).click();
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoDeDeficiencia).should('contain.text', 'Campo obrigatório!');
  cy.get(el.inputPesquisarCID).type('A00');
  cy.get(el.checkOpcaoDePesquisaCid).click();
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoDeDeficiencia).should('contain.text', 'Campo obrigatório!');
  cy.get(el.inputDescricaoDeDeficiencia).type('Teste de Campos Obrigatórios');
  cy.get(el.botaoSalvarEContinuar).click();

});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar', () => {
  cy.get(el.mensagemDeAvisoTelefoneInvalido).should('contain.text', 'Telefone inválido!');
});



//CT02: Incrição - Validar Campos Obrigatórios de Dados do Orgão
Dado('o usuário esteja na pagina de inscrição do PROAMIS, na página de Dados do Orgao CT02', () => {
  cy.login_sistema();
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.inputNome).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).click();
});

Quando('o usuário deixar de preencher todos os campos obrigatórios CT02', () => {
  //Essa parte faz um clear das anotações caso elas existam:
  cy.get(el.inputMatriculaDeOrigem).clear();
  cy.get(el.inputMatriculaEmExercicio).clear();
  cy.get(el.inputMatriculaDeOrigem).clear();
  cy.get(el.inputCargoEfetivo).clear();
  cy.get(el.inputCargoEmComissao).clear();
  cy.get(el.inputJornadaDeTrabalho).clear();
  cy.get(el.inputRemuneracaoBruta).clear();
  cy.get(el.inputDataDeInicioDeServicoPublico).clear();
  cy.get(el.inputTelefoneDeTrabalho).clear();
  cy.get(el.inputTelefoneDeTrabalho).clear();
  cy.get(el.inputEmailInstitucional).clear(); 
  cy.get(el.dropboxOrgaoDeOrigem).select('Selecione seu órgão de origem');
  cy.get(el.dropboxOrgaoEmExercicio).select('Selecione seu órgão atual em exercício');
  
  cy.get('body').then(($body) => {
    if ($body.find(el.iconeDeLixeira).length > 0 && $body.find(el.iconeDeLixeira).is(':visible')) {
      cy.get(el.iconeDeLixeira).click();
  }
  });

  //Começa o código:
  cy.get(el.dropboxOrgaoDeOrigem).select('Administração Regional de Sobradinho');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoOrgaoEmExercicio).should('contain.text', 'Informe o órgão atual em exercício!');
  cy.get(el.mensagemDeAvisoMatriculaEmExercicio).should('contain.text', 'Informe a matrícula em exercício!');
  cy.get(el.mensagemDeAvisoCargoEfetivo).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoCargoEmComissao).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoJornadaDeTrabalho).should('contain.text', 'Informe a jornada de trabalho semanal!');
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.dropboxOrgaoEmExercicio).select('12');
  cy.get(el.inputMatriculaDeOrigem).type('12345678900');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoMatriculaEmExercicio).should('contain.text', 'Informe a matrícula em exercício!');
  cy.get(el.mensagemDeAvisoCargoEfetivo).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoCargoEmComissao).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoJornadaDeTrabalho).should('contain.text', 'Informe a jornada de trabalho semanal!');
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');
  
  cy.get(el.inputMatriculaEmExercicio).type('12345678900');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoCargoEfetivo).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoCargoEmComissao).should('contain.text', 'Informe o cargo efetivo ou em comissão!');
  cy.get(el.mensagemDeAvisoJornadaDeTrabalho).should('contain.text', 'Informe a jornada de trabalho semanal!');
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputCargoEfetivo).type('Teste De Campo');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoJornadaDeTrabalho).should('contain.text', 'Informe a jornada de trabalho semanal!');
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputCargoEmComissao).type('Teste de Campo 2');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoJornadaDeTrabalho).should('contain.text', 'Informe a jornada de trabalho semanal!');
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputJornadaDeTrabalho).type('40');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoRemuneracaoBruta).should('contain.text', 'Informe a remuneração bruta!');
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputRemuneracaoBruta).type('3000');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoDataDeInicioDeServico).should('contain.text', 'Data inválida!');
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputDataDeInicioDeServicoPublico).type('2025-01-10');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoTelefoneDeTrabalho).should('contain.text', 'Telefone inválido!');
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputTelefoneDeTrabalho).type(telefone);
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoEmailInstitucional).should('contain.text', 'E-mail inválido!');
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');

  cy.get(el.inputEmailInstitucional).type(faker.internet.email());
  cy.get(el.botaoSalvarEContinuar).click();
});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar CT02', () => {
  cy.get(el.mensagemDeAvisoContracheque).should('contain.text', 'Upload do contracheque obrigatório!');
});


//CT03: Inscrição - Validar Campo Obrigatórios de Dados do Berçário

Dado('o usuário esteja na pagina de inscrição do PROAMIS, na página de Dados do Orgao CT03', () => {
  cy.login_sistema();
    cy.get(el.checkTermoDeAceito).click();
  cy.get(el.inputNome).clear();
  cy.get(el.inputNome).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.wait(1000);
  cy.get(el.botaoSalvarEContinuar).click();
    cy.get('body').then(($body) => {
    if ($body.find('i.fa-trash').length === 0) {
      cy.get(el.uploadContraCheque).attachFile('TestePDF.pdf', { force: true });
    }
  });
});

Quando('o usuário deixar de preencher todos os campos obrigatórios CT03', () => {
  cy.get(el.inputNomeDependente).clear();
  cy.get(el.inputDataNascimentoDependente).clear();

  cy.get('body').then(($body) => {
    if ($body.find(el.iconeDeLixeira).length > 0 && $body.find(el.iconeDeLixeira).is(':visible')) {
      cy.get(el.iconeDeLixeira).click();
  }
  });

  cy.get(el.checkNaoPleitarVagaBercario).click();
  cy.get(el.checkPleitarVagaBercario).click();
  cy.get(el.iconeDeInclusaoDeFilho).click();
  cy.get(el.botaoSalvarEContinuar).click();
  cy.contains('Complete o cadastro do dependente');
  cy.get(el.inputNomeDependente).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.contains('Complete o cadastro do dependente');
  cy.get(el.inputDataNascimentoDependente).type('2025-01-10');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.contains('Complete o cadastro do dependente');
  cy.get(el.uploadCertidaoDeNascimento).attachFile('TestePDF.pdf', { force: true });
  cy.get(el.checkSimParaGestante).click();
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoIdadeGestacional).should('contain.text', 'Informe a idade gestacional!');
  cy.get(el.mensagemDeAvisoDataDoParto).should('contain.text', 'Data inválida!');
  cy.get(el.inputIdadeGestacional).type('4');
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoDataDoParto).should('contain.text', 'Data inválida!');
  cy.get(el.inputDataPrevistaDoParto).type('2025-12-10');
  cy.get(el.checkNaoGestacaoUnica).click();
});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar CT03', () => {
 

  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.mensagemDeAvisoQuantidadeDeBebes).should('contain.text', 'Informe a quantidade de bebês!');
}); 


//CT04: Inscrição - Validar Campo Obrigatórios de Cursos

Dado('o usuário esteja na pagina de inscrição do PROAMIS, na página de Cursos CT04', () => {
  cy.login_sistema();
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.inputNome).clear();
  cy.get(el.inputNome).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.wait(1000);
  cy.get(el.botaoSalvarEContinuar).click();
    cy.get('body').then(($body) => {
    if ($body.find('i.fa-trash').length === 0) {
      cy.get(el.uploadContraCheque).attachFile('TestePDF.pdf', { force: true });
    }
  });
  cy.get(el.botaoSalvarEContinuar).click();
});

Quando('o usuário deixar de preencher todos os campos obrigatórios CT04', () => {
  //Deleta Anteriores:
  cy.get(el.inputCursoOuPalestra).clear();
  cy.get(el.inputCargaHorariaDoCurso).clear();

  cy.get('body').then(($body) => {
    if ($body.find(el.iconeDeLixeira).length > 0 && $body.find(el.iconeDeLixeira).is(':visible')) {
      cy.get(el.iconeDeLixeira).click();
  }
  });
  
  cy.get(el.checkNaoRealizouCursos).click();
  cy.get(el.checkSimRealizouCursos).click();
  cy.get(el.botaoSalvar).click();
  cy.contains('Informe todos os campos do curso/palestra')
  cy.get(el.inputCursoOuPalestra).type('Testes Automatizados');
  cy.get(el.botaoSalvar).click();
  cy.contains('Informe todos os campos do curso/palestra');
  cy.get(el.inputCargaHorariaDoCurso).type('100');
  cy.get(el.botaoSalvar).click();
  cy.contains('Informe todos os campos do curso/palestra');
});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar CT04', () => {
  cy.get(el.botaoSalvar).click();
  cy.contains('Informe todos os campos do curso/palestra');
});


//CT05: Inscrição - Validar Campo Obrigatórios de Enviar Cadastro

Dado('o usuário esteja na pagina de inscrição do PROAMIS, na página de Enviar Cadastro CT05', () => {
  cy.login_sistema();
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.inputNome).clear();
  cy.get(el.inputNome).type(faker.person.fullName());
  cy.get(el.botaoSalvarEContinuar).click();
  cy.wait(1000);
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get('body').then(($body) => {
    if ($body.find('i.fa-trash').length === 0) {
      cy.get(el.uploadContraCheque).attachFile('TestePDF.pdf', { force: true });
    }
  });
  cy.get(el.botaoSalvarEContinuar).click();
  cy.get(el.botaoSalvar).click();
});

Quando('o usuário deixar de preencher todos os campos obrigatórios CT05', () => {
});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar CT05', () => {
  cy.get(el.botaoEnviar).should('be.disabled');
});