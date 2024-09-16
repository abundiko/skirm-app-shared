# Routes

## Keep in mind
- routes under admin route require a token (valid by admin) to access
- routes under user route require a token (valid by user) to access
- public routes do not need any token and are open to everyone
- general route prefix: `/api`
- endpoints will be represent in such manner 
[endpoint, description, [FormData(if necessary)], `response(successful)`]

## Admin Routes (only admin can access)

perfix with `/admin`
### `/auth`
- `/login`: admin login [email, password] `{Admin, token}`
- `/register`: admin register [email, password, userName, accessCode] `{Admin, token}`
- `/forgot-password`: admin forgot password [email] `{token, otp}`
- `/resend-otp`: admin forgot password resend otp [email] `{token, otp}`
- `/reset-password`: admin reset password (after verifying email token) [email, password, token] `{message}`

### `/users`
- `/`: get all users `Paginated<User>`
- - q: search the users by firstName, lastName, userName, email
- - only: return a particular category of users 'premium'|'disabled'|'enabled' default is all
- `/:_id`: get a user by _id `User`

### `/skirms`
- `/`: get all skirms. `Paginated<SkirmDetailed>`
- - q: search the skirms by user's firstName, lastName, userName, email | homeTeam, awayTeam
- - match: filter skirms by match _id
- - league: filter skirms by league _id
- - only: return a particular category of users 'ongoing'|'completed' default is all
- `/:_id`: get single skirm by _id `SkirmDetailed`
- `/user/:_id`: get skirms by single user by _id `Paginated<SkirmDetailed>`

### `/clubs`
- `/`:
- - POST: create a club [name, logo, country, state, primaryColor, homeLeague]. `ClubDetailed`
- - PATCH: edit a club. [...same formdata for POST ^] `ClubDetailed`
- - DELETE: delete a club. [clubId] `ClubDetailed`
- - GET: get all clubs. `Paginated<ClubDetailed>`
- - - q: search club by name, country, state,
- - - league: filter clubs by homeLeague

### `/leagues`
- `/`:
- - POST: create a League. [title, startDate, endDate, logo] `League`
- - PATCH: edit a League. [...same formdata for POST ^] `League`
<!-- - - DELETE: delete a League. `League` -->
- - GET: get all Leagues. `Paginated<League>`
- - - q: search League by title,
- - - only: filter Leagues by 'ongoing', default is all

### `/notions`
- `/`:
- - POST: create a Notion. [title, code] `Notion`
- - PATCH: edit a Notion. [...same formdata for POST ^] `Notion`
- - DELETE: delete a Notion. [notionId] `Notion`
- - GET: get all Notions. `Paginated<Notion>`
- - - q: search Notion by title

### `/matches`
- `/`:
- - POST: create a match [homeTeam, awayTeam, startDateTime, endDateTime, league]. `MatchDetailed`
- - PATCH: edit a match. [...same formdata for POST ^] `MatchDetailed`
- - DELETE: delete a match. [matchId] `matchDetailed`
- - GET: get all matchs. `Paginated<matchDetailed>`
- - - q: search match by homeTeam, awayTeam
- - - league: filter matches by league
- - - only: 'ongoing' default is all
- - - date: filter matches by date `12-09-2024`

### `/deposits`
- `/`: 
- - GET: get all deposits history. `Paginated<Deposit>`
- - - date: filter deposits made in a date `12-09-2024`
- `/user/:_id`: get deposits by single user by _id `Paginated<Deposit>`

### `/withdrawal`
- `/`: 
- - PATCH: approve withdrawal request (after admin has transfered the money). [withdrawalId]. `Withdrawal`
- - PUT: decline withdrawal request (message: reason for declination). [withdrawalId, message]. `Withdrawal`
- - GET: get user withdrawal history. `Paginated<Withdrawal>`
- - - date: filter withdrawals made in a date `12-09-2024`
- `/user/:_id`: get withdrawals by single user by _id `Paginated<Withdrawal>`




## Public Routes (everyone can access)

prefix with `/public`
### `/skirms`
- `/`: get all skirms that are open for guest. `Paginated<SkirmDetailed>`
- - match: filter skirms by match _id
- - league: filter skirms by league _id

### `/clubs`
- `/`: get all clubs available for ongoing skirms. `Paginated<ClubDetailed>`

### `/leagues`
- `/`: get all leagues available for ongoing skirms. `Paginated<League>`

### `/notions`
- `/`: get all notions available for ongoing skirms. `Notion`


### `/auth`
- `/login`: user login [email|username, password] `{User, token}`
- `/register`: user register [email, password, userName, firstName, lastName] `{User, token}`
- `/forgot-password`: user forgot password [email] `{token, otp}`
- `/resend-otp`: user forgot password resend otp [email] `{token, otp}`
- `/reset-password`: user reset password (after verifying email token) [email, password, token] `{message}`




## User Routes (only users can access)

prefix with `/user`
### `/account`
- `/`:
- - GET: get user profile details `UserDetailed`
- - PATCH: edit user profile [...all user fields except email and password]
- - PUT: edit user account password [oldPassword, newPassword]
- `/verify-email`:
- - GET: sends (or resend) an email to user.email with otp code `{otp, token}`
- - POST: verify the email [token, otp]. `UserDetailed`

### `/wallet`
- `/`: get wallet. `Wallet`

### `/deposit`
- `/`: 
- - POST: deposit to wallet. [amount, uid]. `Deposit`
- - GET: get user deposit history. `Paginated<Deposit>`
- - - date: filter deposits made in a date `12-09-2024`

### `/withdrawal`
- `/`: 
- - POST: create withdrawal request. [amount, bankName, bankAccountName, bankAccountNumber]. `Withdrawal`
- - GET: get user withdrawal history. `Paginated<Withdrawal>`
- - - date: filter withdrawals made in a date `12-09-2024`


### `/skirms`
- `/`: 
- - POST: create a skirm as owner. [user, notion, match, stake].
- - PATCH: edit a skirm as owner. [notion, stake].
- - DELETE: delete a skirm;  if owner - delete the document, if guest - remove the guest and make skirm open for another guest.
- - GET: skirms history of user. `Paginated<SkirmDetailed>`
- - - match: filter skirms by match _id
- - - league: filter skirms by league _id
- - - date: filter skirms made in a date `12-09-2024`