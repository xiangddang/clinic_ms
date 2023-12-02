# Introduction of the project
This repo shows the whole process of builing up the project, including proposal, uml and schema of the database, and the code of backend and frontend.
The database is based on MySQL, the backend uses Python Flask, and the frontend uses React.js.


### The operation of the project
#### Administer
The administrator can log in to the system through the login page using its own username and password, and then enter the administrator page. The administrator can add, delete, and modify the information of the user, employees. And the administrator can also view the appointment information, the income of the clinic.

#### Employee
Work schedule: 9:00-12:00, 14:00-17:30 from Monday to Friday.


#### APIs
- User:
    - Login: POST /user/login
    - Register: POST /user/register
    - Get user info: GET /user/info/<username>
    - Update user info: PUT /user/update/<username>

- Employee:

- Appointment:
    - Get appointment info: GET /appointment/info/<username>
    - Add appointment: POST /appointment/add
    - Update appointment: PUT /appointment/update/<username>
    - Delete appointment: DELETE /appointment/delete/<username>