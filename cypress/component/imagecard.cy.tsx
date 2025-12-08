import ImageCard from "../../src/components/ImageCard";
import type { ImageType } from "../../src/pages/Gallery";

describe("ImageCard.tsx", () => {
  it("mounts ImageCard and displays the image and tags", () => {
    const testImage: ImageType = {
      id: 1,
      url: "cypress/fixtures/image.png",
      tags: ["political", "art"],
    };

    cy.mount(<ImageCard image={testImage} />);
    cy.get(".tag").should("have.length", 2);
    cy.get(".tag").first().should("contain.text", "political");
    cy.get(".tag").last().should("contain.text", "art");
  });
});