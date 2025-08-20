import { faker } from '@faker-js/faker';
import * as fakerBr from 'faker-br';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { inscricaoElements as el } from '@pages/Inscricao/Inscricao.js';
import { menusESubmenusElements as menu } from '@pages/Menus_e_Submenus/Menus_e_Submenus.js';
import { logsElements as log } from '@pages/Logs/logs.js';


Dado('que eu faça alguma mudança no cadastro', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.MeuCadastro).eq(0).click({force: true});
  cy.get(el.iconeProamis, { timeout: 20000 }).contains('PROAMIS');

  //Primeiroa Parte do Cadastro: Dados Pessoais  
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.botaoSalvarEContinuar).click();

  //Segunda Parte do Cadastro: Dados do Orgão
  cy.get(el.botaoSalvarEContinuar).click();

  //Terceira Parte: Dados do Berçario
  cy.get(el.botaoSalvar).click();

  //Quarta Parte: Cursos
  cy.get(el.botaoSalvar).click();

  //Enviar Cadastro:
  cy.get(el.botaoCiente).click();
  cy.get(el.checkAceitoNoFinalDoCadastro).click();
  cy.get(el.checkSegundoAceitoNoFinalDoCadastro).click();
  cy.get(el.botaoEnviar).click();
  cy.contains('Cadadastro enviado com sucesso!', { timeout: 20000 });

})

Quando('eu entrar na área de Logs', () => {
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Administração).click({force: true});
  cy.get(menu.Logs).click();
});

Entao('o sistema deve apresentar o nome Fernanda Carolina, a data da mudança, a ação como alteração e o local como Cadastro', () => {
  
    const dataHoje = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' })
    .format(new Date()); 


    cy.get(log.tabelaRow, { timeout: 20000 })
    .should('have.length.at.least', 1)
    .first()
    .within(() => {
      // Usuário: confere os dois primeiros nomes
      cy.get(log.tabelaUsuario)
        .should(($el) => {
          const primeirosDois = $el.text().trim().split(/\s+/).slice(0, 2).join(' ');
          expect(primeirosDois).to.eq('Fernanda Carolina');
        });

      // Data: confere só a parte da data (ignora hora)
      cy.get(log.tabelaData)
        .should(($el) => {
          const apenasData = $el.text().trim().split(' ')[0]; // "DD/MM/YYYY"
          expect(apenasData).to.eq(dataHoje);
        });

      // Ação
      cy.get(log.tabelaAção) 
        .should(($el) => {
          expect($el.text().trim()).to.eq('Alteração');
        });

      // Local
      cy.get(log.tabelaLocal)
        .should(($el) => {
          expect($el.text().trim()).to.eq('Cadastro');
        });
    });

    cy.wait(5000);

    //Essa parte reseta o cadastro para os programas continuarem funcionando no futuro:
    cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
    cy.get(el.menuMeuCadastro).eq(0).click({force: true});
    cy.get(el.botaoEditarCadastro).click();
    cy.get(el.botaoSimEditar).click();
    cy.contains('REALIZAR INSCRIÇÃO - BERÇÁRIO BURITI', { timeout: 10000 }).should('be.visible');
});
