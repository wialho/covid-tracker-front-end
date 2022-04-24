# Info

The project consists of a dashboard and an explore data page hidden behind authentication. The dashboard is not completed 
and all functionality is found in the explore data page currently.  

All data comes from [OWID](https://github.com/owid/covid-19-data/tree/master/public/data).

feathersClient (auth/index.ts)  controls access to the backend, change the rest url there. 
The current backend is referring to this [repo](https://github.com/wialho/covid-tracker-backend)
and front end api methods are tightly coupled to feathersClient. The authentication methods are not and 
could be switched out with minimal editing. 

# Todo
- create a view tile component that shows on the dashboard so users can go back to their previous searches 
- create some buttons and functionality on graphs to save for future retrieval
- update fetchLineChartData to be more efficient 
- pull stuff out of ExploreData
- up test coverage

# libraries in use

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
react-router
recharts
react-select
react-simple-maps
sstyled components
feathers client (with axios)
