/// <reference types="cypress" />

describe("Testes para pagina de videos", () => {

    it("Deve pesquisar por 'Casamentos' e clicar no botão de pesquisar e favoritar", () => {
        cy.visit("/");	
        cy.contains("Videos").click();	    
        cy.get('input[name="search"]').type("Casamentos");
        cy.get('button[type="submit"]').click();
        cy.get('.video-container .video').should('have.length.at.least', 6);
        for (let i = 0; i < 6; i++) {
            cy.get('.video-container .video').eq(i).find('.favorite-icon').click();
        }
    });
});