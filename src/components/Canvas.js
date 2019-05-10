import React from 'react';
import { supportsEffects } from '../utils/browser';
import { getGalaxyStars } from '../logic/galaxy';

const GLOBULAR_PADDING = 20;
const ANIMATION_SPEED_MULTIPLIER = 0.0001;

export const AVAILABLE_BLEND_MODES = [
  'source-over',
  'lighter',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
];

export default function Canvas({ size, preset, canvasRef }) {
  const offscreenCanvasRef = React.useRef(null);
  const texturesCanvasRef = React.useRef(null);
  const time = React.useRef(0);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const offscreenCanvas = offscreenCanvasRef.current;
    let raf = null;

    const onFrame = () => {
      if (preset.animated) {
        time.current += (preset.animSpeed || 0) * ANIMATION_SPEED_MULTIPLIER;
        draw(offscreenCanvas, ctx, preset, time.current);
        loopRaf();
      } else {
        draw(offscreenCanvas, ctx, preset, time.current);
      }
    };

    const loopRaf = () => {
      raf = window.requestAnimationFrame(onFrame);
    };

    const stopRaf = () => {
      window.cancelAnimationFrame(raf);
    };

    onFrame();

    return stopRaf;
  }, [preset, canvasRef]);

  return (
    <>
      <canvas className="textures-canvas" ref={texturesCanvasRef} width={size} height={size} />
      <canvas className="offscreen-canvas" ref={offscreenCanvasRef} width={size} height={size} />
      <canvas className="canvas" ref={canvasRef} width={size} height={size} />
    </>
  );
}

export function draw(offscreenCanvas, presentedCtx, preset, time = 0) {
  const offscreenCanvasCtx = offscreenCanvas.getContext('2d');
  const canvasSize = offscreenCanvasCtx.canvas.width;
  const radius = canvasSize / 2;
  const transformedRadius = preset.type === 'globular' ? radius - GLOBULAR_PADDING : radius;

  const stars = getGalaxyStars(preset, transformedRadius, time);
  offscreenCanvasCtx.clearRect(0, 0, canvasSize, canvasSize);
  const imgData = offscreenCanvasCtx.getImageData(0, 0, canvasSize, canvasSize);
  stars.forEach(star => drawStar(imgData, canvasSize, star.position, star.color, star.size, preset.luminance));
  offscreenCanvasCtx.putImageData(imgData, 0, 0);

  finalizeWithEffects(offscreenCanvas, presentedCtx, canvasSize, preset);
  addWatermark(preset, presentedCtx, canvasSize);
}

function drawStar(imgData, canvasSize, { x, y }, color, size, sizeMultiplier) {
  if (x > canvasSize / 2 || x < -canvasSize / 2 || y > canvasSize / 2 || y < -canvasSize / 2) {
    return;
  }

  const alpha = Math.min(1, size * sizeMultiplier);

  drawPixel(imgData.data, canvasSize, x, y, color, 1);
  drawPixel(imgData.data, canvasSize, x + 1, y, color, alpha);
  drawPixel(imgData.data, canvasSize, x - 1, y, color, alpha);
  drawPixel(imgData.data, canvasSize, x, y + 1, color, alpha);
  drawPixel(imgData.data, canvasSize, x, y - 1, color, alpha);
  drawPixel(imgData.data, canvasSize, x + 1, y - 1, color, alpha);
  drawPixel(imgData.data, canvasSize, x + 1, y + 1, color, alpha);
  drawPixel(imgData.data, canvasSize, x - 1, y - 1, color, alpha);
  drawPixel(imgData.data, canvasSize, x - 1, y + 1, color, alpha);
}

function drawPixel(pixels, canvasSize, x, y, { r, g, b }, alpha) {
  const index = (Math.floor(x) + canvasSize / 2 + (Math.floor(y) + canvasSize / 2) * canvasSize) * 4;
  pixels[index + 0] = r;
  pixels[index + 1] = g;
  pixels[index + 2] = b;
  pixels[index + 3] = Math.floor(255 * alpha);
}

function finalizeWithEffects(offscreenCanvas, ctx, canvasSize, preset) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.filter = 'none';
  ctx.fillStyle = preset.spaceColor;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  if (supportsEffects()) {
    preset.layers.forEach(layer => {
      ctx.globalCompositeOperation = layer.blend;
      ctx.filter = layer.blur > 0 ? `blur(${layer.blur}px)` : 'none';
      if (layer.type === 'glow') {
        ctx.drawImage(offscreenCanvas, 0, 0);
      } else if (layer.type === 'core') {
        const gradient = ctx.createRadialGradient(canvasSize / 2, canvasSize / 2, 0, canvasSize / 2, canvasSize / 2, layer.size);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, layer.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
      }
    });
  } else {
    ctx.drawImage(offscreenCanvas, 0, 0);
  }
}

function addWatermark(preset, ctx, canvasSize) {
  if (preset.watermark) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.filter = 'none';
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillText('creategalaxy.com', 7, canvasSize - 10);
  }
}
