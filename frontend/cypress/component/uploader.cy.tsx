import UpLoader from "../../src/components/Uploader.tsx";
import type { ImageType } from "../../src/pages/Gallery.tsx";

describe("UpLoader.tsx", () => {
  it("mounts uploader, selects file and triggers upload", () => {
    const testImage: ImageType = {
      id: 1,
      url: "cypress/fixtures/image.png",
      tags: ["sample", "test"],
      created_at: new Date().toISOString(),
    };

    cy.mount(<UpLoader />);

    cy.get(".file-input").should("exist");

    cy.get(".upload-button").should("exist");

    cy.get(".file-input").selectFile("cypress/fixtures/image.png");

    cy.get(".upload-button").click();

    cy.get(".upload-status").should("contain.text", "upload successful");
  });
});
