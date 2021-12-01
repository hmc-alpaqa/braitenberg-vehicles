MAP_RESOLUTION = 100;
MAP_LENGTH = 1000
ASPECT_RATIO = 3/5
MAP_HEIGHT = ASPECT_RATIO * MAP_LENGTH

PIXEL_SIZE = MAP_HEIGHT/ MAP_RESOLUTION;

VEHICLE_SIZE = 8 * PIXEL_SIZE
SENSOR_SIZE = 4 * PIXEL_SIZE

MOMENT_OF_INERTIA = 0.5 * Math.pow((VEHICLE_SIZE/2), 2)

FPS = 60;
SECONDS_PATH_VISIBLE = 2