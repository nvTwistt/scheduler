describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });
  
   it("should book an interview", () => {
    cy.get("[alt=Add]")
     .first()
     .click();
  
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();
  
    cy.contains("Save").click();
  
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
   });
   it("Should edit an interview", () => {
     cy.get("[alt='Edit']")
     .first()
     .click({force: true})

     cy.get("[data-testid=student-name-input").clear().type("Matt");
     cy.get('[alt="Sylvia Palmer"]').click();
     cy.contains("Save").click();
  
    cy.contains(".appointment__card--show", "Matt");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
   })
   it("SHould cancel an interview", () => {
     cy.get("[alt='Delete']")
     .first()
     .click({force: true})
     cy.contains(".button--danger", "Confirm").click()
     cy.contains("deleting data").should("exist");
     cy.contains("deleting data").should("not.exist");
     cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
   })
});