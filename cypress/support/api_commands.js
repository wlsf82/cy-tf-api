const sampleForm = require('../fixtures/sampleForm.json')

const API_URL = Cypress.env('API_BASE_URL')
const authorization = `Bearer ${Cypress.env('TYPEFORM_ACCESS_TOKEN')}`

Cypress.Commands.add('getUserInfo', () => {
  cy.request({
    method: 'GET',
    url: `${API_URL}me`,
    headers: { authorization }
  })
})

Cypress.Commands.add('getFormResponses', formId => {
  cy.request({
    method: 'GET',
    url: `${API_URL}forms/${formId}/responses`,
    headers: { authorization }
  })
})

Cypress.Commands.add('getMyThemes', (page_size = undefined) => {
  cy.request({
    method: 'GET',
    url: !page_size ? `${API_URL}themes` : `${API_URL}themes?page_size=${page_size}`,
    headers: { authorization }
  })
})

Cypress.Commands.add('createSampleForm', () => {
  cy.request({
    method: 'POST',
    url: `${API_URL}forms`,
    headers: { authorization },
    body: sampleForm
  })
})

Cypress.Commands.add('formsCleanup', () => {
  cy.request({
    method: 'GET',
    url: `${API_URL}forms?page_size=200`,
    headers: { authorization },
  }).then(({ status, body }) => {
    expect(status).to.eq(200)
    body.items.forEach(({ id, title, type }) => {
      if (type === sampleForm.type && title === sampleForm.title) {
        cy.request({
          method: 'DELETE',
          url: `${API_URL}forms/${id}`,
          headers: { authorization },
        }).then(({ status }) => {
          expect(status).to.eq(204)
        })
      }
    })
  })
})
