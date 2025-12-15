/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    selectFile(
      file: string | File | Blob,
      options?: Partial<SelectFileOptions>
    ): Chainable<Subject>;
  }
}
