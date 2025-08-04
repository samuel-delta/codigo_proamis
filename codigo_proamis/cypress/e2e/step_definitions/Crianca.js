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

import { menusESubmenusElements as menu } from '@pages/Menus_e_Submenus/Menus_e_Submenus.js';
import { inscricaoElements as el } from '@pages/Inscricao/Inscricao.js';
import { criançaElementsElements as cla} from '@pages/Criança/Criança.js';

//CT01 Desligando uma criança
Dado('que eu tenha uma criança válida que deseja desligar', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Crianças).eq(0).click({force: true});
  cy.get(menu.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('procure pela criança cadastrada no menu criança', () => {
  cy.login_sistema();
  cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
  cy.get(el.MenuCrianças).eq(0).click({force: true});
  cy.get(el.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});