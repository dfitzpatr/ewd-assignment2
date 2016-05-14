#Assignment 2 - AngularJS app.

Name: Declan Fitzpatrick

###Overview.
Developed a home library application. This application will give the family home the facility of register all book that exists in the home,
the book can be associated to each user. 
User will have the facility to find books, add book to user info, search for item or just review all books associated to them. 
User will have option of sorting through list based on a number of headings e.g likes, type, genre, etc. 
Users will also have facility to associate reviews to the individual book items. Also facility to agree ("like ") comments


 . . . . . List of user features (excluding user registration and authentication) . . . . 
 
 + Allow users to search for books base on ISBN number 
 + Allow user to add book found based on ISBN and associate with application user
 + Allow user to delete book and that users associated users review from application 
 + Allow user to view and sort user book based on number of headings
 + allow user to search through user book
 + allow user to view all application users review of book and post\delete their own reviews.  
 + logout
 

###Installation requirements.
. . . .  List of software used to develop the app . . . . . . . 
+ AngularJS 1.x
+ Bootstrap 3
+ npm install -save body-parser
+ npm install -save express
+ npm install -save mongoose
+ npm install -save lodash
+ npm install -save shortid

In root folder execute node app.js

In browser insert "http://localhost:8080/"

the following usernames and passwords are already setup. Please register your own user

username: homer@Simpson.com
passsword: secret

username: marge@simpson.com (notice lowercase s)
passsword: secret

username: bart@simpson.com (notice lowercase s)
passsword: secret


###Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][image1]



###App Design.


![][image2]

###UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (excluding user regeneration and login views) . . . . . . . 

![][image3]

![][image4]

![][image5]

![][image6]

![][image7]


###Routing.

+ /login - login screen
+ /login/:loginError - login screen after login failure. Provides failure feedback 
+ /register - register user screen
+ /findBook/:userId - screen used to find book based on ISBN code and add found book to user store
+ /mediaList/:userId - screen showing a list of media associated to logged in user  
+ /mediaList/:userId/media-review/:mediaId - screen show and allowing user to enter review information
+ default is directed to /login

## Web API Endpoint Reference

+ GET: /api/library/:id - return a list of users books
+ POST: /api/library - add a new book
+ PUT: /posts/api/library/:id - update a book
+ DELETE: /posts/api/library/:id - delete a book

+ GET: /api/users/ - return all users
+ GET: /api/users/:username - return user with username
+ POST: /api/users - add a new user
+ PUT: /posts/api/users/:id - update user
+ DELETE: /posts/api/users/:id - delete a user

+ GET: /api/review/:id - return all reviews for same ISBN
+ POST: /api/review - add a new review
+ PUT: /posts/api/review/:id - update a review
+ DELETE: /posts/api/review/:id - delete a review



###Extra features

Implemented a user login as well as associated authentication.  If comparision fails then user is returned to login screen.
Implemented registration, where new user can be added to application

[image1]: ./model.png
[image2]: ./design.png
[image3]: ./screenLogin.png
[image4]: ./screenRegister.png
[image5]: ./screenHome.png
[image6]: ./screenFindBook.png
[image7]: ./screenUserReviews.png
