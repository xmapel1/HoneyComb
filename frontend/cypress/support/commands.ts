/// <reference types="cypress" />
import { mount } from "cypress/react";

Cypress.Commands.add("mount", (component: any, options?: any) => {
  return mount(component, options);
});

export {};
