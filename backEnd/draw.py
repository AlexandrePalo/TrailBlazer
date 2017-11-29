import gmplot
import csv

lats = []
lngs = []
with open('ways.txt', 'rb') as csvfile:
  spamreader = csv.reader(csvfile, delimiter=',')
  for row in spamreader:
    lats.append(float(row[0]))
    lngs.append(float(row[1]))   

gmap = gmplot.GoogleMapPlotter(lats[0],lngs[0], 16)
gmap.scatter(lats, lngs, 'r', marker=True)
gmap.draw("mymap.html")