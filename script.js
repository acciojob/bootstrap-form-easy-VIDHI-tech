describe("Form validation tests", () => {
  const baseUrl = "http://localhost:3000";
  
  beforeEach(() => {
    cy.visit(baseUrl + "/main.html");
  });

  it("Should have correct classes on form elements", () => {
    cy.get("#first-name-input").should("have.class", "form-control");
    cy.get("#last-name-input").should("have.class", "form-control");
    cy.get("#email-input").should("have.class", "form-control");
    cy.get("#college-input").should("have.class", "form-control");
    cy.get("#grad-year-select").should("have.class", "form-select");
    cy.get("#roll-no-input").should("have.class", "form-control");
    cy.get("#conditions-checkbox").should("have.class", "form-check-input");
  });

  it("Should have correct labels on form elements", () => {
    cy.get("[for=first-name-input]").should("have.class", "form-label").contains("First Name");
    cy.get("[for=last-name-input]").should("have.class", "form-label").contains("Last Name");
    cy.get("[for=email-input]").should("have.class", "form-label").contains("Email Address");
    cy.get("[for=college-input]").should("have.class", "form-label").contains("College");
    cy.get("[for=grad-year-select]").should("have.class", "form-label").contains("Graduation Year");
    cy.get("[for=roll-no-input]").should("have.class", "form-label").contains("Roll No.");
    cy.get("[for=conditions-checkbox]").should("have.class", "form-check-label").contains("Agree to terms and conditions");
  });

  it("Should show error messages on invalid input", () => {
    cy.get("#submit-button").click();
    cy.get("#first-name-input").parent().should("have.class", "has-error");
    cy.get("#last-name-input").parent().should("have.class", "has-error");
    cy.get("#email-input").parent().should("have.class", "has-error");
    cy.get("#college-input").parent().should("have.class", "has-error");
    cy.get("#grad-year-select").parent().should("have.class", "has-error");
    cy.get("#roll-no-input").parent().should("have.class", "has-error");
    cy.get("#conditions-checkbox").parent().should("have.class", "has-error");
  });

  it("Should submit the form when all input is valid", () => {
    cy.get("#first-name-input").type("John");
    cy.get("#last-name-input").type("Doe");
    cy.get("#email-input").type("john.doe@example.com");
    cy.get("#college-input").type("Example College");
    cy.get("#grad-year-select").select("2023");
    cy.get("#roll-no-input").type("123456");
    cy.get("#conditions-checkbox").check();
    cy.get("#submit-button").click();
    cy.contains("Thank you for your submission, John!");
  });
});

