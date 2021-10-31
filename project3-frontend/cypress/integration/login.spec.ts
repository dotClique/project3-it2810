/* eslint-disable jest/valid-expect */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable jest/expect-expect */

import { Paths } from "../../src/helpers/constants";

describe("Test page functionliaty", () => {
  beforeEach(() => {
    // Log into the page each test
    cy.visit("/");
    cy.get("[data-testid=alias-field]").type("username");
    cy.get("[data-testid=loginbutton").click();
    cy.wait(3000);
  });

  it("Test login", () => {
    cy.url().should("include", Paths.MOVIE_GROUPS);
  });

  it("Test creating a movie group", () => {
    cy.get("[data-testid=footerbutton]").contains("Add new movie group").click();
    cy.wait(3000);
    cy.url().should("include", Paths.ADD_MOVIE_GROUP);
    cy.get("[data-testid=name]").type("Superheroes");
    cy.get("[data-testid=description]").type("Only superhero movies.");
    cy.get("[data-testid=submit-button]").click();
    cy.wait(3000);
    cy.url().should("include", "group");
  });

  it("Test favoriting a movie group", () => {
    cy.get("[data-testid=outlinedHeart]").first().click();
    cy.wait(2000);
    cy.get("[data-testid=outlinedHeart]").should("not.exist");
    cy.get("[data-testid=solidHeart]").should("exist");
  });
});
