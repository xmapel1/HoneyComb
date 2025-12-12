import ImageCard from "../../src/components/ImageCard.tsx";
import type { ImageType } from "../../src/pages/Gallery.tsx";

describe("ImageCard.tsx", () => {
  it("mounts ImageCard and displays the image and tags", () => {
    const testImage: ImageType = {
      id: 1,
      url: "cypress/fixtures/image.png",
      tags: ["political", "art"],
      created_at: new Date().toISOString(),
    };

    cy.mount(<ImageCard image={testImage} />);
    cy.get(".tag").should("have.length", 2);
    cy.get(".tag").first().should("contain.text", "political");
    cy.get(".tag").last().should("contain.text", "art");
  });
});
