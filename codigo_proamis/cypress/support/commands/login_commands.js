
Cypress.Commands.add("login_sistema", () => { 
    cy.visit('https://homolog.sistemas.df.gov.br/PortalDeServicos/Login');
    cy.get('#Input_UsernameVal').type('fernanda.aguiar');
    cy.get('#Input_PasswordVal').type('nanda7589988P@');
    cy.get('#DropdownOrgao').select('GDF');
    cy.get('#b8-Button').click();
    cy.get('.icone-sistema-wrapper').contains('PROAMIS').click();
    cy.contains('REALIZAR INSCRIÇÃO - BERÇÁRIO BURITI', { timeout: 10000 }).should('be.visible');
})