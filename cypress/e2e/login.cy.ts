describe('LogginComponent', () => {
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
  it('No deja Acceder sin Usrname', () => {
    cy.visit('/#/login')
    cy.get('[name=password]').type('12345')
    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Nombre requerido')
  })
})