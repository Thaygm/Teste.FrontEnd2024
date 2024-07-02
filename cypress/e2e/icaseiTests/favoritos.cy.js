/// <reference types="cypress" />

describe("Testes para a página de Favoritos", () => {
        it("Deve acessar a página e desfavoritar dois videos da página", () => {
        cy.clearLocalStorage()
            .then(() => {
                window.localStorage.setItem('favoriteVideos',  "\[\"7s0ueHH9VdM\",\"pCDct0y8wxc\",\"s_8GLWxQRdY\",\"-SWG_Jn_jCU\",\"n7PbznE9zKs\",\"x6FbhiGGeps\"]");
            })
        cy.visit("/")
        cy.contains("Favoritos").click();
        cy.get('.favorite-icon').eq(1).click();	
        cy.get('.favorite-icon').eq(0).click();	
    });

    it("Deve remover todos os vídeos favoritos clicando no botão 'Remover todos os favoritos", () => {
        cy.clearLocalStorage()
            .then(() => {
                window.localStorage.setItem('favoriteVideos',  "\[\"7s0ueHH9VdM\",\"pCDct0y8wxc\",\"s_8GLWxQRdY\",\"-SWG_Jn_jCU\",\"n7PbznE9zKs\",\"x6FbhiGGeps\"]");
            })
        cy.visit("/")
        cy.contains("Favoritos").click();  
        cy.get('#remove-all-favorites').click();
        cy.get('.video').should('have.length', 0);
    });
});