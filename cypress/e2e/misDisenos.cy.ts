describe('MisDisenosComponent', () => {

  before(() => {
    cy.request('https://selldesign-backend.onrender.com/api').then(response => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('test')
    cy.get('[name=password]').type('Micontraseña2')
    cy.get('.btn-black').click()
    // cy.visit('/#/Perfil')
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis diseños').click()
    cy.get('strong').contains('DISEÑOS:')
    cy.wait(200)
  })

  it('Subir nuevo diseño + Editar diseño creado (nombre diseño) + eliminarlo ', () => {
    cy.get('.btn-outline-dark').contains('+').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreDiseno]').clear().type('Soy una prueba')
    cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/star.png')
    cy.wait(7000)
    cy.get('.btn-primary').contains('Guardar').click()
    cy.wait(3000)
    cy.reload()
    cy.get('.card-text').contains('Soy una prueba')


    cy.wait(3000)
    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreDiseno]').clear().type('a')
    cy.wait(200)
    cy.get('[name=nombreDiseno]').clear().type('Soy una segunda prueba')
    // cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/star.png')
    cy.get('.btn-primary').contains('Guardar').click()
    //recargar pag
    cy.wait(3000)
    cy.reload()
    cy.get('.card-text').contains('Soy una segunda prueba')

    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('.btn-secondary').contains('Eliminar').click()
    cy.wait(200)
    expect('[name=nombreProducto]').to.not.equal('Soy una segunda prueba')
  })

 

})