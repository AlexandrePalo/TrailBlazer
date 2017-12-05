import json
import numpy as np
from itertools import tee
from geopy.distance import vincenty


def pairwise(iterable):
    "s -> (s0,s1), (s1,s2), (s2, s3), ..."
    a, b = tee(iterable)
    next(b, None)
    return zip(a, b)


def get_data(array_of_json_files):
    track_stats = list()
    for json_file in array_of_json_files:
        with open(json_file) as json_data:
            data = json.load(json_data)
            for track in data:
                previous_had_poi = 0
                temp_sum = 0
                coordinates = list()
                for point in track['geometry']['coordinates']:
                    if point[3] >= 1 and previous_had_poi == 0:
                        temp_sum += point[3]
                        previous_had_poi = 1
                    elif point[3] == 0:
                        previous_had_poi = 0
                    coordinates.append((point[0], point[1]))
                temp_distance = 0
                for coordinate in pairwise(coordinates):
                    temp_distance += vincenty(coordinate[0],
                                              coordinate[1]).kilometers
                track_stats.append([np.mean(track['geometry']['coordinates'], axis=0)[
                                   2], temp_sum / temp_distance])
    return track_stats


track_stats = get_data(['badPathsSample.json'])

false_negative_counter = 0
true_negative_counter = 0
for track in track_stats:
    if track[0] >= 5 and track[1] >= 2:
        false_negative_counter += 1
    else:
        true_negative_counter += 1

print(false_negative_counter, true_negative_counter)
