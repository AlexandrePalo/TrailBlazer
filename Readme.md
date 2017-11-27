# CSE 6242 Final Project, FALL 2017

# TrailBlazer: a web based application to help bikers, hikers and runners to find the most exciting tracks to train!

# Developped by Alexandre PALO, Alex MUELLER, Guillaume BROGGI & Tianyu CHENG

# DESCRIPTION

# INSTALLATION

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

# EXECUTION

## Go to the following url within your favorite browser: http://localhost:5000

## Introduction

For the moment, in order to simplify the preprocessing system, we have limited
the application to a certain area of the world: an area around Chambéry in
FRANCE.

This area is a good solution: the number of POI and Tracks gathered in this
place is very important due to the geographic situation of this area. It's a
famous place in FRANCE to practice mountain bike, in the French Alps.

## Request tracks

* On the first splash screen, click the button "LET'S GET STARTED!".

* The "Settings" form let you input your preferences to find the best track for
  you. In order to do so, the only two mandatory information are the begin
  location and the distance to compute results.

* To entire the desire begin location, two solutions are possible: you can
  either try to enter an address in the field and select the best one using the
  autocompletion system (it's case sensitive), or you can click on the small
  "location" icon at the right of the field, click a point on the map and select
  "SET" to choose this location as begin location.

* Moreover, to compute best results you can include "POI" and "Tracks" from our
  database and select a weight for them. POI are points of interest that are
  interesting to be visited. Tracks are existing mountain bike tracks that help
  the algorithm to decide. Both of them should be include, that's the aim of our
  project to make the most of existing information.

* When everything is set up, click the button "SUBMIT". The application is going
  to ask your algorithm to find the best track regarding information you have
  chosen. Waiting until the loading screen stopped.

* When the algorithm has responded, you can see proposed solutions in the field
  "Track selector". For each track, you can click on it to activate or
  deactivate the solution. If the track is activated, it will appear on the map.
  Moreover, you can click the target icon at the right of each track to move the
  map to the beginning of the track. You can browse the solution with your mouse
  over the graph or directly over the drawing on the map.

* When you've selected an interesting solution, you can click the button
  "DOWNLOAD GPX" to download a standard gpx file and use it within your gps
  device (including your phone) and go outside to train! You can also click the
  button "OPEN IN GOOGLE MAPS" in order to be able to add some information or
  change some things with the Google Maps solution.
