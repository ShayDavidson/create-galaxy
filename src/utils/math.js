export function spiral(a, b, t) {
  const x = a * Math.exp(b * t) * Math.cos(t);
  const y = a * Math.exp(b * t) * Math.sin(t);
  return { x, y };
}

export function lerp(min, max, t) {
  return min + (max - min) * t;
}

export function polarToCart(r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
}

export function polarToCart3d(r, theta1, theta2) {
  return {
    x: r * Math.sin(theta1) * Math.cos(theta2),
    y: r * Math.sin(theta1) * Math.sin(theta2),
    z: r * Math.cos(theta1),
  };
}

export function rotationMatrix(roll, yaw, pitch) {
  let cosa = Math.cos(yaw);
  let sina = Math.sin(yaw);

  let cosb = Math.cos(pitch);
  let sinb = Math.sin(pitch);

  let cosc = Math.cos(roll);
  let sinc = Math.sin(roll);

  let Axx = cosa * cosb;
  let Axy = cosa * sinb * sinc - sina * cosc;
  let Axz = cosa * sinb * cosc + sina * sinc;

  let Ayx = sina * cosb;
  let Ayy = sina * sinb * sinc + cosa * cosc;
  let Ayz = sina * sinb * cosc - cosa * sinc;

  let Azx = -sinb;
  let Azy = cosb * sinc;
  let Azz = cosb * cosc;

  return { Axx, Axy, Axz, Ayx, Ayy, Ayz, Azx, Azy, Azz };
}

export function rotate({ x: px, y: py, z: pz }, { Axx, Axy, Axz, Ayx, Ayy, Ayz, Azx, Azy, Azz }) {
  return {
    x: Axx * px + Axy * py + Axz * pz,
    y: Ayx * px + Ayy * py + Ayz * pz,
    z: Azx * px + Azy * py + Azz * pz,
  };
}

export function cartToPolar(x, y) {
  let r = Math.sqrt(x * x + y * y);
  let t = Math.atan2(y, x);
  return { r, t };
}
