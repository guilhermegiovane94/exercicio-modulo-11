/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade Cadastro.', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    })

    it('Deve completar o cadastro com sucesso - usando variáveis ', () => {
        var nome = faker.person.firstName()
        var email = faker.internet.email(nome)
        var sobrenome = faker.person.lastName()
        var senha = faker.internet.password()

        //preenche os dados para cadastro do usuário 
        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type(senha)
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()


        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobrenome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados')
    })

    it('Deve utilizar a massa de dados para executar o teste', () => {
        cy.get('#reg_email').type(perfil.usuario)
        cy.get('#reg_password').type(perfil.senha)
        cy.get(':nth-child(4) > .button').click()


    });

    it('Utilizando metodo fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#reg_email').type(dados.usuario)
            cy.get('#reg_password').type(dados.senha)
            cy.get(':nth-child(4) > .button').click()
        })

    });

    it.only('Utilizando comandos', () => {
        cy.preCadastro(faker.internet.email(), 'teste@123', faker.person.firstName(), faker.person.lastName())
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados')
    });
})
