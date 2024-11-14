# Introduction

The RVS frontend application.

## Notes for Exercise

* React JS frontend using the Chakra UI library
* Simple component interface per page, with shared ajax utility (more work could've been done in utilities/fetch.js to make this a robust utility class with environment-specific config)
* Uses react-dom-router to make this a more reactive single page application (no hard window location changes)
* The onboarding steps were split into two components: Registration2 and Registration3. Due to timing, I didn't refactor this into using a single component that swaps out child components depending on the step you are on.

## Getting Started

`npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

