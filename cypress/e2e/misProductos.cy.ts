describe('MisProductosComponent', () => {
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
    cy.wait(600)
  })

  it('Subir nuevo diseño para probar, subir un producto camiseta y borrar diseño', () => {
    //Subir diseño
    cy.log('SUBIR DISEÑO')
    cy.log('--------------')
    cy.get('.btn-outline-dark').contains('+').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreDiseno]').clear().type('Soy una prueba')
    cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/star.png')
    cy.wait(7000)
    cy.get('.btn-primary').contains('Guardar').click()
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis productos').click()
    cy.get('strong').contains('PRODUCTOS:')

    //subir producto
    cy.log('SUBIR PRODUCTO')
    cy.log('--------------')
    cy.get('.btn-outline-dark').contains('+').click()
    cy.get('.modal').should('be.visible')
    cy.get('#navbarDropdownTipo').click().get('.dropdown-item').contains('Camiseta').click()    
    cy.get('[name=descripcion]').clear().type('Soy un producto')
    cy.get('#navbarDropdownDiseno').click().get('.dropdown-item').contains('Soy una prueba').click()    
    cy.get('[name=precio]').clear().type('25')
    cy.get('.btn-primary').contains('Guardar').click()
    cy.wait(500)

    //Editarlo producto
    cy.log('EDITAR PRODUCTO')
    cy.log('--------------')
    cy.reload()
    cy.wait(300)
    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=descripcion]').clear().type('Soy un producto EDITADO')
    cy.get('[name=precio]').clear().type('45')
    cy.get('.btn-primary').contains('Guardar').click()
    cy.wait(1000)
    cy.reload()
    cy.get('.card-text').contains('Camiseta 45€')

    //Borrar producto
    cy.log('BORRAR PRODUCTO')
    cy.log('--------------')
    cy.get('.btn-lg ').first().contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('.btn-secondary').contains('Eliminar').click()
    cy.wait(200)
    expect('.card-text').to.not.equal('Camiseta 45€')

    //borrar diseño
    cy.log('BORRAR DISEÑO')
    cy.log('--------------')
    cy.get('.bi-person-square').click()
    cy.get('.dropdown-item').contains('Mis diseños').click()
    cy.get('strong').contains('DISEÑOS:')
    cy.wait(200) 
    cy.get('.btn-lg ').contains('Editar').click()
    cy.get('.modal').should('be.visible')
    cy.get('.btn-secondary').contains('Eliminar').click()
    cy.wait(200)
    expect('[name=nombreProducto]').to.not.equal('Soy una segunda prueba')
  })
})