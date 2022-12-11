# AWM-Assignment2

# ALL CODE IN SECOND BRANCH

Link to Backend Repo https://github.com/ryankeogh01/AWM-Backend


# This app has been deployed at https://ryankeogh.xyz/



# INTRO

For this assignment I built a web application which allos users to view different locations on the map by use of the search bar. The implementation of Overpass API allows for queries to be made to return a list of points to be plotted on the map. 


- Django Rest Framework to handle user logins, registrations, updates and queries.
- Knox was implemented for token generation and authentication.
- The project development was separated between frontend and backend.
- Backend focuses on the handling of requests from the frontend, managing user profiles as well as serializing all request data.
- Frontend focuses on the web application user interface and sending user data, tokens and queries to the back end via Ajax Requests.

# Walkthrough

This section will contain images of the frontend as well as some descriptions of how code is executed.

- Registration Page
  - Allows users to sign up to the application by entering a username, email and password. On success this data will be sent to the backend where the django rest framework will authenticate and return a token to the user.
  - The backend will serialize this data and send it to the login api which generates a user token and returns it to the user. This token is now associated with the user.
  - On success the user will be redirected to the login page.

<img width="880" alt="image" src="https://user-images.githubusercontent.com/79484404/206931877-1766f598-ddb9-471f-ab76-f44e60be3dbd.png">

- Login Page
  - Allows users to enter their credentials that they created on the sign up page and log in to the application. This action will use the users token to validate the user and will generate a new one for them which will be paired to them.
  - At the backend the data is received from the ajax call and triggers the api call to the login api, where the login will validate the users credentials with their token and allow or deny access.
  - On success the login page will redirect the user to the map.html page.
  
  
 <img width="891" alt="image" src="https://user-images.githubusercontent.com/79484404/206932088-89ba0c99-d2ea-42b3-aeac-129980429eef.png">


- Map Page
  - The map page is the main functionality of the application.
  - The map is designed using leaflet js and OpenStreetMap.
  - When accessing the map page, the authentication is first checked of the user. This is to ensure that the user is logged in, if they are not they will be redirected to the login page.
  - Once authentication passed the users current location will be marked on the map.
  - The frontend will then send an Ajax request to the backend to update the users location in the database.
  - The backend will send this data to the update api which uses the users location coordinates and token for authentication and updates them in the database
  - Next the user may enter the amenity they would like to find. In the example below, I chose to search for hospitals. 
  - This data is sent via Ajax to the backend uses the Overpass API to access the hospitals which are in the bounding box on the map.
  - Once the response is returned to the frontend the map plots the points onto the map as well as organizing the points into clusters for where the points may all be in a close area to each other.
  The user can click on each point and can then see the name of each hospital, pub, restaurant etc.


<img width="915" alt="image" src="https://user-images.githubusercontent.com/79484404/206932381-4cdac682-ab5c-4f27-8cbc-46430531a7f7.png">

# PWA

This application is also a progressive web application which can cache the data on each page and be accessible to users when they are offline. On mobile devices, the application can be added to the home screen if needed. This PWA was implemented with the use of a service worker, manifiest file and some changes to each html page, all of this code can be found in this repo.

Below is the network logs of the PWA caching some data.

<img width="655" alt="image" src="https://user-images.githubusercontent.com/79484404/206933074-4bf82d7b-9068-4bae-b847-3137d017b2fb.png">

# Deployment

This web application was deployed using Digital Ocean. The postgis, pgadmin, django application and nginx containers were all deployed in a droplet. The frontend code was then deployed by using SFTP to transfer the frontend files to the droplet.

# Design

The styling for this application was done using Bootstrap, JavaScript, HTML and CSS


