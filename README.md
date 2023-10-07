# CURRENCY LOOKOUT REACT APP

### NOT FINISHED YET! SWITCHING TO NEW API & REACT QUERY

A fully functional & responsive progressive-web-app for currency rates charts & currency conversion calculation.

See the project at:
https://sina-hgs.github.io/currency-lookout/



![Screenshot (399)](https://github.com/Sina-Hgs/currency-lookout/assets/103804601/0cab8bb2-ac20-40eb-ae09-12a0bd83da69)






**Made with:**

React, Redux, Redux-thunk, Jest, SCSS, Chart.js, react-chart-js, Data fetching (Async/Await) & API calling, PWA, & Figma

*Made in 2023*

## ABOUT
The project fetches the latest currency rates data from [this API](https://exchangerate.host/#/) alongside the API's available currencies to showcase them in a chart and use the data for a currency conversion calculator. 

The fetching is done using ***Async/Await*** and ***Redux-thunk***, and is accessed by different react component using the redux store. 
The request for data fetching adjusts itself with the user interaction; for example the time period of the chart or the *base* & *target* currecnies can be changed using different options on the page which dispatch the new variables to the store. Currently there is a total of 171 currencies available in the time periods of *week*, *month*, *6 months*, & *year*.


Considering the fact that the project is meant to showcase my skills and programming choices, I've decided to implement many of the latest technologies currently popular in the tech industry.

The UI of this app was developed using ***Figma***, the react app was created using ***yarn***, & the state managment used in the app is ***redux-toolkit*** which also featured *redux-thunk* functions. The testing can be done with ***Jest***, but the overall debugging of the app is not limited to this tool; different methods of catching errors and/or console logging them can be seen in different parts of the app, especially those developed for data fetching.

The chart, which uses the fetched data, is made with ***Chart.js*** & ***react-chart-js*** packages, and was styled responsively according to different light/dark themes of the app.

The style of the app is created with ***SCSS*** and uses *css variables* which change the app colors according to the light/dark theme selected by the user. The theme can be changed using a toggle button on the page. This project also uses ***Font Awesome*** react icons.

The app is **_PWA_** with custom made logo which was made by _AI_.

Most files have short yet in-depth *comments* to explain the used variables or coding choices.

I've tried the apply the *single responsibility principle* to the react components as much as possible without breaking the component tree into excessively small pieces; therefor practicality came before the principle in some minor cases that were doable in small self-contained functions inside a react component. Some actions like calculating dates for using inside the request URL or breaking down the fetched currencies list object into usable arrays were seperated into different files to keep their react component loyal to the *principle*.

To see the deployed project online please visit:

https://sina-hgs.github.io/currency-lookout/

To use the project on your local device, download the project & run a script from below.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
