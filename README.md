# Info

The project consists of a dashboard and an explore data page hidden behind authentication. The dashboard is not completed 
and all functionality is found in the explore data page currently.  

All data comes from [OWID](https://github.com/owid/covid-19-data/tree/master/public/data).

feathersClient (auth/index.ts)  controls access to the backend, change the rest url there. 
The current backend is referring to this [repo](https://github.com/wialho/covid-tracker-backend)
and front end api methods are tightly coupled to feathersClient. The authentication methods are not and 
could be switched out with minimal editing. 

to run: npm i npm start

# Project Structure
- Api: files under this folder are used to connect to the backend
- Auth: custom hooks and context files for authentication across the app
- BaseStyleComponents: this project does not use a styling library (such as material design, bootstrap, etc)
     instead it uses styled components which are under this folder.
- Models: this is the space to put model interfaces that are used across the spa
- Components: child components that make up the app structure
- Pages: the parent components of the app, the 'pages' in terms of url. 

# Todo
- add error handling (there is none currently)
- create a view tile component that shows on the dashboard so users can go back to their previous searches 
- create some buttons and functionality on graphs to save for future retrieval
- update fetchLineChartData to be more efficient 
- pull stuff out of ExploreData
- up test coverage

# Libraries In Use

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
react-router
recharts
react-select
react-simple-maps
sstyled components
feathers client (with axios)
