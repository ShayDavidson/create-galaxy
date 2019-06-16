import React from 'react';
import { Easing } from '../utils/easing';
import { isNotUndefined, immutableIndexUpdate, immutableIndexSwitch } from '../utils/misc';
import { supportsEffects, isiOS, isFirefox } from '../utils/browser';
import { AVAILABLE_BLEND_MODES } from './Canvas';
import { CAMERA_PRESETS, EFFECT_PRESETS } from '../presets';

const BLEND_MODES_TO_TEXT = {
  'source-over': 'plain',
  'soft-light': 'softLight',
  'hard-light': 'hardLight',
  'color-dodge': 'colorDodge',
  'color-burn': 'colorBurn',
};

export default function Inputs({
  presets,
  preset,
  advanced,
  onChange,
  onChangePreset,
  onUndoChanges,
  onSave,
  onSavePreset,
  onShare,
  onChangeAdvanced,
}) {
  const ref = React.createRef(null);

  React.useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [advanced]); // eslint-disable-line

  return (
    <div ref={ref} className="inputs">
      <div className="row">
        <div className="info">
          <strong>#creategalaxy</strong> by{' '}
          <a href="https://twitter.com/ShayHDavidson" target="_blank" rel="noopener noreferrer">
            @ShayDavidson
          </a>
        </div>
      </div>
      <div className="row">
        <button className="action-button" onClick={onSave}>
          <span role="img" aria-label="save-image">
            📷
          </span>{' '}
          Save Image
        </button>
      </div>
      <div className="row">
        <button className="action-button" onClick={onShare}>
          <span className="twitter-icon" role="img" aria-label="share">
            🐔
          </span>{' '}
          Share
        </button>
        <a href="https://github.com/ShayDavidson/create-galaxy" target="_blank" rel="noopener noreferrer">
          <button className="action-button">
            <span className="github-icon" role="img" aria-label="share">
              👫
            </span>{' '}
            Contribute
          </button>
        </a>
      </div>

      {separator()}

      {select(preset.name, 'preset', presets, onChangePreset, { buttonIcon: '↩️ Undo', buttonAction: onUndoChanges })}
      {input('text', preset, 'name', onChange, { buttonIcon: '💾 Save', buttonAction: onSavePreset })}
      {advanced && input('number', preset, 'seed', onChange, { min: 0, step: 1 })}
      {input('number', preset, 'stars', onChange, { min: 0, step: 5000 })}

      {title('Shape')}
      {select(preset['type'], 'type', ['spiral', 'globular'], onChange)}
      {select(preset['density'], 'density', Object.keys(Easing), onChange)}
      {input('number', preset, 'spread', onChange, { min: 0, step: 1 })}
      {advanced && select(preset['spreadShape'], 'spreadShape', Object.keys(Easing), onChange)}
      {advanced && select(preset['sideShape'], 'sideShape', Object.keys(Easing), onChange)}
      {advanced && input('number', preset, 'height', onChange, { min: 0, step: 1 })}
      {advanced &&
        input('number', preset, 'heightSpread', onChange, {
          min: 0,
          max: 1,
          step: 0.1,
        })}
      {preset.type === 'spiral' && (
        <>
          {input('range', preset, 'arms', onChange, {
            min: 1,
            max: 10,
            step: 1,
          })}
          {input('range', preset, 'armsCurve', onChange, {
            min: 0,
            max: 5,
            step: 0.025,
          })}
        </>
      )}

      {title('Effects')}
      {!advanced && (
        <>
          {!supportsEffects() && <div className="error">Effects are partial in iOS/Safari 😞</div>}
          <select className="standard-input" defaultValue="" onChange={e => onChange(EFFECT_PRESETS[e.target.value])}>
            <option value="" disabled>
              Effects Preset
            </option>
            {Object.keys(EFFECT_PRESETS).map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      )}
      {advanced && (
        <>
          {advanced && input('range', preset, 'luminance', onChange, { min: 0, max: 1, step: 0.05 })}
          {input('color', preset, 'spaceColor', onChange)}
          {preset.starColor.map((_, index) => {
            return input('color', preset, 'starColor', onChange, { index, advanced });
          })}
          {advanced && (
            <div className="row">
              <button className="add-button" onClick={addToArray(preset, 'starColor', onChange)}>
                <span role="img" aria-label="add-color">
                  🎨
                </span>{' '}
                Add color
              </button>
            </div>
          )}
          {advanced && title('Effect Layers')}
          {supportsEffects() ? (
            <>
              {isFirefox() && <div className="error">{'⚠️ Animated blur effect are slow in Firefox 🔥🦊'}</div>}
              {preset.layers.map((_, index) => {
                return layer(preset, index, onChange);
              })}
              <div className="row">
                <button className="add-button" onClick={addToArray(preset, 'layers', onChange)}>
                  <span role="img" aria-label="add-effect-layer">
                    💥
                  </span>{' '}
                  Add layer
                </button>
              </div>
            </>
          ) : (
            <div className="error">{isiOS() ? 'Not supported in iPhone 😞' : 'Not supported in this browser 😞'}</div>
          )}
        </>
      )}

      {title('Camera')}
      {!advanced && (
        <select className="standard-input" defaultValue="" onChange={e => onChange(CAMERA_PRESETS[e.target.value])}>
          <option value="" disabled>
            Camera Preset
          </option>
          {Object.keys(CAMERA_PRESETS).map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {advanced &&
        input('range', preset, 'cameraX', onChange, {
          min: 0,
          max: Math.PI * 2,
          step: 0.05,
        })}
      {advanced &&
        input('range', preset, 'cameraY', onChange, {
          min: 0,
          max: Math.PI * 2,
          step: 0.05,
        })}
      {advanced &&
        input('range', preset, 'cameraZ', onChange, {
          min: 0,
          max: Math.PI * 2,
          step: 0.05,
        })}

      {title('Extra')}
      {input('checkbox', preset, 'animated', onChange)}
      {advanced &&
        preset.animated &&
        input('number', preset, 'animSpeed', onChange, {
          min: 0.1,
          step: 0.1,
        })}
      {advanced && input('checkbox', preset, 'watermark', onChange)}
      <div className="row">
        <label className="input-label" htmlFor="advanced">
          advanced{' '}
          <span role="img" aria-label="advanced">
            🧐
          </span>
        </label>
        <input
          id="advanced"
          className="standard-input"
          type="checkbox"
          value={advanced}
          checked={advanced}
          onChange={e => onChangeAdvanced(e.target.checked)}
        />
      </div>

      {separator()}
    </div>
  );
}

function addToArray(preset, key, onChange) {
  const array = preset[key];
  return () => {
    onChange({
      [key]: array.concat(array[array.length - 1]),
    });
  };
}

function fixAndroidKeyboardDismiss(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
}

function title(text) {
  return (
    <div className="row">
      <h4>{text}</h4>
    </div>
  );
}

function separator() {
  return (
    <div className="row">
      <hr />
    </div>
  );
}

function input(type, preset, key, onChange, options = {}) {
  const { index, advanced, buttonIcon, buttonAction, ...rest } = options;
  const hasIndex = index !== undefined;
  const value = hasIndex ? preset[key][index] : preset[key];
  const keyId = hasIndex ? `${key}:${index}` : key;
  return (
    <div key={keyId} className="row">
      <label className="input-label" htmlFor={keyId}>
        {keyId}
      </label>
      <input
        autoComplete="off"
        id={keyId}
        className="standard-input"
        type={type}
        value={value}
        checked={type === 'checkbox' ? preset[key] : false}
        onChange={e => {
          const newValue =
            type === 'checkbox'
              ? e.target.checked
              : type === 'number'
              ? e.target.value === ''
                ? ''
                : parseFloat(e.target.value)
              : e.target.value;
          if (hasIndex) {
            onChange({
              [key]: immutableIndexUpdate(preset[key], index, newValue),
            });
          } else {
            onChange({ [key]: newValue });
          }
        }}
        onKeyUp={fixAndroidKeyboardDismiss}
        {...rest}
      />
      {type === 'range' && <input className="fill-input" type="text" readOnly value={value} />}
      {buttonAction && (
        <button onClick={buttonAction}>
          <span role="img" aria-label="save-preset">
            {buttonIcon}
          </span>
        </button>
      )}
      {advanced && hasIndex && preset[key].length > 1 && (
        <button
          className="destructive"
          onClick={() => {
            onChange({
              [key]: immutableIndexUpdate(preset[key], index, undefined).filter(isNotUndefined),
            });
          }}
        >
          ✖
        </button>
      )}
    </div>
  );
}

function select(value, key, options, onChange, extraOptions = {}) {
  const { buttonIcon, buttonAction } = extraOptions;

  return (
    <div className="row">
      <label className="input-label" htmlFor={key}>
        {key}
      </label>
      <select id={key} className="standard-input" value={value} onChange={e => onChange({ [key]: e.target.value })}>
        {' '}
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {buttonAction && (
        <button onClick={buttonAction}>
          <span role="img" aria-label="save-preset">
            {buttonIcon}
          </span>
        </button>
      )}
    </div>
  );
}

function layer(preset, index, onChange) {
  const layer = preset.layers[index];
  const keyId = `layer${index}`;
  return (
    <div className="layer-group" key={keyId}>
      <div className="layer row">
        <select
          className="type"
          value={layer.type}
          onChange={e => {
            if (e.target.value === 'glow') {
              onChange({
                layers: immutableIndexUpdate(preset.layers, index, { type: e.target.value, blend: layer.blend, blur: layer.blur }),
              });
            } else if (e.target.value === 'core') {
              onChange({
                layers: immutableIndexUpdate(preset.layers, index, {
                  ...layer,
                  type: e.target.value,
                  size: 300,
                  color: '#98C0E6',
                }),
              });
            }
          }}
        >
          {['glow', 'core'].map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="blend"
          value={layer.blend}
          onChange={e => {
            onChange({
              layers: immutableIndexUpdate(preset.layers, index, { ...layer, blend: e.target.value }),
            });
          }}
        >
          {AVAILABLE_BLEND_MODES.map(option => (
            <option key={option} value={option}>
              {BLEND_MODES_TO_TEXT[option] ? BLEND_MODES_TO_TEXT[option] : option}
            </option>
          ))}
        </select>

        {preset.layers.length > 1 && (
          <>
            <button
              disabled={index === 0}
              onClick={() => {
                onChange({
                  layers: immutableIndexSwitch(preset.layers, index, index - 1),
                });
              }}
            >
              ⬆
            </button>
            <button
              disabled={index === preset.layers.length - 1}
              onClick={() => {
                onChange({
                  layers: immutableIndexSwitch(preset.layers, index, index + 1),
                });
              }}
            >
              ⬇
            </button>
            <button
              className="destructive"
              onClick={() => {
                onChange({
                  layers: immutableIndexUpdate(preset.layers, index, undefined).filter(isNotUndefined),
                });
              }}
            >
              ✖
            </button>
          </>
        )}
      </div>
      <div className="layer row">
        <label htmlFor={`blur-${keyId}`}>blur</label>
        <input
          autoComplete="off"
          id={`blur-${keyId}`}
          type="number"
          className="layer-value"
          value={layer.blur}
          min={0}
          onChange={e => {
            onChange({
              layers: immutableIndexUpdate(preset.layers, index, { ...layer, blur: e.target.value }),
            });
          }}
          onKeyUp={fixAndroidKeyboardDismiss}
        />
        {layer.type === 'core' && (
          <>
            <label htmlFor={`size-${keyId}`}>size</label>
            <input
              autoComplete="off"
              id={`size-${keyId}`}
              type="number"
              className="layer-value"
              value={layer.size}
              min={0}
              onChange={e => {
                onChange({
                  layers: immutableIndexUpdate(preset.layers, index, { ...layer, size: e.target.value }),
                });
              }}
              onKeyUp={fixAndroidKeyboardDismiss}
            />
            <label htmlFor={`color-${keyId}`}>color</label>
            <input
              autoComplete="off"
              id={`color-${keyId}`}
              type="color"
              className="layer-value"
              value={layer.color}
              onChange={e => {
                onChange({
                  layers: immutableIndexUpdate(preset.layers, index, { ...layer, color: e.target.value }),
                });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
