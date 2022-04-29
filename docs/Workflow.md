# Zaurak Team Planning

## Goals
### For COMP 426 Staff:
1. Back-end specifications
    1. API built on whatever framework you choose. You can build an API that interacts with other APIs as well in order to integrate them.
    2. API root endpoint at http://HOST/app/.
    3. Should create (if nonexistent) and interact with a database of users and interactions (this can be logs, even). These can be separate databases for different microservices or separate tables in one database. It is up to your team’s decisions.
    4. Database can be of any type you choose.
2. Front-end specifications
    1. Give users the ability to register an account, update their information, see their information somewhere, and delete their account.
    2. Interactions with the front end should be logged in a database.
3. Database specifications
    1. User database - registration details (username, email address, etc.)
    2. Interaction database - details of user interactions (login history, access logs, etc.)
4. Documentation
    1. License documenation - Choose a license and include it in the repository just like we have been.
    2. README.md file with basic descriptiong, installation requirements/instructions, dependency list, run instructions
    3. /docs/ directory containing full documentation of every available API endpoint that you create for your app. This directory should also house an archive of your planning documentation.
    4. Code comments (preferably referring to the documentation)
    5. User instructions in the interface
5. Demo video

6. Self/group evaluation (Individual group members: this is part of the final exam for the course.)

## App Specific Goals
    - Develop an app to display COVID-19 data

## Team Schedule

| Meeting Date | Team |Discussed| Set Goals|
| ---- | ----------- | --------- | -------| 
| 3/24/2022 | Full team | Go over project requirements, brain stormed ideas, and settle in COVID-19 statistics as topic | Look for existing apps, think on what each would like to do, start sketching functioinalities|
| 3/31/2022 | Full Team | Go over exisiting dashboard examples, discussed functionality, and defined roles| Seth/Gabriel designated as Back-end team, Ashwin/Nicholas/Eric designated as Front-end team, sketching completed, start coding|
| 4/4/2022  | Back End | Go over Brantleys code on API endpoints, and talked about data base creation for username and password | Continue to clean up end-points, add sign-up and account endpoint, connect user database. |
| 4/11/2022 | Front End |Go over layout of the login page, dashboard, and accounts page. Implemented navigation between pages.|Get the login and account page ready to give to backend to implement account creation. |
| 4/14/2022 | Back End | Go over functionality of all end-points, new front-end layout, and database logic  | Fix sign-up to effectively add users to the database, and ensure a new html page is created fo that as well|
| 4/18/2022 | Full Team|Updates to the login page. Updates to the dashboard. |Polish up the sign in page. Implement logout feature. |
| 4/19/2022 | Full Team|Fixed a merge conflict. Started the logic to fetch data from the COVID-19 api to display a graph. |Fetch the US and NC data and display it on a graph. |
| 4/28/2022 | Full Team| Went over the requirements to figure out the last parts of the project we need to get done.  |Implement logging and database for account creation. |
| 4/29/2022 | Full Team| Went over the requirements to figure out the last parts of the project we need to get done.  |Implement logging and database for account creation. |

