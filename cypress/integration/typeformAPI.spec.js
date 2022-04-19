const sampleForm = require('../fixtures/sampleForm.json')

describe('Typeform API tests', () => {
  it('retrieves my user information', () => {
    cy.getUserInfo().should(({ status, body }) => {
      const { alias, email, language } = body

      expect(status).to.eq(200)
      expect(alias).to.eq(Cypress.env('userAlias'))
      expect(email).to.eq(Cypress.env('username'))
      expect(language).to.eq('en')
    })
  })

  it('retrieves form responses', () => {
    const formId = Cypress.env('formId')
    cy.getFormResponses(formId).should(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.total_items).to.be.gt(0)
    })
  })

  it('retrieves my themes', () => {
    cy.getMyThemes().should(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.total_items).to.be.gt(0)
    })
  })

  it('retrieves my first 5 themes', () => {
    const pageSize = 5
    cy.getMyThemes(pageSize).should(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.items.length).to.eq(5)
    })
  })

  context('Cleanup first', () => {
    beforeEach(() => cy.formsCleanup())

    it('creates a form', () => {
      cy.createSampleForm().should(({ status, body }) => {
        const { fields, title, type } = body

        expect(status).to.eq(201)
        expect(fields.length).to.eq(1)
        expect(title).to.eq(sampleForm.title)
        expect(type).to.eq(sampleForm.type)
      })
    })
  })
})
