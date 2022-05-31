
## A RESTful API with a single endpoint to fetch the JSON data from the MongoDB
## Recuirements for local
To be able to run in local, there are 2 requiremets to be installed:

 - Node 16.x
 - MongoDB 4.x
 ## Local instal and run
 Run `npm install` to install all node dependencies then run
 `npm run build:prod && npm start` to build Typescript project
 and start the server

## Local testing
To run tests `npm run test` will start the server and execute all the
tests.

To get records from database, there are 4 mandatory parameters that needs to be send to the API inside the body:

- startDate: String type in YYYY-MM-DD format, other formats will not be acceted
- endDate: String type in YYYY-MM-DD format, other formats will not be acceted
- minCount: Integer type
- maxCount: Integer type

Curl production example:

`curl --request POST 'localhost:8080/' 
--header 'Content-Type: application/json' 
--data-raw '{
"startDate": "2015-01-26",
"endDate": "2016-02-02",
"minCount": 2500,
"maxCount": 2600}'`
  

