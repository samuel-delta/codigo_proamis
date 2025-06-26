
Cypress.Commands.add("login_sistema", () => { 
    cy.visit('https://homolog.sistemas.df.gov.br/PortalDeServicos/Login');
    cy.get('span:contains("Portal de Sistemas")', { timeout: 20000 }).should('be.visible');
    cy.get('#Input_UsernameVal').type('fernanda.aguiar');
    cy.get('#Input_PasswordVal').type('nanda7589988P@^');
    cy.get('#DropdownOrgao').select('GDF');
    cy.get('#b8-Button').click();
    cy.get('.icone-sistema-wrapper').contains('PROAMIS').click();
})