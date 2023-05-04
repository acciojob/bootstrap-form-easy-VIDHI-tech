//your code here
const form = document.querySelector("#internship-form");
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const emailInput = document.querySelector("#email-input");
const collegeInput = document.querySelector("#college-input");
const graduationYearInput = document.querySelector("#graduation-year-input");
const rollNoInput = document.querySelector("#roll-no-input");
const conditionsCheckbox = document.querySelector("#conditions-checkbox");
const submitButton = document.querySelector("#submit-button");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!validateInput(firstNameInput)) {
    showError(firstNameInput, "Invalid first name");
  } else {
    removeError(firstNameInput);
  }

  if (!validateInput(lastNameInput)) {
    showError(lastNameInput, "Invalid last name");
  } else {
    removeError(lastNameInput);
  }

  if (!validateEmail(emailInput)) {
    showError(emailInput, "Invalid email address");
  } else {
    removeError(emailInput);
  }

  if (!validateInput(collegeInput)) {
    showError(collegeInput, "Invalid college name");
  } else {
    removeError(collegeInput);
  }

  if (!validateGraduationYear(graduationYearInput)) {
    showError(graduationYearInput, "Invalid graduation year");
  } else {
    removeError(graduationYearInput);
  }

  if (!validateRollNo(rollNoInput)) {
    showError(rollNoInput, "Invalid roll number");
  } else {
    removeError(rollNoInput);
  }

  if (!conditionsCheckbox.checked) {
    showError(conditionsCheckbox, "Please accept the terms and conditions");
  } else {
    removeError(conditionsCheckbox);
  }

  if (validateInput(firstNameInput) && validateInput(lastNameInput) && validateEmail(emailInput) && validateInput(collegeInput) && validateGraduationYear(graduationYearInput) && validateRollNo(rollNoInput) && conditionsCheckbox.checked) {
    alert("Form submitted successfully");
    form.reset();
  }
});

function validateInput(input) {
  return input.value.trim() !== "";
}

function validateEmail(emailInput) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailInput.value.trim());
}

function validateGraduationYear(graduationYearInput) {
  const currentYear = new Date().getFullYear();
  return Number(graduationYearInput.value) >= currentYear && Number(graduationYearInput.value) <= currentYear + 3;
}

function validateRollNo(rollNoInput) {
  const regex = /^[0-9]{2}[A-Z]{2}[0-9]{3}$/;
  return regex.test(rollNoInput.value.trim());
}

function showError(input, message) {
  input.classList.add("is-invalid");
  const errorFeedback = input.nextElementSibling;
  errorFeedback.innerText = message;
  errorFeedback.style.display = "block";
}

function removeError(input) {
  input.classList.remove("is-invalid");
  const errorFeedback = input.nextElementSibling;
  errorFeedback.innerText = "";
  errorFeedback.style.display = "none";
}
describe('Internship Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('shows error messages for invalid inputs', () => {
    cy.get('#first-name-input')
      .type('John')
    cy.get('#last-name-input')
      .type('Doe')
    cy.get('#email-input')
      .type('not-an-email')
      .blur() // move focus away from the input to trigger validation
    cy.wait(1000) // wait for the page to update
    cy.get('label')
      .contains('Email Address') // make sure the label text is correct
      .should('have.css', 'color', 'rgb(255, 0, 0)') // check that the text is red
    cy.get('#college-input')
      .type('Example University')
    cy.get('#graduation-year-input')
      .select('2022')
    cy.get('#roll-no-input')
      .type('12345')
    cy.get('#conditions-checkbox')
      .check()
    cy.contains('Submit')
      .click()
    cy.get('.alert-danger')
      .should('be.visible')
  })
})

