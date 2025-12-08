describe("gallery page tests", () => {
  it("can visit the gallery page", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("All");
  });

  it("renders images after loading", () => {
    cy.visit("http://localhost:5173/");

    // ensure ImageCards are rendered and have tags
    cy.get(".imagecard").should("exist");
    cy.get(".tag").should("exist");
  });

  it("displays tag buttons and allows clicking one", () => {
    cy.visit("http://localhost:5173/");

    // ensure TagSelector exists
    cy.get(".tagbutton").should("exist");
    cy.get(".tagbutton").first().click();

    // ensure images are rendered after clicking a tag
    cy.get(".imagecard").should("exist");
    cy.get(".tagbutton").should("exist");
  });
});