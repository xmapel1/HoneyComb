import UpLoader from "../../src/components/UpLoader";
import { MemoryRouter } from "react-router-dom";

describe("UpLoader", () => {
  it("allows entering image url and submitting form", () => {
    cy.mount(
      <MemoryRouter>
        <UpLoader />
      </MemoryRouter>
    );

    cy.get(".file-input").should("exist").type("https://example.com/image.png");

    cy.get(".tag-input").should("exist").type("political, art");

    cy.get(".upload-button").should("exist").click();
  });
});
