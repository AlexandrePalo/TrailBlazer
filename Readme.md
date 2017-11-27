# CSE 6242 Final Project, FALL 2017

# TrailBlazer: a web based application to help bikers, hikers and runners to find the most exciting tracks to train!

# Developped by Alexandre PALO, Alex MUELLER, Guillaume BROGGI & Tianyi ZHENG

# Installation

## Front end application

### Installation

#### Preleminaries

Be sure to have NodeJs and yarn installed (or npm).

#### Packages installation

##### Install serve package

* `yarn global add serve` (or `npm install -g serve`). If needed, run this
  command with administrator privileges or sudo.

## Back end application

### Installation

#### Preleminaries

Be sure to have Python 2.7 installed and pip installer for Python 2.7 too. In
this tutorial, we assume that the command `python` launches Python 2.7 and that
`pip` installs for Python 2.7 only.

#### Virtual env

The back end for our application is going to be installed in an python virtual
environment to ensure that every package is here with the right version.

##### Install `virtualenv` globally:

* Windows: `pip install virtualenv` within an administrator cmd
* MacOs & Linux based: `sudo su` & `pip install virtualenv`

##### Go to the folder of the project, and the backend subfolder:

* `cd PATH_TO_FOLDER_DOWNLOADED_UNZIPPED/backEnd`

##### Create a new virtual environment and activate it:

* `mkdir virtualenv`
* `virtualenv virtualenv/backEnd`
* `cd virtualenv/backEnd/bin`
* `source activate`
* `cd ../../..`

##### Install all packages needed for the back end of our application, still in the virtualenv:

* Make sure that `python --version`returns you `Python 2.7.X`, X is 10 or
  higher.
* `pip install django geopy mongoengine geohash networkx djangorestframework`

##### Leave the virtual environment:

* `deactivate`

# Launch application

To launch the application, two consoles should be opened (or to tabs). These two
consoles must be up and running the whole time you use the application.

## First console, front end application

* `cd PATH_TO_FOLDER_DOWNLOADED_UNZIPPED/frontEnd && serve -s build`

## Second console, back end application

* `cd PATH_TO_FOLDER_DOWNLOADED_UNZIPPED/backEnd/virtualenv/backEnd/bin &&
  source activate`
* `cd ../../.. && python manage.py runserver`

## Go to the following url within your favorite browser: http://localhost:5000

[Front End documentation](frontEnd/README.md)

[Back End documentation](backEnd/README.md)

# How to use TrailBlazer
