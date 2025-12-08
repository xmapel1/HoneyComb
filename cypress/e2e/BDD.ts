import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("im on the gallery page", () => {
  cy.visit("http://localhost:5173/");
});

When("i click a tag", () => {
  cy.get(".tagbutton").first().click();
});

Then("the tag click is registered", () => {
  cy.get(".tagbutton")
    .first()
    .should("have.css", "color", "rgb(255, 255, 255)");
});
