# Imageboard

## What's this?

This project was built during my attendance to the Spiced Academy's Web Development Bootcamp in Berlin.

This app is a Imageborad built in Vue.js where the user can upload his pictures to the App and will be displayed immediately after uploading. User can click on the pictures and a modal will show up to see the image resized. The user has the possibility of leaving a comment on the picture and navigate through the pictures. It also accepts infinite scroll.

## Why this?

I found building this App very useful as my very first component-based project to get used and comfortable working with components and passing props between parent and children. It was also very useful to learn the concept of mounting within a component.

## Technologies I used

- HTML5, CSS3
- File Storing with AWS S3
- Vue.js
- Node/Express
- PSQL

## Set Up

For security reasons it is erquired to own an AWS account and create a S3 Bucket and pass AWS credentials so the uploading middleware works.
I addition to the AMW set up it's necessary to create a new PSQL Database and edit the ```db.js``` file that can be found in this repo.
To make it run just clone the repository, install all the dependencies with ```npm install``` and from the local directory in the terminal run it with ```node .```.

## Screenshots

### Homepage
![Homepage screenshot](https://github.com/l-legren/imageboard/blob/leret/public/images/screenshot/homepage.jpg)

### Picture Modal
![Photo Modal Screenshot](https://github.com/l-legren/imageboard/blob/leret/public/images/screenshot/pic_modal.jpg)

### Comments section
![Comments screenshot](https://github.com/l-legren/imageboard/blob/leret/public/images/screenshot/comments.jpg)
