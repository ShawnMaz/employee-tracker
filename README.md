# Employee Tracker
  
  ![License: gpl](https://img.shields.io/static/v1?label=license&message=gpl&color=green)
  

  ## Description
  A content management system for an employer to view and manage the departments, roles, and the employees in the company. This will allow the bussiness owner to organize and plan the business. This applicaton is a command line application. It utilizes inquirer, node.js, mysql2 and the dotenv package to get information form the user and updates the mySQL database.

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)

  ## Installation
  To install this application run ```npm i``` to install all the necessary packages.
  
  After installing on the packages, create a .env file in the root level of the folder as shown in the following image.

  ![env file in the root folder](./assets/images/env%20file.png)

  Inside the .env file create the following variables.

  ![variables in the env file](./assets/images/env%20file%20setup.png)

  For ```DB_USER``` set it to the username of your mySQL database that you use. For the ```DB_PASSWORD``` set it to the password of your mySQL database. For the ```HOST``` it can be set to ```localhost```.

  ## Usage
  To start the application type ```node index.js``` in the terminal from the root of the project file.

  ![Application start image](./assets/images/start%20application.png)

  Once the program starts, just follow the prompt on the screen to view and update data from the database. The program also has input validating when the user enters data to insert into the database.

  A demonstration video of the application can be found [here](https://drive.google.com/file/d/1jh4QYvXcIzo5ckXxdkygfqG4u7SB9q9P/view?usp=sharing).
  
  ## License
  This application is available under the GNU General Public License family license.
  
  
  ## Contributing
  Currently there is no way to contribute to this project.

  ## Tests
  This application does not utilize any tests.

  ## Questions
  For any questions about the project, please don't hesitate to reach out.
  * Link to my Github page : [ShawnMaz](https://github.com/ShawnMaz)
  * Email: [shawnmaz@pm.me](mailto:shawnmaz@pm.me)