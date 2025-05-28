import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const telefone = faker.phone.number('(##) 9####-####');


import { inscricaoElements as el } from '@pages/Inscricao/Inscricao.js';

//Cenário: CT01: Consultar bilhete premiado
Dado('o usuário esteja na pagina de inscrição do PROAMIS', () => {
  cy.login_sistema();
});

Quando('o usuário deixar de preencher todos os campos obrigatórios', () => {
  cy.get(el.inputNome).clear();
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

});

Entao('o sistema não avança para proxima parte ao clicar no botão Salvar e Avançar', () => {
  cy.get(el.mensagemDeAvisoTelefoneInvalido).should('contain.text', 'Telefone inválido!');
});

