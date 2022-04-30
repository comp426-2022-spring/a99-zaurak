# Endpoints Word Documentation

1.	‘/’
    Redirects to the /app/dashboard endpoint.

2.	/app/dashboard
    Checks whether the user has logged in. If it has not logged in, it redirects the user to /app/login. Else, it will go straight to the dashboard. If user is not authorized an error is thrown.

3.	/app/login
    It sends a response to the user containing the html login file. The user will see a screen with two fields to fill: username and password. To the side of these fields, there are two buttons: submit and create account.

4.	/app/account
    It sends a response to the user containing html for creating an account.

5. /app/signup
    It sends a response to the user containing the html signup file. The user will see a screen with three fields to fill: username, password, and email. To the side of these fields, there are two buttons: "signup" and "already a user?".

6.	/user/sign-in
    It will perform a series of actions to verify the existence and validity of a Username-Password pair. It first checks whether the password and username entered pass the minimum requirement to be valid (are they long enough?). Then, it looks in the database and checks if the Username-Password pair matches. If it does, it creates a cookie for the user to stayed signed in, and it redirects the user to /app/dashboard endpoint. If the Username-Password pair does not exist, a message indicating that Username or Password is not valid will be display.

7.	/user/sign-up
    It will perform a series of actions to verify the availability and validity of a Username-Password pair. It first checks whether the password and username entered pass the minimum requirement to be valid (are they long enough?). Then, it looks in the database and checks if the Username is already in use. If it is, it will display an error mesage saying that Username already exist. If the Username entered does not exist, then the Username, Password, and Email will be inserted into the the users database, and the user will be redirected to /app/login. In case that some other error is catch when trying to insert the data, a error saying "Signup Unsuccessful" will be shown.  does, it creates a cookie for the user to stayed signed in, and it redirects the user to /app/dashboard endpoint. If the Username-Password pair does not exist, a message indicating that Username or Password is not valid will be display.

8.	/user/send-password-reset
    It will perform a series of actions to allow existing user to reset password. It first checks for any errors on the request object. As long as no errors are thrown, an email will be sent to the user with a temporary password. If an error occurs whent the email is trying to be sent, an error saying "Error sending reset code" will be thrown. 
    

9.	/user/sign-out
    It first checks that the client has a valid cookie token which means that the client is currently signed in. If the client does not have a valid token, he/she will be redirected to /app/login since they are not signed in. If the client does have a valid token, it effectively errases the cookie or token given to the client,  and then redirects the user to app/login.
