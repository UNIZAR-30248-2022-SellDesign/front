import { HttpStatusCode } from "axios"

describe('HomeComponent', () => {
  before(()=>{
    cy.request('https://selldesign-backend.onrender.com/api').then(response=>{
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('ibon3')
    cy.get('[name=password]').type('Micontraseña2')
    cy.get('.btn-black').click()
    cy.get('strong').contains('NOVEDADES')
  })
  
  
  it('Filtro precio 1€ - 30€', () => {
    cy.get('#navbarDropdownPrecio').click().get('.dropdown-item').contains('1€ - 30€').click()
    

    cy.get('[name=precio]').each((item)=>{
        cy.wrap(item).invoke('text').then(parseInt).should('be.a', 'number').should('be.greaterThan',1).should('be.lessThan',31)
    })

    
  })
  
  it('Filtro precio 31€ - 70€', () => {
    cy.get('#navbarDropdownPrecio').click().get('.dropdown-item').contains('31€ - 70€').click()
    cy.wait(500)
    cy.get('[name=precio]').each((item)=>{
        cy.wrap(item).invoke('text').then(parseInt).should('be.a', 'number').should('be.greaterThan',30).should('be.lessThan',70)
    })
  })

})