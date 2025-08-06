import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;



import { menusESubmenusElements as menu } from '@pages/Menus_e_Submenus/Menus_e_Submenus.js';
import { criançaElements as cri} from '@pages/Criança/Criança.js';

//CT01 Desligando uma criança

Dado('que eu tenha uma criança válida que deseja desligar', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Crianças).eq(0).click({force: true});
  cy.get(menu.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('procure pela criança cadastrada no menu criança', () => {
    cy.wait(1000);
    cy.get('#Input_Search').type('012.345.678-90');
    cy.get(cri.dropStatusDaCriança).select('Desligado');
    cy.get(cri.botaoFiltrar).click();
});

Dado('selecionar a criança desejada', () => {
    cy.get(cri.criançaDesligada).click();
});

Quando('clicar em DESLIGADO', () => {
    cy.get(cri.botaoSalvar).click();
});


Entao('o sistema desliga a criança e muda o STATUS DA CRIANÇA para DESLIGADA', () => {
    cy.contains('Criança Desligado(a) com sucesso!');
    cy.wait(1000);
    cy.contains('Desligado');
});

//CT02 Colocando uma criança como desistente

Dado('que eu tenha uma criança válida que deseja colocar como desistente', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Crianças).eq(0).click({force: true});
  cy.get(menu.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('procure pela criança cadastrada no menu criança CT02', () => {
    cy.wait(1000);
    cy.get('#Input_Search').type('012.345.678-90');
    cy.get(cri.dropStatusDaCriança).select('Desistente');
    cy.get(cri.botaoFiltrar).click();
});

Dado('selecionar a criança desejada CT02', () => {
    cy.get(cri.criançaDesistente).click();
});

Quando('clicar em DESISTENTE CT02', () => {
    cy.get(cri.botaoSalvar).click();
});


Entao('o sistema desliga a criança e muda o STATUS DA CRIANÇA para DESISTENTE CT02', () => {
    cy.contains('Criança Desistente com sucesso!');
    cy.wait(1000);
    cy.contains('Desistente');
});

//CT03 Matriculando uma criança

Dado('que eu tenha uma criança válida que deseja matricular', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Crianças).eq(0).click({force: true});
  cy.get(menu.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('procure pela criança cadastrada no menu criança CT03', () => {
    cy.wait(1000);
    cy.get('#Input_Search').type('012.345.678-90');
    cy.get(cri.dropStatusDaCriança).select('Matriculado');
    cy.get(cri.botaoFiltrar).click();
});

Dado('selecionar a criança desejada CT03', () => {
    cy.get(cri.criançaMatriculada).click();
});

Quando('clicar em MATRICULADO CT03', () => {
    cy.get(cri.botaoSalvar).click();
});


Entao('o sistema desliga a criança e muda o STATUS DA CRIANÇA para MATRICULADO CT03', () => {
    cy.contains('Criança Matriculado(a) com sucesso!');
    cy.wait(1000);
    cy.contains('Matriculado');
});