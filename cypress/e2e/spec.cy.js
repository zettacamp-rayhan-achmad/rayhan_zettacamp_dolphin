describe('task', () => {
   it('login', () => {
      cy.visit('http://localhost:4200/');
      cy.wait(500);
      cy.get('[data-cy="input-name"]').type('rayhan');
      cy.wait(500);
      cy.get('[data-cy="input-password"]').type('123456');
      cy.wait(500);
      cy.get('[data-cy="btn-login"]').click({ force: true });
      cy.get('[data-cy="text-navbar-header"]').should('be.visible');
      cy.get('[data-cy="text-navbar-profile-name"]').should('be.visible');
      cy.get('[data-cy="text-navbar-profile-name"]')
         .should('exist')
         .should('have.text', ' Hi, rayhan ');
      cy.wait(500);
      cy.get('[data-cy="btn-logout"]').click({ force: true });
      cy.get('.hero').should('be.visible');
   }),
      it('checkout', () => {
         cy.visit('http://localhost:4200/');
         cy.wait(500);
         cy.get('[data-cy="input-name"]').type('rayhan');
         cy.wait(500);
         cy.get('[data-cy="input-password"]').type('123456');
         cy.wait(500);
         cy.get('[data-cy="btn-login"]').click({ force: true });
         cy.wait(500);
         cy.get('[data-cy="text-navbar-profile-name"]').should('be.visible');
         cy.get('[data-cy="text-navbar-profile-name"]').should(
            'have.text',
            ' Hi, rayhan '
         );
         cy.wait(500);
         cy.get(
            ':nth-child(1) > .card-body > [data-cy="btn-add-menu-item-to-cart"]'
         ).click();
         cy.wait(500);
         cy.get(
            ':nth-child(2) > .card-body > [data-cy="btn-add-menu-item-to-cart"]'
         ).click();
         cy.wait(500);
         cy.get(
            ':nth-child(2) > .card-body > [data-cy="btn-add-menu-item-to-cart"]'
         ).click();
         cy.wait(500);
         cy.get(
            ':nth-child(3) > .card-body > [data-cy="btn-add-menu-item-to-cart"]'
         ).click();
         cy.wait(500);
         cy.get(
            ':nth-child(4) > .card-body > [data-cy="btn-add-menu-item-to-cart"]'
         ).click();
         cy.wait(500);
         cy.get(
            ':nth-child(2) > [data-cy="btn-remove-item-from-cart"]'
         ).click();
         cy.wait(1000);
         cy.get('[data-cy="btn-checkout"]').click({ force: true });
         cy.get('[data-cy="alert-message"]').should('exist');
         cy.wait(1000);
         cy.get('[data-cy="btn-logout"]').click({ force: true });
      });
});
