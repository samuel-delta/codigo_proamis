import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const telefone = faker.phone.number('####-####');
const nomeGerado = faker.person.fullName();
const cpfGerado = fakerBr.br.cpf();
const emailGerado = faker.internet.email();

import { inscricaoElements as el } from '@pages/Inscricao/Inscricao.js';
import { cadastrosElements as ca} from '@pages/Cadastro/Cadastro.js';

Dado('que o tenha um usuário cadastrado que não tenha validado o certificado - IV', () => {
  cy.login_sistema();
  cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
  cy.get(el.menuMeuCadastro).eq(0).click({force: true});
  cy.get(el.iconeProamis, { timeout: 20000 }).contains('PROAMIS')

  //Primeiroa Parte do Cadastro: Dados Pessoais
  cy.get(el.inputNome).clear();
  cy.get(el.inputCPF).clear();
  cy.get(el.inputEmail).clear();
  cy.get(el.inputTelefone).clear();
  cy.get(el.inputTelefone).clear();
  cy.get(el.dropboxSexo).select('Feminino');
  
  //Nessa parte ele confere se tem alguma coisa registrada como deficiencia e então limpa as opções:
  cy.get('body').then(($body) => {
    if ($body.find(el.iconeDeLixeira).length > 0 && $body.find(el.iconeDeLixeira).is(':visible')) {
      cy.get(el.iconeDeLixeira).click();
      cy.get(el.inputDescricaoDeDeficiencia).clear();
      cy.get(el.checkNaoParaDeficiencia).click();
    }
  });

  cy.get(el.inputNome).type(nomeGerado);
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.inputCPF).type(cpfGerado);
  cy.get(el.inputEmail).type(emailGerado);
  cy.get(el.inputTelefone).type('619' + telefone);
  cy.get(el.botaoSalvarEContinuar).click();

  //Segunda Parte do Cadastro: Dados do Orgão
  cy.get(el.botaoSalvarEContinuar).click();

  //Terceira Parte: Dados do Berçario
  cy.get(el.botaoSalvar).click();

  //Quarta Parte: Cursos
  cy.get(el.iconeRemoverCurso).click();
  cy.get(el.checkNaoRealizouCursos).click();
  cy.get(el.checkSimRealizouCursos).click();
  cy.get(el.botaoAdiconarCurso).click();
  cy.get(el.inputCursoOuPalestra).type('Testes Automatizados');
  cy.get(el.inputCargaHorariaDoCurso).type('100');
  cy.get(el.uploadCertifcadoDoCursoOuPalestra).attachFile('TestePDF.pdf', { force: true });
  cy.wait(1000);
  cy.get(el.botaoSalvar).click();

  //Enviar Cadastro:
  cy.get(el.botaoCiente).click();
  cy.get(el.checkAceitoNoFinalDoCadastro).click();
  cy.get(el.checkSegundoAceitoNoFinalDoCadastro).click();
  cy.get(el.botaoEnviar).click();
  cy.contains('Cadadastro enviado com sucesso!', { timeout: 20000 });
});

Dado('encontrar esse usuario na busca dos cadastros - IV', () => {
  cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
  cy.get(ca.subMenuCadastros).eq(1).click({ force: true });
  cy.get(ca.inputNomeOuCPF).type(nomeGerado);
  cy.get(ca.botaoPesquisar).click();
});

Dado('acessar informações do usuario cadastrado - IV', () => {

  cy.get('table').contains('td', nomeGerado).parent().find('a[href*="CadastroDetail"]').click();

});

Quando('clicar em Validar Certificado - IV', () => {
  cy.get(ca.botaoValidarCertificado).click();
  cy.on('window:confirm', (text) => {
  expect(text).to.include('Deseja realmente VALIDAR este certificado?');
  return true; //Aperta o "ok"
});
});

Entao('o sistema valida e apresenta a mensagem: Certificado validado com sucesso!', () => {
    cy.contains('Certificado validado com sucesso');
    cy.wait(5000);

    //Essa parte reseta o cadastro para os programas continuarem funcionando no futuro:
    cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
    cy.get(el.menuMeuCadastro).eq(0).click({force: true});
    cy.get(el.botaoEditarCadastro).click();
    cy.get(el.botaoSimEditar).click();
    cy.contains('REALIZAR INSCRIÇÃO - BERÇÁRIO BURITI', { timeout: 10000 }).should('be.visible');
});