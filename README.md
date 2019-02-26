# nab-profit-share-info
the project analyzes crypto currencies data and the requirement is to process historical price list of currencies provided by a currency exchange. We need to find out the best profit that would have been possibly made by
buying a currency at a given price and selling it later on the same day.

## Software Requirements
- NodeJS
- Visual Studio code

## Design and Implementation
- Used REST to implement the API's.
- Used Typescript with Express to implement the api and front end

## Steps to Run
- Navigate to app-config.ts of nab-profite-share-info-api/src in the Project and Update the connection string for Successful mongoDB connection.
- Run following commands to make API ready to work.
- npm install
- npm run build
- npm start
- URL Implemented: 
GET: http://localhost:3000/share-data - to get the data for all dates and currency.
GET: http://localhost:3000/share-data?currency=BTC&date=20180507 - to get the data for a date and currency.
GET: http://localhost:3000/share-data?currency=&date=20180507 - to get the data for all currency on a date.
GET: http://localhost:3000/share-data?currency=LTC&date= - to get the data for all dates of a currency.

## Areas of Improvements
- e2e's can be written to enhance the productivity of the application.
- Implement Logging.
- Enhance the look and feel of front end.
- Implement validations for front end and back end.
