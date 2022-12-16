import { HttpStatusCode } from "axios"

describe('BarraNavegacionComponent', () => {
  before(()=>{
    cy.request('https://selldesign-backend.onrender.com/api').then(response=>{
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('raulito')
    cy.get('[name=password]').type('123456A')
    cy.get('.btn-black').click()
    cy.get('strong').contains('NOVEDADES')
  })
  
  
  it('Ir al carrito', () => {
    cy.get('.bi-cart').click()
    cy.wait(200)
    cy.get('[name=textoCarrito]').contains('Mi carrito:')
    cy.visit('/#/home')
    cy.wait(1000)
  })
  
  it('Ir a mi perfil', () => {
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mi Perfil').click()
    cy.wait(1000)
    cy.get('strong').contains('FAVORITOS:')
    cy.visit('/#/home')
    cy.wait(1000)

  })

  it('Ir a mis diseños', () => {
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis diseños').click()
    cy.wait(200)
    cy.get('strong').contains('DISEÑOS:')
    cy.visit('/#/home')
    cy.wait(1000)

  })

  it('Ir a mis productos', () => {
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis diseños').click()
    cy.wait(200)
    cy.get('strong').contains('DISEÑOS:')
    cy.visit('/#/home')
    cy.wait(1000)
  })

  it('Cerrar sesion', () => {
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Cerrar Sesión').click()
    cy.wait(200)
    cy.get('.btn-black').contains('Acceder')
    cy.wait(1000)
  })

})