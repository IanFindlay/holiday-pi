# Holiday PI - A TypeScript/Angular Front End

A live version of this app [is hosted here](https://holidaypi.findlayian.com)

## Summary

This is the front end aspect of [this RESTful API](https://github.com/IanFindlay/holiday-pi-api). Together they form my answer to a
technical test I was given.

## Run a local version

### Requirements

Whilst earlier versions than those below may still work they have not been tested. This application was developed using:

- Node version 17
- npm version 8
- Angular CLI 14

### Cloning the repository and installing the modules

You can clone this repository via one of the three links shown in the 'Code' button dropdown near the top of this page - I'll show the HTTPS option as an example:

```
git clone https://github.com/IanFindlay/nc-news.git
```

Once cloned, navigate to the directory in you terminal and run the following command to install all of the applications dependencies - a list of which can be found in the package.json file:

```
npm i
```

In order to view the application locally in your browser, run the following command:

```
ng serve --open
```

This will automatically open a version of the app running on your localhost on port 4200.

### Build the project

You can build the project with the command:

```
ng build
```

Which will store the build artifacts in the `dist/` directory
