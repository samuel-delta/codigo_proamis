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
import { cadastrosElements as ca} from '@pages/Cadastro/Cadastro.js';
import { classificaçãoElements as cla} from '@pages/Administração/Classificação.js';



Dado('que o usuário deseje validar um cadastro como Classificado', () => {
  cy.login_sistema();
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.MeuCadastro).eq(0).click({force: true});
  cy.get(el.iconeProamis, { timeout: 20000 }).contains('PROAMIS')
});

Dado('tenha um cadastro válido para classificar', () => {
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
    cy.get(el.botaoAdiconarCurso).click();
    cy.get(el.botaoSalvar).click();
    cy.get(el.inputCursoOuPalestra).eq(1).type('Testes Automatizados 2');
    cy.get(el.inputCargaHorariaDoCurso).eq(1).type('200');
    cy.get(el.uploadCertifcadoDoCursoOuPalestra).attachFile('TestePDF.pdf', { force: true });
    cy.wait(1000);
    cy.get(el.botaoAdiconarCurso).click();
    cy.get(el.botaoSalvar).click();
    cy.get(el.inputCursoOuPalestra).eq(2).type('Testes Automatizados 3');
    cy.get(el.inputCargaHorariaDoCurso).eq(2).type('200');
    cy.get(el.uploadCertifcadoDoCursoOuPalestra).attachFile('TestePDF.pdf', { force: true });
    cy.wait(1000);
    cy.get(el.botaoAdiconarCurso).click();
    cy.get(el.botaoSalvar).click();
    cy.get(el.inputCursoOuPalestra).eq(3).type('Testes Automatizados 4');
    cy.get(el.inputCargaHorariaDoCurso).eq(3).type('200');
    cy.get(el.uploadCertifcadoDoCursoOuPalestra).attachFile('TestePDF.pdf', { force: true });
    cy.wait(1000);
    cy.get(el.botaoSalvar).click();  

    //Enviar Cadastro:
    cy.get(el.botaoCiente).click();
    cy.get(el.checkAceitoNoFinalDoCadastro).click();
    cy.get(el.checkSegundoAceitoNoFinalDoCadastro).click();
    cy.get(el.botaoEnviar).click();
    cy.contains('Cadadastro enviado com sucesso!', { timeout: 20000 });

    cy.get(el.menuMenuPrincipal, { timeout: 20000 }).click();
    cy.get(ca.subMenuCadastros).eq(1).click({ force: true });
    cy.get(ca.inputNomeOuCPF).type(nomeGerado);
    cy.get(ca.botaoPesquisar).click();

    cy.get('table').contains('td', nomeGerado).parent().find('a[href*="CadastroDetail"]').click();

    const clicarBotaoPorIndice = (index, total) => {
        if (index < total) {
            cy.get(ca.botaoValidarCertificado).eq(index).click({force: true});
            cy.on('window:confirm', (text) => {
                expect(text).to.include('Deseja realmente VALIDAR este certificado?');
                return true; // Aperta o "ok"
            });

    cy.wait(500); // Aguarda a atualização do DOM

    cy.then(() => {
      clicarBotaoPorIndice(index + 1, total); 
    });
  }
};
    clicarBotaoPorIndice(0, 4);
});

Quando('entrar na área de CLASSIFIÇÃO', () => {
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.Administração).click();
  cy.get(menu.Classificação, { timeout: 20000 }).click();
}); 

Quando('escolher o cadastro e clicar no botão ANALISAR CADASTRO', () => {
  cy.contains('td', nomeGerado)
  .parent('tr') 
  .within(() => {
    cy.get(cla.iconeAnalisarCadastro).click();
  });
}); 

Quando('escolher a opção CLASSIFICADO', () => {
  cy.get(cla.botaoClassificado).click();
}); 

Quando('clicar no botão SALVAR', () => {
  cy.get(cla.botaoSalvar).click();
  cy.get(cla.botaoAlterar).click();
}); 

Entao('o sistema muda o status daquele cadastro para CLASSIFICADO', () => {
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.SubMenuCadastros).eq(1).click({ force: true });
  cy.get(ca.inputNomeOuCPF).type(nomeGerado);
  cy.get(ca.botaoPesquisar).click();
  cy.contains("Classificado");

  cy.wait(5000);
  
  //Essa parte reseta o cadastro para os programas continuarem funcionando no futuro:
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.MeuCadastro).eq(0).click({force: true});
  cy.get(el.botaoEditarCadastro).click();
  cy.get(el.botaoSimEditar).click();
  cy.contains('REALIZAR INSCRIÇÃO - BERÇÁRIO BURITI', { timeout: 10000 }).should('be.visible');
  cy.get(el.checkTermoDeAceito).click();
  cy.get(el.botaoSalvarEContinuar).click();
  
  //Segunda Parte do Cadastro: Dados do Orgão
  cy.get(el.botaoSalvarEContinuar).click();
  
  //Terceira Parte: Dados do Berçario
  cy.get(el.botaoSalvar).click();
  
  //Quarta Parte: Cursos
  cy.get(el.iconeRemoverCurso).eq(3).click();
  cy.get(el.iconeRemoverCurso).eq(2).click();
  cy.get(el.iconeRemoverCurso).eq(1).click();
  cy.get(el.botaoSalvar).click();
  
  //Enviar Cadastro:
  cy.get(el.botaoCiente).click();
  cy.get(el.checkAceitoNoFinalDoCadastro).click();
  cy.wait(1000);
  cy.get(el.checkSegundoAceitoNoFinalDoCadastro).click();
  cy.get(el.botaoEnviar).click();
  cy.contains('Cadadastro enviado com sucesso!', { timeout: 20000 });
  cy.get(menu.Principal, { timeout: 20000 }).click();
  cy.get(menu.MeuCadastro).eq(0).click({force: true});
  cy.get(el.botaoEditarCadastro).click();
  cy.get(el.botaoSimEditar).click();
  cy.contains('REALIZAR INSCRIÇÃO - BERÇÁRIO BURITI', { timeout: 10000 }).should('be.visible');
}); 