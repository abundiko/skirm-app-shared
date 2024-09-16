# Routes

## Keep in mind
- routes under admin route require a token (valid by admin) to access
- routes under user route require a token (valid by user) to access
- public routes do not need any token and are open to everyone
- general route prefix: `/api`
- endpoints will be represent in such manner 
[endpoint, description, [FormData(if necessary)], `response(successful)`]

## Admin Routes

perfix with `/admin`
### `/auth`
- `/login`: admin login [email, password] `{Admin, token}`
- `/register`: admin register [email, password, userName, accessCode] `{Admin, token}`
- `/forgot-password`: admin forgot password [email] `{token, otp}`
- `/resend-otp`: admin forgot password resend otp [email] `{token, otp}`
- `/reset-password`: admin reset password (after verifying email token) [email, password] `{message}`

### `/users`
- `/`: get all users `Paginated<User>`
- - q: search the users by firstName, lastName, userName, email
- `/users/:_id`: get a user by _id `User`
