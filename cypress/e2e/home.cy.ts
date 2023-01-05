import { HttpStatusCode } from "axios"

describe('HomeComponent', () => {
  before(()=>{
    cy.request('https://selldesign-backend.onrender.com/api').then(response=>{
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('test')
    cy.get('[name=password]').type('Micontraseña2')
    cy.get('.btn-black').click()
    cy.get('strong').contains('NOVEDADES')
  })
  
  it('Muestra 8 novedades', () => {
    cy.get('.card-body').its('length').should('eq', 8)
  })

  it('Cargar más y muestra 16 novedades', () => {
    cy.get('.btn-outline-dark').contains("Cargar más").click().wait(400)
    cy.get('.card-body').its('length').should('eq', 16)
  })

  it('Filtro precio 1€ - 30€', () => {
    cy.get('#navbarDropdownPrecio').click().get('.dropdown-item').contains('1€ - 30€').click()
    cy.wait(10000)
    cy.get('[name=precio]').each((item)=>{
        cy.wrap(item).invoke('text').then(parseInt).should('be.a', 'number').should('be.greaterThan',1).should('be.lessThan',31)
    })
  })
  
  it('Filtro precio 31€ - 70€', () => {
    cy.get('#navbarDropdownPrecio').click().get('.dropdown-item').contains('31€ - 70€').click()
    cy.wait(1000)
    cy.get('[name=precio]').each((item)=>{
        cy.wrap(item).invoke('text').then(parseInt).should('be.a', 'number').should('be.greaterThan',30).should('be.lessThan',70)
    })
  })

})