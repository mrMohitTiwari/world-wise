# WorldWise App - README

go to the website :-https://world-wise-three.vercel.app/

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Fake JSON Server](#fake-json-server)
- [Credits](#credits)
- [License](#license)

## Features

- User authentication (fake login) and personalized notes functionality.
- Interactive map powered by Leaflet, allowing users to mark the countries they have been to.
- Add, edit, and delete notes for each marked country.
- Seamless navigation with React Router for smooth user experience.
- Utilizes fake JSON server to store city and country data for demo purposes.

## Technologies Used

- React
- React Context API
- React Router
- React Reducer
- Leaflet
- JSON Server (Fake API)
- HTML5
- CSS3
- JavaScript (ES6)

## Usage

1. Start the fake JSON server to serve the city and country data.

```
npm run json-server
```

2. Start the development server for the WorldWise app.

```
npm start
```

3. Open your browser and navigate to `http://localhost:3000` to access the app.

4. You can explore the map, mark the countries you've visited, and add/edit notes for each country.

## Fake JSON Server

The WorldWise app utilizes a fake JSON server to simulate API calls for city and country data. The data is stored in a JSON file, and the server provides basic CRUD operations. The fake server is configured to run on port 5000.

## Credits

This app was developed under the guidance of Udemy instructor Jonas Schmedtmann. We would like to thank Jonas and the entire Udemy team for providing valuable insights and knowledge.
