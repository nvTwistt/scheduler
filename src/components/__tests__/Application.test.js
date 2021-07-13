import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, prettyDOM, fireEvent,getByText, getByAltText, getAllByTestId, getAllByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText, wait, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
  
    await waitForElement(() => getByText(appointment, "Saving data"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const findAppointment = appointments.find((appointment) => (
      queryByText(appointment, "Archie Cohen")
    ));
    fireEvent.click(getByAltText(findAppointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(findAppointment, "Delete the Appointment?"));
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(findAppointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(findAppointment, "deleting data"));
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElementToBeRemoved(() => getByText(findAppointment, "deleting data"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
    // 3. Find the appointment with archie
    const appointments = getAllByTestId(container, "appointment");
    const findAppointment = appointments.find((appointment) => (
      queryByText(appointment, "Lydia Miller-Jones")
    ));
    // 4. Click the "edit" button on the booked appointment.
    fireEvent.click(getByAltText(findAppointment, "Edit"));
    // 5. Change the name of the student
    fireEvent.change(getByPlaceholderText(findAppointment, /enter student name/i), {
      target: {value: "Matthew"}
    });
    // 6. Select a new interviewer
    fireEvent.click(getByAltText(findAppointment, "Sylvia Palmer"));
    // 7. Save 
    fireEvent.click(getByText(findAppointment, "Save"));
    // 8. check to see that the saving transition is active
    expect(getByText(findAppointment, "Saving data"));
    // 10. check spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })
  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
    const {container} = render(<Application/>);
    await waitForElement(() => getByText(container, "Matthew"));
    const appointments = getAllByTestId(container, "appointment");
  
    const findAppointment = appointments.find(appointment => queryByText(appointment, "Matthew"))
    fireEvent.click(queryByAltText(findAppointment, "Edit"));
    fireEvent.change(getByPlaceholderText(findAppointment, /enter student name/i), {
      target: {
        value: "Matt Bad"
      }
    });
    fireEvent.click(getByAltText(findAppointment, "Sylvia Palmer"));
    fireEvent.click(getByText(findAppointment, "Save"));
    expect(getByText(findAppointment, "Saving data"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    const {container} = render(<Application/>);
    await waitForElement(() => getByText(container, "Matthew"));
    const appointments = getAllByTestId(container, "appointment");
  
    const findAppointment = appointments.find(appointment => queryByText(appointment, "Matthew"))
    fireEvent.click(queryByAltText(findAppointment, "Delete"));
    expect(getByText(findAppointment, "Delete the Appointment?"));
    fireEvent.click(queryByText(findAppointment, "Confirm"));
    expect(getByText(findAppointment, "deleting data"));
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElementToBeRemoved(() => getByText(findAppointment, "deleting data"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
    // 4. Check that the confirmation message is shown.
    //expect(getByText(findAppointment, "Delete the Appointment?"));

  });
})

