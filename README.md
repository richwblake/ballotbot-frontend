# BallotBot React Application

BallotBot is a React application designed to simplify the voting process by providing an intuitive and user-friendly interface. It is designed to quickly poll a group of people for a given question, and features a custom number of responses. The creator chooses the title, along with any number of responses, and a time limit. After creation, the user is prompted with a button on the voting and results page that copies the voting link to their clipboard to facilitate easy sharing.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **React Router:** Utilizes React Router for seamless navigation between different views within the application.
- **Intuitive UI:** Designed with a user-friendly interface to make the voting process straightforward.
- **Flexible Responses:** User is able to create any number custom responses to their poll
- **Customizable:** Easily customizable to adapt to various polling scenarios.

## Project Structure

```
ballotbot/
|-- src/
|   |-- components/
|   |   |-- ballot.jsx
|   |   |-- voteForm.jsx
|   |   |-- hello.jsx
|   |   |-- clipboardButton.jsx 
|   |-- routes/
|   |   |-- show.jsx 
|   |   |-- edit.jsx 
|   |   |-- new.jsx 
|   |   |-- root.jsx 
|   |-- main.jsx 
|   |-- error-page.jsx 
|   |-- index.css 
|   |-- utils.js 
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- README.md
```

- `src/`: Contains all source files
    - `components/`: Contains all standalone React components that comprise the different views of the application
    - `routes/`: Contains React components used by router. These components directly interface with React Router
    - `main.jsx`: Entry point of application
    - `error-page.jsx`: Used by React Router to serve a error splash page when a routing error occurs
    - `index.css`: Contains all app styling
    - `utils.js`: Contain helper functions that are used by more than 1 component

## License

This project is licensed under the MIT License
