describe('PerfilComponent', () => {
  var descripcion = ""
  var nombre = ""
  const desc = "JAJAJAJA"
  const nom = "Pepito Grillo"

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
    cy.get('.dropdown-item').first().contains('Mi Perfil').click()
    cy.get('strong').contains('FAVORITOS:')
    cy.wait(200)
  })

  it('Editar Perfil + X', () => {
    cy.get('[name=nombre]').then(mes => {
      nombre = mes.text()
    })
    cy.get('[name=descripcion]').then(mes => {
      descripcion = mes.text()
    })
    
    cy.get('.btn-outline-primary').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreModal]').clear().type('Soy una prueba')

    cy.get('[name=descripcionModal]').clear().type('Prueba realizada con exito')
    cy.get('.btn-close').click()
    
    expect('[name=nombre]').to.not.equal('Soy una prueba')
    expect('[name=descripcion]').to.not.equal('Prueba realizada con exito')
    
  })

  it('Editar Perfil + Cancelar', () => {
    cy.get('[name=nombre]').then(mes => {
      nombre = mes.text()
    })
    cy.get('[name=descripcion]').then(mes => {
      descripcion = mes.text()
    })
    
    cy.get('.btn-outline-primary').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreModal]').clear().type('Soy una prueba')

    cy.get('[name=descripcionModal]').clear().type('Prueba realizada con exito')
    cy.get('.btn-secondary').click()
    
    expect('[name=nombre]').to.not.equal('Soy una prueba')
    expect('[name=descripcion]').to.not.equal('Prueba realizada con exito')
  })

  it('Editar Perfil + Guardar', () => {
    cy.get('[name=nombre]').then(mes => {
      nombre = mes.text()
      cy.log(nombre)
    })
    cy.get('[name=descripcion]').then(mes => {
      descripcion = mes.text()
      cy.log(descripcion)

    })
    
    cy.get('.btn-outline-primary').click()
    cy.get('.modal').should('be.visible')
    cy.get('[name=nombreModal]').clear().type('Soy una prueba')

    cy.get('[name=descripcionModal]').clear().type('Prueba realizada con exito')
    cy.get('.btn-primary').contains('Guardar').click()
    cy.wait(1500)
 
    cy.get('[name=nombre]').should((elem) => {
      // cy.log('elemento', elem.text())
      expect(elem.text()).to.equal('Soy una prueba');
    });

    cy.get('[name=descripcion]').should((elem) => {
      // cy.log('elemento', elem.text())
      expect(elem.text()).to.equal('Prueba realizada con exito');
    });
  })

  it('Cambiar foto perfil', () => {
    // cy.get('.btn-primary').contains('Editar Foto').click()  
    cy.get('input[type=file]').invoke('show').selectFile('cypress/fixtures/Avatar.jpg')
    cy.get('label').find('img').should('have.attr', 'src').should('include', 'thumbsnap.com')
  })


  // it('Si no hay favoritos, texto informativo', () => {
  //   cy.get('[name=botonFavorito]').click()
  //   cy.get('[name=mensajeFav]').should('be.visible').then(() => {
  //     cy.log('FUNCIONA')
  //     cy.get('.list-group-item')
  //       .should('have.length', 0)
  //   })
  // })
  
  // it('Si no hay productos, texto informativo', () => {
  //   // cy.get('.list-group-item')
  //   //   .should('have.length.greaterThan', 1)
  //   //   // now that we know the elements have loaded, get the number
  //   //   .its('length')
  //   //   .then(n => {
  //   //     // use n if you need to  
  //   //     console.log('ASKJDABLSKJDFSJLDAF',n);

  //   //   })

  //   cy.get('[name=botonProducto]').click()
  //   cy.get('[name=mensaje]').should('be.visible').then(() => {
  //     cy.log('FUNCIONA')
  //     cy.get('.list-group-item')
  //       .should('have.length', 0)
  //   })
  // })



  // it('Mostrar Productos en venta', () => {
  // })

  // it('Mostrar Favoritos', () => {
  //   cy.get('[name=botonFavorito]').click()
  //   cy.get('.list-group-item').then((list) => {
  //     if(list.length > 0){
  //       cy.get('[name=mensajeFav]').should('not.be.visible')
  //     }
  //   })

  // })


})