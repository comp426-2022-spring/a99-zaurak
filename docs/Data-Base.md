# Data Base Documentation

# User Database Logic

```
A database was created by the Zaurak team to archive all registered users and its respective passwords. Signup and authenctication was accomplished using a few dependencies:

    - For user/password database creation, "better-sqlite3" version 7.5.0 was used.
    - For authenctication and sign-in, "cookie-parser" version 1.4.6, jsonwebtoken version 8.5.1, and nodemailer version 6.7.3 was used.
End-points located at server.js were used to add new usernames to the database and to authenticate existing user and give them acces to the dashboard. This endpoints are:
    - /user/sign-in
    - /user/sign-up
    - /user/send-password-reset
```


# COVID-DATA Base Source

For the COVID-19 data, the front end directly fetch the data from two existing API's. 

1. For US and North Carolina data, a CDC API was used with the help of a walk through from SODA developers. Links to the SODA developer walk through and the CDC API used can be found below.
    - SODA Developers: https://dev.socrata.com/foundry/data.cdc.gov/9mfq-cb36
    - CDC data: https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=

2. For Global data, a different API from POSTMAN was used. The link to the source of this API can be found below.
    - POSTMAN: https://documenter.getpostman.com/view/10808728/SzS8rjbc

