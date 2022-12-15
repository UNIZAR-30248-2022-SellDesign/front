describe('MisDisenosComponent', () => {
  var descripcion = ""
  var nombre = ""
  const desc = "JAJAJAJA"
  const nom = "Pepito Grillo"

  before(() => {
    cy.request('https://selldesign-backend.onrender.com/api').then(response => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('raulito')
    cy.get('[name=password]').type('123456A')
    cy.get('.btn-black').click()
    // cy.visit('/#/Perfil')
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis diseños').click()
    cy.get('strong').contains('DISEÑOS:')
    cy.wait(200)
  })

  it('Subir nuevo diseño', () => {
    cy.get('.btn-outline-dark').contains('+').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreDiseno]').clear().type('Soy una prueba')
    cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/star.png')
    cy.wait(1000)
    cy.get('.btn-primary').contains('Guardar').click()
    cy.get('.card-text').contains('Soy una prueba')

  })

  it('Editar diseño creado', () => {
    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreDiseno]').clear().type('Soy una segunda prueba')
    cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/star.png')
    cy.get('.btn-primary').contains('Guardar').click()
    //recargar pag
    cy.get('.card-text').contains('Soy una segunda prueba')
    
  })

  it('Eliminar   diseño', () => {
    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('.btn-secondary').contains('Eliminar').click()
    expect('[name=nombreProducto]').to.not.equal('Soy una segunda prueba')
  })

})