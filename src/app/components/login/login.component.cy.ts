import { LoginComponent } from './login.component'

describe('LogginComponent', () => {
  /*it('mounts', () => {
    cy.mount(LoginComponent)
  })*/
  it('No deja Acceder sin campos', () => {
    cy.visit('/#/login')
    cy.get('.btn-black').click()
    cy.get('text-danger').contains('Nombre requerido')
    /*cy.get('text-danger').contains('Nombre requerido')
    cy.get('text-danger').contains('Contraseña requerida')*/
  })
  /*it('supports an "initial" prop to set the value', () => {
    cy.mount(LoginComponent, {
      componentProperties: {
        count: 100,
      },
    })
    cy.get('[data-cy=counter]').should('have.text', '100')
  })*/
})