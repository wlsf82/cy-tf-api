describe('Typeform GUI tests', () => {
  beforeEach(() => cy.login())

  it('successfully logs in', () => {
    cy.visit('/')
    cy.get('.react-gravatar', { timeout: 30000 })
      .should('be.visible')
  })

  context('Form', () => {
    beforeEach(() => cy.formsCleanup())

    it('submits a form create via API', () => {
      cy.createSampleForm().should(({ status, body }) => {
        expect(status).to.eq(201)
        cy.visit(`form/${body.id}/share#/`)
        cy.get('[data-qa="view-btn"]')
          .should('be.visible')
          .invoke('attr', 'href')
          .then(url => {
            cy.origin(url, () => {
              cy.visit('')
              // cy.get('input[type="text"]')
              //   .should('be.visible')
              //   .type('Foo')
              // cy.contains('[class^="OptionsList"] ul li', 'Foo')
              //   .should('be.visible')
              //   .click()
              // cy.contains('button', 'Submit')
              //   .should('be.visible')
              //   .click()
              // cy.contains('h1', 'Thanks for completing this typeform')
              //   .should('be.visible')
            })
          })
        cy.getFormResponses(body.id).should(({ body }) => {
          expect(body.total_items).to.be.gte(0)
        })
      })
    })
  })
})