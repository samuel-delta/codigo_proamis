import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

import { menusESubmenusElements as menu } from '@pages/Menus_e_Submenus/Menus_e_Submenus.js';
import {listaDeClassificaçãoElements as list} from '@pages/Administração/ListaDeClassifiação.js';

//CT01 Verificar lista de classificação de um ano em especifico 

Dado('que o usuario deseje ver a lista de classificação do ano passado', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
});

Dado('acesse a LISTA DE CLASSIFICAÇÃO na área de ADMINISTRAÇÃO', () => {
  cy.get(menu.Administração).eq(0).click({force: true});
  cy.get(menu.ListaDeClassificação).eq(0).click({force: true});
  cy.get(menu.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('selecione o ano de 2024', () => {
  cy.get(list.dropAnoDaClassificação).select('2024');
});

Quando('apetar FILTRAR', () => {
  cy.get(list.botaoFiltar).click();
});

Quando('selecionar o ano', () => {
  cy.get(list.selecionaAno2024).click();
});

Quando('selecionar PDF ou EXCEL', () => {
  cy.get(list.botaoEXCEL).click();
  cy.get(list.botaoPDF).click();
  cy.readFile(`cypress/downloads/ListaClassificacaoPROAMIS-09-2024.pdf`, { timeout: 15000 }).should('exist');

});

Entao('o sistema baixa um PDF ou EXCEL que contém os nomes da classificação do ano escolhido', () => {
  cy.get('td[data-header="Filho / Dependente Legal"] span[data-expression]')
    .then(($els) => {
      const nomesFilhos = Cypress._.map($els, 'innerText');
      Cypress.env('dadosTabelaExtraidos', nomesFilhos);

  cy.validarArquivosExportados(
  null, // <-- TXT não existe, marque explicitamente
  'cypress/downloads/ListaClassificacaoPROAMIS-09-2024.pdf',  // PDF correto
  'cypress/downloads/ListaClassificacaoPROAMIS-09-2024.xlsx', // Excel correto
  nomesFilhos 
  );
    });
});

