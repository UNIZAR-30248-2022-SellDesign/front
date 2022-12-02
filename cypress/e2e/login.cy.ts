import { HttpStatusCode } from "axios"

describe('LogginComponent', () => {
  before(()=>{
    cy.request('https://selldesign-backend.onrender.com/api').then(response=>{
      expect(response.status).to.eq(200)
    })
  })
  it('No deja Acceder sin campos', () => {
    cy.visit('/#/login')
    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Nombre requerido')
    cy.get('.text-danger').contains('Contraseña requerida')
  })
  it('No deja Acceder sin Contraseña', () => {
    cy.visit('/#/login')
    cy.get('[name=username]').type('test1')
    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Contraseña requerida')
  })
  it('No deja Acceder sin UsErname', () => {
    cy.visit('/#/login')
    cy.get('[name=password]').type('12345')
    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Nombre requerido')
  })
  it('Accede a home con usuarios correctos', () => {
    cy.visit('/#/login')
    cy.get('[name=username]').type('ibon3')
    cy.get('[name=password]').type('Micontraseña2')
    cy.get('.btn-black').click()
    cy.get('strong').contains('NOVEDADES')
  })
})