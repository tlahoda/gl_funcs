(function() {
  var DEG2RAD;

  this.makeIdentity = function(a) {
    var i;
    for (i = 0; i < 16; i++) {
      a[i] = 0.0;
    }
    return a[0] = a[5] = a[10] = a[15] = 1.0;
  };

  this.swap = function(a, b, c) {
    var temp;
    temp = a[b];
    a[b] = a[c];
    return a[c] = temp;
  };

  this.transpose = function(a) {
    swap(a, 1, 4);
    swap(a, 2, 8);
    swap(a, 3, 12);
    swap(a, 6, 9);
    swap(a, 7, 13);
    swap(a, 11, 14);
    return a;
  };

  this.mul = function(a, b) {
    var i, m, _results;
    m = new Array(16);
    for (i = 0; i < 4; i++) {
      m[i * 4] = a[i * 4] * b[0] + a[i * 4 + 1] * b[4] + a[i * 4 + 2] * b[8] + a[i * 4 + 3] * b[12];
      m[i * 4 + 1] = a[i * 4] * b[1] + a[i * 4 + 1] * b[5] + a[i * 4 + 2] * b[9] + a[i * 4 + 3] * b[13];
      m[i * 4 + 2] = a[i * 4] * b[2] + a[i * 4 + 1] * b[6] + a[i * 4 + 2] * b[10] + a[i * 4 + 3] * b[14];
      m[i * 4 + 3] = a[i * 4] * b[3] + a[i * 4 + 1] * b[7] + a[i * 4 + 2] * b[11] + a[i * 4 + 3] * b[15];
    }
    _results = [];
    for (i = 0; i < 16; i++) {
      _results.push(a[i] = m[i]);
    }
    return _results;
  };

  this.mul2 = function(a, b) {
    var i, m;
    m = new Array(16);
    for (i = 0; i < 4; i++) {
      m[i * 4] = a[i * 4] * b[0] + a[i * 4 + 1] * b[4] + a[i * 4 + 2] * b[8] + a[i * 4 + 3] * b[12];
      m[i * 4 + 1] = a[i * 4] * b[1] + a[i * 4 + 1] * b[5] + a[i * 4 + 2] * b[9] + a[i * 4 + 3] * b[13];
      m[i * 4 + 2] = a[i * 4] * b[2] + a[i * 4 + 1] * b[6] + a[i * 4 + 2] * b[10] + a[i * 4 + 3] * b[14];
      m[i * 4 + 3] = a[i * 4] * b[3] + a[i * 4 + 1] * b[7] + a[i * 4 + 2] * b[11] + a[i * 4 + 3] * b[15];
    }
    return m;
  };

  this.mul_v = function(a, b) {
    var c;
    c = new Array(4);
    return [a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3], a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7] * b[3], a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11] * b[3], a[12] * b[0] + a[13] * b[1] + a[14] * b[2] + a[15] * b[3]];
  };

  this.mag = function(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  };

  this.normalize = function(v) {
    var d;
    d = mag(v);
    if (d === 0.0) return [v[0], v[1], v[2]];
    return [v[0] / d, v[1] / d, v[2] / d];
  };

  this.scale_m = function(mat, p) {
    var s;
    s = [p[0], 0.0, 0.0, 0.0, 0.0, p[1], 0.0, 0.0, 0.0, 0.0, p[2], 0.0, 0.0, 0.0, 0.0, 1.0];
    return mul(mat, s);
  };

  this.rotate = function(mat, angle, axis) {
    var a, angleRads, c, r, s, x, y, z;
    angleRads = angle * DEG2RAD;
    c = Math.cos(angleRads);
    s = Math.sin(angleRads);
    a = normalize(axis);
    x = a[0];
    y = a[1];
    z = a[2];
    r = [x * x * (1.0 - c) + c, x * y * (1.0 - c) - z * s, x * z * (1.0 - c) + y * s, 0.0, x * y * (1.0 - c) + z * s, y * y * (1.0 - c) + c, y * z * (1.0 - c) - x * s, 0.0, x * z * (1.0 - c) - y * s, y * z * (1.0 - c) + x * s, z * z * (1.0 - c) + c, 0.0, 0.0, 0.0, 0.0, 1.0];
    return mul(mat, r);
  };

  this.translate = function(mat, p) {
    var t;
    t = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, p[0], p[1], p[2], 1.0];
    return mul(mat, t);
  };

  this.makeFrustum = function(proj, l, r, b, t, n, f) {
    var m;
    m = [2.0 * n / (r - l), 0.0, (r + l) / (r - l), 0.0, 0.0, 2.0 * n / (t - b), (t + b) / (t - b), 0.0, 0.0, 0.0, -(f - n) / (f - n), -1.0, 0.0, 0.0, -2.0 * f * n / (f - n), 0.0];
    return mul(proj, m);
  };

  DEG2RAD = Math.PI / 180.0;

  this.makePerspective = function(proj, fov, aspect, znear, zfar) {
    var xmax, xmin, ymax, ymin;
    ymax = znear * Math.tan(fov * DEG2RAD / 2.0);
    ymin = -ymax;
    xmin = ymin * aspect;
    xmax = ymax * aspect;
    return makeFrustum(proj, xmin, xmax, ymin, ymax, znear, zfar);
  };

  this.cross = function(v, u) {
    return [v[1] * u[2] - v[2] * u[1], v[2] * u[0] - v[0] * u[2], v[0] * u[1] - v[1] * u[0]];
  };

  this.gluLookAt = function(modelView, eye, center, up) {
    var a, b, c, m, x, y, z;
    c = [eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]];
    a = cross(up, c);
    b = cross(c, a);
    x = normalize(a);
    y = normalize(b);
    z = normalize(c);
    m = [x[0], y[0], z[0], 0.0, x[1], y[1], z[1], 0.0, x[2], y[2], z[2], 0.0, 0.0, 0.0, 0.0, 1.0];
    mul(modelView, m);
    return translate(modelView, [eye[0] * -1.0, eye[1] * -1.0, eye[2] * -1.0]);
  };

}).call(this);
