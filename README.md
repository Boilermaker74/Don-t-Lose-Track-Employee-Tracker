# Don't-Lose-Track-Employee-Tracker

by  Bradley Moleterno    ![Github license](https://img.shields.io/badge/license-MIT-blue.svg)
## Description
I have never had a business or been in a position of authority over other human beings. Well maybe my children, but my authority over them was always questionable.   This week’s assignment of an employee tracker filled my megalomaniac head with visions of control and domination.  Alas, the assignment didn’t include remote shock collars or GPS tracking devices. Instead, Don’t Lose Track Employee Tracker is a content management system (CMS) which provides a user-friendly interface for non-technical users to add, edit, and view content. Don’t Lose Track Employee Tracker is a command-line application which allows a non-coder to manage a company's employee database. It uses Node.js and Inquirer. It also was our introduction to MySQL.  The user can view current employee information,
![alt-text](assets/Screenshot(92).png)
department information                                                                                

![alt-text](assets/Screenshot(93).png)

and information about the employees' various roles.                                                                                                                             

![alt-text](assets/Screenshot(94).png) 

Also, by following simple menu prompts, a user can add information to roles, departments and current employee information.                                  

![alt-text](assets/Screenshot(95).png) 

I found working with MySQL especially challenging. I hope in future to add some additional features to the program including the ability to delete items.

## Table of Contents
* [Installation](#installation)
* [How to Use This Application](#how-to-use-this-application)
* [Walkthrough Video](#walkthrough-video)
* [Licenses](#Licenses)
* [Contributors](#contributors)
* [Testing](#testing)
* [Features](#features)
* [Languages and Technologies Used](#languages-and-technologies-used)
* [Dependencies](#dependencies)
* [Questions](#questions)

## Installation
Installation is unfortunately complicated. The first step requires a local copy of the code to be cloned from the Boilermaker74 repo “Don't Lose Track Employee Tracker. The link is [here](https://github.com/Boilermaker74/Dont-Lose-Track-Employee-Tracker). The user must have Mysql installed on their machine. The installer program for MySQL can be located [here](https://dev.mysql.com/downloads/installer/). Once the repo code has been installed on the local machine, the user must make the directory ‘db’ the working directory. Type ‘MySQL -u root –p'. The program will prompt the user for their MySQL password. Enter it at the prompt. Type in the following commands: ‘SOURCE schema.sql;’ ‘ SOURCE seeds.sql;’ ‘exit’. 

![alt-text](assets/Screenshot(97).png)

Make the directory ‘Employee Tracker' the working directory. Type ‘npm install’ to load the required npm packages. Finally type ‘node .’ to start the application. The entire process is recorded in the walkthrough video.

## How to Use This Application:
Use of the application is straight forward. Once ‘node .’ is typed in the command line, the welcome banner is displayed. 

![alt-text](assets/Screenshot(98).png)

The options for the viewer consist of viewing current data or adding to existing data. If the user wishes to append the current database, the user will be prompted to add the appropriate information. 

![alt-text](assets/Screenshot(9).png)

The option ‘Quit’ exits the application and returns the user to the command line. 

![alt-text](assets/Screenshot(10).png)

## Walkthrough Video:
A link to a video which shows the installation process and user's interactions can be found [HERE](https://drive.google.com/file/d/1vAgXzhuJX-Qk0BNCKwDF2HpQzeu10bYg/view)

## Licenses
![Github license](https://img.shields.io/badge/license-MIT-blue.svg)
MIT License

Copyright (c) 2023 Bradley Moleterno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## Contributors
Xpert Learning Assistant                                                                                                                      

![alt-text](assets/Screenshot(90).png)

Patorjk.com [here](https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Employee%20Tracker%20). 

![alt-text](assets/Screenshot(88).png)

## Testing
N/A
## Features
Don't Lose Track Employee Tracker uses MySQL2 to store compny information.
## Languages and Technologies Used
![Github license](https://img.shields.io/badge/Language-JavaScript-blue.svg)
![Github license](https://img.shields.io/badge/Technology-MySQL,NodeJs,Inquirer-blue.svg)
## Dependencies
Inquirer version 8.2.4 and MySQL2 version 3.6.1 
## Questions
Please send your questions by email:  Bradm1492@gmail.com or visit [github/Boilermaker74](https://github.com/Boilermaker74).
