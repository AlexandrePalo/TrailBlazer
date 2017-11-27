# CSE6242SportProjectFall17

CSE6242 Sport Project Georgia Tech Atlanta Django based backend python 2.7
packages used: Django 1.11.7 geopy 1.11.0 networkx 2.0 mongoengine 0.14.3
Geohash 1.0

# Installation

## Preleminary

* Be sure to have Python 2.7 installed and pip installer for Python 2.7 too.

## Virtual env

The back end for our application is going to be installed in an python virtual
environment to ensure that every package is here with the right version.

* Install `virtualenv` globally:

- Windows: `pip install virtualenv` within an administrator cmd
- MacOs & Linux based: `sudo su` & `pip install virtualenv`

* Go to the folder of the project, and the backend subfolder:

- `cd PATH_TO_FOLDER_DOWNLOADED_UNZIPPED/backEnd`

* Create a new virtual environment and activate it:

- `mkdir virtualenv`
- `virtualenv virtualenv/backEnd`
- `cd virtualenv/backEnd/bin`
- `source activate`
- `cd ../../..`

* Install all packages needed for the back end of our application, still in the
  virtualenv:

- Make sure that `python --version`returns you `Python 2.7.X`, X is 10 or
  higher.
- `pip install django geopy mongoengine geohash networkx`

* Leave the virtual environment:

- `deactivate`
