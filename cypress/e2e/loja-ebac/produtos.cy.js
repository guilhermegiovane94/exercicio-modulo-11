/// <reference types="cypress" />

import { faker } from "@faker-js/faker"
import produtosPage from "../../support/page-objects/produtos.page"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Funcionalidade Produtos.', () => {
    beforeEach(() => {
        produtosPage.visitarUrl()
    })

    it('Deve completar o cadastro com sucesso - usando variáveis ', () => {
        produtosPage.buscarProdutoLista('Beamount Summit kit')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    })

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Zeppelin Yoga Pant'
        produtosPage.buscarProduto(produto)
        cy.get('.product_tittle').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Zeppelin Yoga Pant')
        cy.get('.product_tittle').should('contain', 'Zeppelin Yoga Pant')
    });

    it('Deve adionar produtos ao carrinho', () => {
        let qtd = 3
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('S', 'Blue', qtd)

        cy.get('.woocommerce-message').should('contains', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });


    it.only('Deve adionar produtos ao carrinho buscando da base de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)

            cy.get('.woocommerce-message').should('contain', dados[1].quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
        })

    });
})