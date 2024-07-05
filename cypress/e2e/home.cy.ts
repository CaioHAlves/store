describe("Test item search and add to cart", () => {
  it("Visit initial page", () => {
    cy.visit("http://localhost:3000")
  
    cy.get("input").type("cl")
    cy.get("input").should("have.value", "cl")

    cy.get("main").find("button").eq(0).click()
    cy.get("main").find("button").eq(1).click()
    cy.get("main").find("button").eq(1).click()

    cy.get('button[id="button-cart"]').click()

    cy.get('button[id="remove"]').eq(0).click()
    cy.get('button[id="add"]').eq(0).click()
  })
})