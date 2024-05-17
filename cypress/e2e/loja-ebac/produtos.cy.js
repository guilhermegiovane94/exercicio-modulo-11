/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Funcionalidade Produtos.', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    })

    it.only('Deve completar o cadastro com sucesso - usando variáveis ', () =>{
        cy.get('.products > .row')
        .contains('Apollo Running Short')
        .click()

        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    })
})