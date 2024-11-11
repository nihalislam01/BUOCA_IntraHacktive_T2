# Office of Co-Curricular Activities (OCA) Web Application Documentation

## 1. Project Overview

### Problem Statement
Due to outdated, manual processes, the Office of Co-Curricular Activities (OCA) at BRAC University faces significant operational challenges in managing interactions with club panel members. These issues affect several critical areas
- **Event Management Delays**
- **Communication Inefficiencies**
- **Room Booking Struggles**
- **Budget Approval Transparency**
- **Demand for Data-Driven Insights**

### Solution
1. Separate dashboard for OCA and the organizers
2. Events creation, details, and current status observation
3. The budget request, details, a discussion thread on budget, and current status observation
4. First come first serve room booking service to ensure an impartial and priority-based room booking system
5. Data analysis representing the overall pattern 

---

## 2. Features Implemented

### Feature 1: Authentication and Authorization
- **Authentication**: Users log in with credentials. If valid, a JWT is generated and stored on the client.
- **Authorization**: Based on the user’s role (OCA and the organizers), certain endpoints, pages, or actions are accessible or restricted within the app.

### Feature 2: Events Details, Event Creation, and Approval Dashboard
- To keep the transparency in the communication between the OCA and the organizers, the events dashboard feature includes event names, dates, clubs, requested by, approved by, and status details. When an event is approved/rejected by the OCA, the status is updated. This feature makes the communication more organized and easier. 

### Feature 3: Budget Request and Approval Dashboard
- This feature allows requesting the budget for an event and this feature has club name, amount, requested by, approved by, and status details. It ensures a transparent and better discussion method on budget approval.

### Feature 4: Communication Thread
- When a budget or event is pending/rejected the OCA can provide the reasoning and necessary instructions regarding that so that the organizers can work on it. This makes the communication more reliable. 

### Feature 5: Room Booking System
- We have used the bit masking method to store room booking info for different schedules. We have stored available room status with a date and schedule which is a binary string representing each time slot. For example, “11000000” means 8:00 AM to 10:50 AM is booked for that particular room for that particular date. Also, we have handled data insertion by users when they search for a date. If the date does not exist in the database, it will automatically create a new schedule with all available rooms for that day. Also we have put constraints of a date that is previous from today and more than a month later won’t show available room status so that a user won’t be able to overflood the database. This feature will allow organizers to check the room availability status and request the available rooms based on their required time slots. They can stage rooms and request the room booking service with multiple time slots and request purpose. The OCA will be able to check the requests and details of how many rooms and what time slots they have chosen and then accept or decline the requests. This will ensure a priority-based and unbiased room booking system. 

### Feature 6: Data Analysis
- This feature ensures a proper and systematic representation of the patterns of the data which will help the OCA as well as the organizers to make the system hassle free. 

---

## 3. Technical Stack and Architecture

### Frontend: React
- We have Implemented the front end with React to create a dynamic user interface. We used bootstrap css to enhance user experience. For visualization tools we used chart.js library to make easy user friendly visualizations. We tried making the most use of the react component to make functional programming.

### Backend: Express.js and Node.js
- For the backend we used Node. To enhance standardization techniques, we created Restful API’s to create external communication. We maintained the MVC structure and performed our logical operations.

### Database: MongoDB
- We connected to MongoDB Atlas for a more secure user experience. MongoDB is highly scalable when needed. For a middle to large scale product mongoDB is better suited. We manipulated data from the backend by storing and fetching from the database.

---

## 4. User Guide

### Accessing the Website
1. Open a browser and go to the domain and a login page will appear.
2. Then users have to provide login credentials by filling a form to login to their dashboard.
3. According to their role they can access different pages. (OCA and Club Panel Member)
4. A dashboard will be opened for both users with data insights and analytics. 
5. Navigate using the menu:
   - Feature 1: OCA admin has a clickable approve or reject button for events, and his email will be shown for clarification for those who do it.
   - Feature 2: The club organizer can click “Events” and get a form to fill up to book an event. Which will be sent to the OCA admin along with a budget request, which works the same way.
   - Feature 3: hovering over budget shows a breakdown of the budget purpose that was requested by the club event organizer.
   - Feature 4: The club organizers can check available rooms and stage multiple rooms to create a book request with the purpose of booking these rooms.
   - Feature 5: The OCA will be able to check room booking requests with details of how many rooms are requested for booking and why they are requested. Then OCA will approve and reject room booking requests accordingly.
   - Feature 6: Every event, budget and room booking request will have a real-time message thread to make conversation regarding the request. All of the messages will be stored and tracked later for each individual request.tracking.

---

## 5. Challenges and Solutions
- We faced problems collaborating in github where one has to sit with another to create a pull request which was time consuming. However, we overcame the problem by finding a solution to create conflict free pull requests. We learned a lot about how we can collaborate while making no conflict.
- First we came up with a bunch of solutions and it took us a lot of time to come to a conclusion. First 24 hours we panicked and had no progress. Lost all hope. We overcame the problem by starting working on small portions one by one rather than taking a big portion of work.
- The most challenges we faced was with the technical part. We faced errors and overcame them with the help of online resources and helping each other. 

---

## 6. Future Improvements

### Separate Club Management Pages
- For each club there will be different club members and they can only access their club data. Every different club member will have different club data. Also different member roles so that the data access will be secured.

### OCA Staff Management Pages
- OCA members can manage users providing them different access to gain control over. If some users misuse the product they can suspend them.

### Secure Fund Transfer Option
- We can integrate payment gateway such as sslcommerz for online fund transfer. So instead of using an external payment method the product can save user payment status in the system.

### Higher Security and Smoother User Experience
- We can integrate end-to-end encryption. Sensitive data, like approval threads, chat logs, and budget details, should be encrypted to prevent data breaches.

### Open API for External Integrations
- We can create an open API such as a room booking system so that not only OCA but also other Brac university authorities can use the service to check room status and book rooms for other purposes as well.

---

[Slide Presentation](https://docs.google.com/presentation/d/1ZHZr1oCPmowUhcEevM_hCJeljkJ7NzVm9SFs7UoCRyA/edit?usp=sharing)

