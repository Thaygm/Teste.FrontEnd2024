/// <reference types="cypress" />

describe("Testes para a home", () => {
    it("Deve renderizar a navbar, carousel e imagem com descrição", () => {
        cy.visit("/");
        cy.get(".navbar a").should("have.length", 3);
        cy.get(".carousel img").should("have.length", 3);
        cy.get("#sobre-nos img").should("be.visible");
        cy.get("#sobre-nos .section-title").should("be.visible");
    });
});





    