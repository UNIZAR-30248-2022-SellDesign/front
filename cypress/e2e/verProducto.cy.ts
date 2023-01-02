describe('ProductComponent', () => {
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

  it('Ver producto, añadirlo al carrito y comprobarlo, añadirlo a favoritos y comprobarlo', () => {
    //añadir 2 productos

    cy.viewport(1400,800)
    cy.get('.card').each(($el, index, $list)=>{
      if(index == 0){
        cy.wrap($el).get("[name=identificador]").first().then(function($elem) {
          primero = $elem.text() 
          cy.get('[name=identificador]').contains(primero).click()
          cy.wait(500)

          //Añadir al carrito
          cy.get('.btn-success').click()
          cy.wait(400)

          //Añadir a favoritos
          cy.get('.like-button').click().wait(600)
          
          //Comprobar que está en favoritos
          cy.visit('/#/Perfil').wait(600)
          cy.get('.tabs__nav-item').contains('FAVORITOS:').click().wait(200)
          cy.get('.card').then(list => {
            const listingCount = Cypress.$(list).length;
            expect(list).to.have.length(listingCount);
          });

          //Quitarlo de favoritos
          cy.get('.card').click().wait(400)
          cy.get('.like-button').click()
          cy.wait(3000)
          
          //Comprobar que NO está en favoritos
          cy.visit('/#/Perfil').wait(600)
          cy.get('.tabs__nav-item').contains('FAVORITOS:').click().wait(200)
          cy.get('strong').contains('NO')

          //visitar el home
          cy.visit('/').wait(300)
        })
      }
    })
    

    //ver carrito
    cy.get('.bi-cart').click()
    cy.get('strong').contains('CARRITO:')
    cy.wait(300)

    cy.get('.card').then(list => {
      const listingCount = Cypress.$(list).length;
      expect(list).to.have.length(listingCount);
    });

    //Vaciar carrito
    cy.get('.btn-danger').contains('Vaciar Carrito').click()
    cy.wait(200)
    cy.get('[name=precio]').then(number => {
      assert.equal(number.text(), '0', 'vals equal')
    })
   
  })
})