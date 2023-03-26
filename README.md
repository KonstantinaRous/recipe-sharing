# recipe-sharing

Build a Recipe Sharing Website
The idea is to build a website where users can share their favorite recipes. Here are some suggested features:
Front-end:

- A homepage that displays the most popular recipes or the latest recipes added
- A search bar to allow users to search for recipes by keyword or ingredient
- A page for each recipe that displays the ingredients, instructions, and photos
- A page for each user that displays the recipes they have added and their profile information
- A form for users to add new recipes, including fields for the recipe name, ingredients, instructions, and photo upload
- A form for users to edit or delete their recipes
- A responsive design that looks good on both desktop and mobile devices

Back-end:

- A database to store recipe data, user data, and authentication information
- An API to allow the front-end to interact with the database
- Authentication and authorization to ensure that only registered users can add or edit recipes
- Implementation of design patterns such as MVC, Singleton, Factory, and Observer to improve the application's structure, maintainability, and scalability
- Integration of third-party libraries and frameworks such as Express, Mongoose, and React

Setup before running:

- First install brew using the command:<br />
  `$/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- Then to install node and npm :<br /> `$brew install node`
- You can check the version of node using the command:<br /> `$node -v`
-   You can check the version of npm using the command:<br /> `$npm -v`
- If it’s showing the version installed node and npm are intalled
- Next run the commad: <br /> 
`$npm update`
- Finally you can run the server using the commad <br /> 
`$npm start`