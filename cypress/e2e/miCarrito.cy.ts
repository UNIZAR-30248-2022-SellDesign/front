describe('MiCarritoComponent', () => {
  let primero : any
  let hayDos : boolean = false
  before(() => {
    cy.request('https://selldesign-backend.onrender.com/api').then(response => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/#/login')
    cy.get('[name=username]').type('raulito')
    cy.get('[name=password]').type('123456A')
    cy.get('.btn-black').click()
    cy.get('strong').contains('NOVEDADES')
  })

  it('Añadir 2 productos al carrito y ver carrito, borrar uno y vaciar carrito', () => {
    //añadir 2 productos

    cy.viewport(1400,800)
    cy.get('.card').each(($el, index, $list)=>{
      if(index == 0){
        // primero = cy.wrap(item)
        cy.wrap($el).get("[name=identificador]").first().then(function($elem) {
          primero = $elem.text() 
          cy.get('[name=identificador]').contains(primero).click()
          // // cy.log('primero', primero);
          cy.wait(500)
          cy.get('.btn-success').click()
          cy.wait(400)
          cy.visit('/').wait(300)
        })
      }else{
        cy.wrap($el).get("[name=identificador]").eq(index).then(function($elem) {
          let segundo = $elem.text() 
          if(primero !== $elem.text() && !hayDos){
            hayDos = true
            cy.get('[name=identificador]').eq(index).contains(segundo).click()
            // // cy.log('primero', primero);
            cy.wait(500)
            cy.get('.btn-success').click()
            cy.wait(400)
            cy.visit('/').wait(300)
          }
        })

      }
    })
    
    // cy.get('.card').contains(primero)

    //ver carrito
    cy.get('.bi-cart').click()
    cy.get('strong').contains('CARRITO:')
    cy.wait(300)

    cy.get('.card').then(list => {
      const listingCount = Cypress.$(list).length;
      expect(list).to.have.length(listingCount);
    });

    //Eliminar 1 producto
    cy.get('.btn-danger').contains('Eliminar').first().click()
    cy.wait(200)
    cy.get('.card').then(list => {
      expect(list).to.have.length(1);
    });
    
    //Vaciar carrito
    cy.get('.btn-danger').contains('Vaciar Carrito').click()
    cy.wait(200)
    cy.get('[name=precio]').then(number => {
      assert.equal(number.text(), '0', 'vals equal')
    })
  })
})