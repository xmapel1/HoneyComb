import TagSelector from "../../src/components/TagSelector";

describe("TagSelector.tsx", () => {
  it("mounts TagSelector and allows clicking tag", () => {
    cy.mount(
      <TagSelector
        tags={["dark", "philosophy", "media", "art", "political"]}
        selectedTag="all"
        onTagClick={() => {}}
      />
    );
    cy.get(".tagbutton").should("have.length", 5);
    cy.get(".tagbutton").first().click();

    cy.get(".tagbutton").first().should("have.css", "color", "rgb(0, 0, 0)");
  });
});