describe('RegisterComponent', () => {
  const passwordBuena = "Micon2"
  const usuarioBueno = "test"
  const emailBueno = "miCorreo@gmail.com"

  before(()=>{
    cy.request('https://selldesign-backend.onrender.com/api').then(response=>{
      expect(response.status).to.eq(200)
    })
  })

  it('No deja Registrar sin campos', () => {
    cy.visit('/#/register')
    cy.get('.btn-black').click()
    cy.get('.text-danger').first().contains('Campo obligatorio')
  })
  
  it('Deja Acceder a Login', () => {
    cy.visit('/#/register')
    cy.get('.btn-secondary').click()
    cy.get('.btn-black').contains('Acceder')
  })
  
  it('No deja Registrar sin terminacion de email', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type('test1@cfefwe')
    cy.get('[name=password]').type(passwordBuena)
    cy.get('[name=confirmPassword]').type(passwordBuena)

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Dirección no válida')
  })

  it('No deja Registrar sin terminacion de email 2', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type('test1@cfefwe.')
    cy.get('[name=password]').type(passwordBuena)
    cy.get('[name=confirmPassword]').type(passwordBuena)

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Dirección no válida')
  })

  it('No deja Registrar sin @ de email', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type('test1')
    cy.get('[name=password]').type(passwordBuena)
    cy.get('[name=confirmPassword]').type(passwordBuena)

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Dirección no válida')
  })

  it('No deja Registrar password diferentes', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type(emailBueno)
    cy.get('[name=password]').type("Micon22")
    cy.get('[name=confirmPassword]').type(passwordBuena)

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Las contraseñas no coinciden')
  })

  it('No deja Registrar password sin mayúsculas', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type(emailBueno)
    cy.get('[name=password]').type("micon22")
    cy.get('[name=confirmPassword]').type("micon22")

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Debe contener al menos una mayúscula')
  })

  it('No deja Registrar password sin dígito', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type(emailBueno)
    cy.get('[name=password]').type("Miconnnn")
    cy.get('[name=confirmPassword]').type("Miconnn")

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Debe contener al menos un dígito')
  })

  it('No deja Registrar password menos de 6 caracteres', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type(emailBueno)
    cy.get('[name=password]').type("Mico2")
    cy.get('[name=confirmPassword]').type("Mico2")

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Debe tener entre 6 y 16 carácteres')
  })

  it('No deja Registrar password con más de 16 caracteres', () => {
    cy.visit('/#/register')

    cy.get('[name=username]').type(usuarioBueno)
    cy.get('[name=email]').type(emailBueno)
    cy.get('[name=password]').type("MiconMiconMiconMiconMicon2")
    cy.get('[name=confirmPassword]').type("MiconMiconMiconMiconMicon2")

    cy.get('.btn-black').click()
    cy.get('.text-danger').contains('Debe tener entre 6 y 16 carácteres')
  })
})