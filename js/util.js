// find the intersection between two lines v,w defined by points v1, v2 and w1, w2 respectively
function intersection(V1, V2, W1, W2) {
    var mV = (V2.y - V1.y) / (V2.x - V1.x);
    var mW = (W2.y - W1.y) / (W2.x - W1.x);

    if (mV == Infinity) {
        mV = Math.pow(2, 16);
    }

    if (mW == Infinity) {
        mW = Math.pow(2, 16);
    }

    var x = (mV * V1.x - V1.y - mW * W1.x + W1.y) / (mV - mW);
    var y = mV * (x - V1.x) + V1.y;

    return new Vector(x, y);
}

// calculate the angle between two lines defined by points v1, v2 and w1, w2 respectively
function angle(V1, V2, W1, W2) {
    var v = V2.subtract(V1);
    var w = W2.subtract(W1);
    var theta = Math.atan2(v.y, v.x) - Math.atan2(w.y, w.x);
    return theta;
}

// given a line defined by two points and a point on the line, find the equation of a perpendicular line that passes through the point
function perpendicular(V1, V2, P) {
    var m = (V2.y - V1.y) / (V2.x - V1.x);
    var mPerp = -1 / m;
    var x = 2 * P.x; // choose an arbitrary x value
    var y = mPerp * (x - P.x) + P.y; // point slope form
    return new Vector(x, y); // arbitrary 2nd point on the perpendicular line
}

function midPoint(V1, V2) {
    return new Vector((V1.x + V2.x) / 2, (V1.y + V2.y) / 2);
}