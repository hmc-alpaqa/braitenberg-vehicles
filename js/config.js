MAP_LENGTH = screen.width * 0.7;
MAP_HEIGHT = screen.height * 0.9;
ASPECT_RATIO = MAP_HEIGHT / MAP_LENGTH
MAP_RESOLUTION = 400;

DEFAULT_PIXEL_SIZE=MAP_LENGTH / MAP_RESOLUTION
PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;

VEHICLE_SIZE = 8 
SENSOR_SIZE = 3
MOTOR_SIZE = SENSOR_SIZE

SOURCE_SIZE = 4

DEFAULT_VEHICLE3_STARTING_VELOCITY = 250

FPS = 60;
SECONDS_PATH_VISIBLE = 2

SPEED = 1

ZOOM_TO_SOURCE_RENDER_FACTOR = 0.04

VELOCITY_FUNCTIONS = {
    "sinusoidal" : x => 100 * (Math.sin(x) + 1),
    "quadratic" : x => Math.pow(x, 2),
    "sqrt" : x => Math.pow(x, 0.5),
    "log" : x => Math.log(x),
    "semicircle" : x => Math.pow(x-100, 2) >  10000 ? 0 : Math.pow(10000 - Math.pow(x-100, 2), 0.5),
    "flipped semicircle" : x => Math.pow(x-100, 2) > 10000 ? 0 : -Math.pow(10000 - Math.pow(x-100, 2), 0.5) + 100,
    "repeating linear" : x => x % 10,
    "ascending linear" : x => x + x % 10,
    "repeating steps" : x => x % 10 - x % 2,
    "ascending steps" : x => x - x % 10,
    "hyperbola" : x => x == 10 ? 100 : -Math.pow(x, 2) / (x-10) + 100,
}