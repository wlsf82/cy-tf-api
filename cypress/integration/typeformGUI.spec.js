describe('Typeform GUI tests', () => {
  beforeEach(() => cy.login())

  it('successfully logs in', () => {
    cy.visit('/')
    cy.get('.react-gravatar', { timeout: 30000 })
      .should('be.visible')
  })

  context('Form', () => {
    beforeEach(() => {
      cy.formsCleanup()
      cy.createSampleForm().should(({ status, body }) => {
        expect(status).to.eq(201)
        cy.visit(`/form/${body.id}/results#summary`)
        cy.get('[data-qa="summary-tab"')
          .should('have.attr', 'aria-selected', 'true')
      })
    })

    it('sees the "No signs of movement" image when accessing the Results\' Summary tab', () => {
      cy.get('[data-qa="illustration-container"')
        .should('be.visible')
    })
  })
})