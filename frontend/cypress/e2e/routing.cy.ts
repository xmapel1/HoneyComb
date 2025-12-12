describe("routing tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("loads the gallery page", () => {
    cy.get(".gallery").should("exist");
    cy.get(".tagSelector").should("exist");
  });

  it("can navigate to about page and loads content", () => {
    cy.get(".nav-links a").contains("About").click();
    cy.get(".about").should("exist");
    cy.get(".about h1").contains("TL;DR");
  });

  it("can navigate back to gallery page and loads content", () => {
    cy.get(".nav-links a").contains("About").click();
    cy.get(".nav-links a").contains("Gallery").click();
    cy.get(".gallery").should("exist");
    cy.get(".tagSelector").should("exist");
  });
});
