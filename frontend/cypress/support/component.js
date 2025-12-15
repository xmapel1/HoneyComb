import "./commands";

import { mount } from "cypress/react";
import "@cypress/react";

Cypress.Commands.add("mount", mount);
