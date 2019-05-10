import { Easing } from '../utils/easing';
import RNG from '../utils/random';
import { hexToRGB } from '../utils/color';
import { rotationMatrix, lerp, spiral, rotate, polarToCart, cartToPolar, polarToCart3d } from '../utils/math';

const STATIC_ARM_CURVE = 2;
const STATIC_ARM_SCALE_RATIO = 28;

export function getGalaxyStars(preset, radius, time) {
  const getRandomPosition =
    preset.type === 'spiral' ? getSpiralPositionRandomizer(preset, radius, time) : getGloburalPositionRandomizer(preset, radius, time);
  const getRandomStyle = getStyleRandomizer(preset);
  const animationMatrix = rotationMatrix(0, time, 0);
  const cameraMtrix = rotationMatrix(preset.cameraX, preset.cameraZ, preset.cameraY);

  let stars = [];
  for (let i = 0; i < preset.stars; i++) {
    let { x, y, z } = getRandomPosition();
    const animationRotatedVector = rotate({ x, y, z }, animationMatrix);
    const cameraRotatedVector = rotate(
      {
        x: animationRotatedVector.x,
        y: animationRotatedVector.y,
        z: animationRotatedVector.z,
      },
      cameraMtrix
    );
    const { size, color } = getRandomStyle();
    stars.push({ size, color, position: cameraRotatedVector });
  }
  return stars;
}

function getStyleRandomizer(preset) {
  const styleRNG = new RNG(preset.seed);
  const colors = preset.starColor.map(hexToRGB);
  return () => {
    return {
      size: styleRNG.random(),
      color: colors[Math.floor(styleRNG.random() * colors.length)],
    };
  };
}

function getGloburalPositionRandomizer(preset, radius) {
  const positionsRNG = new RNG(preset.seed);
  const ease = Easing[preset.density];
  return () => {
    const r = lerp(0, radius, ease(Math.sqrt(positionsRNG.random())));
    const t = lerp(0, Math.PI * 2, positionsRNG.random());
    const globularCoords = polarToCart(r, t);
    const spreadR = lerp(0, preset.spread, Easing[preset.spreadShape](positionsRNG.random()));
    const spreadT1 = lerp(0, Math.PI * 2, positionsRNG.random());
    const spreadT2 = lerp(0, Math.PI * 2, positionsRNG.random());
    const spreadCoords = polarToCart3d(spreadR, spreadT1, spreadT2);
    return {
      x: globularCoords.x + spreadCoords.x,
      y: globularCoords.y + spreadCoords.y,
      z: getZPosition(preset, positionsRNG, radius, r) + spreadCoords.z * preset.heightSpread,
    };
  };
}

function getSpiralPositionRandomizer(preset, radius) {
  const positionsRNG = new RNG(preset.seed);
  const ease = Easing[preset.density];
  return () => {
    const spiralCart = spiral(STATIC_ARM_CURVE, preset.armsCurve, ease(positionsRNG.random()) * (radius / STATIC_ARM_SCALE_RATIO));
    const spiralPolar = cartToPolar(spiralCart.x, spiralCart.y);
    const arm = Math.floor(positionsRNG.random() * preset.arms);
    const armAngleTransform = 2 * Math.PI * (arm / preset.arms);
    const spiralCoords = polarToCart(spiralPolar.r, spiralPolar.t + armAngleTransform);
    const spreadR = lerp(0, preset.spread, Easing[preset.spreadShape](positionsRNG.random()));
    const spreadT1 = lerp(0, Math.PI * 2, positionsRNG.random());
    const spreadT2 = lerp(0, Math.PI * 2, positionsRNG.random());
    const spreadCoords = polarToCart3d(spreadR, spreadT1, spreadT2);
    return {
      x: spiralCoords.x + spreadCoords.x,
      y: spiralCoords.y + spreadCoords.y,
      z: getZPosition(preset, positionsRNG, radius, spiralPolar.r) + spreadCoords.z * preset.heightSpread,
    };
  };
}

function getZPosition(preset, rng, radius, starR) {
  const ratio = 1 - Easing[preset.sideShape](starR / radius);
  const position = ratio * rng.random() * preset.height;
  const side = rng.random() > 0.5 ? 1 : -1;
  return position * side;
}
