import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    selectFile(
      file: string | File | Blob,
      options?: Partial<SelectFileOptions>
    ): Chainable<Subject>;
  }
}

export {};
