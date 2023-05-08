/// <reference types="cypress"/>

import { format } from "../support/utils";



context('Dev Finances Agilizei', () => {

    //hooks -> trechos que executam antes e depois do teste
    //before -> antes de todos os testes
    //beforeEach -> antes de cada teste
    //after -> depois de todos os testes
    //afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://dev-finance.netlify.app/')
        cy.get('#data-table tbody tr').should('have.length', 0)
        
    });
    
    it('Cadastras Entradas', () => {
    //- entender o fluxo manualmente
   // - mapear os elementos que vamos interagir
   // - descrever as interações com o cypress
   // - adicionar as arcesões que a gente precisa

   

cy.get('#transaction .button').click() //id + class
cy.get('#description').type('Mesada') //id 
cy.get('[name=amount]').type('12') //atributos
cy.get('[type=date]').type('2023-02-01') //atributos
cy.get('button').contains('Salvar').click() //tipo + valor

cy.get('#data-table tbody tr').should('have.length', 1)
});

it('cadastrar Saidas', () => {
   
    cy.get('#transaction .button').click() //id + class
    cy.get('#description').type('KinderOvo') //id 
    cy.get('[name=amount]').type('-12') //atributos
    cy.get('[type=date]').type('2023-02-01') //atributos
    cy.get('button').contains('Salvar').click() //tipo + valor
    
    cy.get('#data-table tbody tr').should('have.length', 1)
    
});
//remover entradas e saidas
it('Remover entradas e saídas', () => {
    const entrada = 'Salario'
    const saida = 'Despesa'
   
    cy.get('#transaction .button').click() //id + class
    cy.get('#description').type('Salario') //id 
    cy.get('[name=amount]').type('100') //atributos
    cy.get('[type=date]').type('2023-02-01') //atributos
    cy.get('button').contains('Salvar').click() //tipo + valor

    cy.get('#transaction .button').click() //id + class
    cy.get('#description').type('Despesa') //id 
    cy.get('[name=amount]').type('-50') //atributos
    cy.get('[type=date]').type('2023-02-01') //atributos
    cy.get('button').contains('Salvar').click() //tipo + valor

    //estratégia 1: voltar para elemento pai, e avançar para um td img attr
    cy.get('td.description')
    .contains(entrada)
    .parent()
    .find('img[onclick*=remove]')
    .click()

    //estratégia 2: buscar todos os irmãos, e buscar os que tem img + attr
    cy.get('td.description')
    .contains(saida)
    .siblings()
    .children('img[onclick*=remove]')
    .click()

    cy.get('#data-table tbody tr').should('have.length', 0)
   
});
    

    it('Validar Saldo com Diversas Transações', () => {

    const entrada = 'Salario'
    const saida = 'Despesa'
   
    cy.get('#transaction .button').click() //id + class
    cy.get('#description').type('Salario') //id 
    cy.get('[name=amount]').type('100') //atributos
    cy.get('[type=date]').type('2023-02-01') //atributos
    cy.get('button').contains('Salvar').click() //tipo + valor

    cy.get('#transaction .button').click() //id + class
    cy.get('#description').type('Despesa') //id 
    cy.get('[name=amount]').type('-50') //atributos
    cy.get('[type=date]').type('2023-02-01') //atributos
    cy.get('button').contains('Salvar').click() //tipo + valor
        //capturar as linhas com transações e as colunas com valores
        //capturar o texto dessas colunas
        //formatar esses valores de linhas

        //somar os valores de entradas e saidas

        //capturar texto do total
        //comparar somatorio de entradas e despesas com o total

        let incomes = 0
        let expenses = 0
        
        cy.get('#data-table tbody tr')
          .each(($el, index, $list) => {
            
            cy.get($el).find('td.income, td.expense') .invoke('text').then(text => {
                if(text.includes('-')){
                   expenses = expenses + format(text) 
                } else{
                    incomes = incomes + format(text)
                }

                cy.log('entradas', incomes)
                cy.log('saidas', expenses)
                
              })
        }) 

        cy.get('#totalDisplay').invoke('text').then(text =>{
            
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })

        
    });
 });

    //- entender o fluxo manualmente
   // - mapear os elementos que vamos interagir
   // - descrever as interações com o cypress
   // - adicionar as arcesões que a gente precisa