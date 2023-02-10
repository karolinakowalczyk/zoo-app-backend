# Zoo Application - backend

Informations about frontend are on [this repository](https://github.com/karolinakowalczyk/zoo-app-frontend).

## Description

Zoo Application is a responsive web application that facilitates zoo visitors to organize a tour, provides interactive ways to help animals and allows user account. management.
Tech stack: React, MUI, Node.js, MongoDB.

## How to Install and Run the Project Backend on your computer

You need [node](https://nodejs.org/en/) and DockerDesktop(https://www.docker.com/products/docker-desktop/) app installed.
1. Clone repository.
2. Open terminal, go to project main folder, then to *mongodb/* folder.
3. Type *docker-compose up -d*.
4. In Dokcer Desktop app you should see created container. Run it.
5. Return to main project folder.
6. In *app/* folder create *config/* folder.
7. In new *config/* folder create two files: *auth.config.js* and *db.config.js*. To get this files content, contact with the author by mail: *karolinakowalczyk1999@gmail.com*.
8. You need instal node packages by typing *npm install*.
9. To run application in browser type *npm run dev*.
10. App should running on *localhost:8000*.

