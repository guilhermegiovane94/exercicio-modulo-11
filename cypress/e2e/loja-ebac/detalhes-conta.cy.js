/// <reference types="cypress" />

const { faker } = require("@faker-js/faker");

describe('Funcionalidade: Detalhes da conta', () => {

    beforeEach(() => {
        cy.visit('minha-conta/edit-account/')
        cy.fixture('perfil').then(login => {
            cy.login(faker.internet.email, faker.internet.password)
        })
        
    })

    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta()
    });
})