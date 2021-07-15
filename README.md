# Interview Scheduler

Interview scheduler is a single page React app that allowers users to schedule interviews, edit interviews and delete interviews. 
The application leverages a seperate API that uses a PostgreSQL database which the two apps will communicate by HTTP JSON requests.

## Final Product
Screenshot of main landing page which shows interviews and slots 
!["screenshot of main page"](https://github.com/nvTwistt/scheduler/blob/master/docs/main.png)
Screenshot of the form to book an interview
!["screenshot of adding new interview"](https://github.com/nvTwistt/scheduler/blob/master/docs/addStudent.png)
Screenshot of user adding information to the form
!["screenshot of interview form"](https://github.com/nvTwistt/scheduler/blob/master/docs/addInformation.png)
Screenshot of the interview that was just booked
!["screenshot of booked appointment"](https://github.com/nvTwistt/scheduler/blob/master/docs/appointmentaBooked.png)
Screenshot of user editing appointment
!["screenshot of editing appointment"](https://github.com/nvTwistt/scheduler/blob/master/docs/edit.png)
Screenshot of user deleting an appointment
!["screenshot of delete appointment"](https://github.com/nvTwistt/scheduler/blob/master/docs/deleteAppointment.png)
## Setup

Install dependencies with `npm install`.
Run the Webpack development server
Navigate to http:localhost:8000 in your browser

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
