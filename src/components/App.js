import React, { useEffect } from 'react';
import Canvas from './Canvas';
import Inputs from './Inputs';
import { saveAs } from 'file-saver';
import { urlToPreset, shareOnTwitter, presetToUrl, presetToHash } from '../utils/sharing';
import { track } from '../utils/analytics';
import { DEFAULT_PRESET, PRESET_VERSION } from '../presets';

const CANVAS_SIZE = 1500;

export default function App() {
  const canvasRef = React.useRef(null);

  const [presets, setPresets] = React.useState({
    default: DEFAULT_PRESET,
    ...JSON.parse(localStorage.getItem('presets') || '{}'),
  });

  const [advanced, setAdvanced] = React.useState(localStorage.getItem('advanced') === 'true');

  const initialPreset = urlToPreset() || presets[localStorage.getItem('lastPreset')] || DEFAULT_PRESET;
  const [preset, setPresetValue] = React.useState(initialPreset.version === PRESET_VERSION ? initialPreset : DEFAULT_PRESET);

  useEffect(() => {
    const { spaceColor, starColor, luminance, layers } = preset;
    window.effects = JSON.stringify({ spaceColor, starColor, luminance, layers }); // for easily extracting effects presets
  }, [preset]);

  const onSave = () => {
    track('click', 'imageSaved');
    canvasRef.current.toBlob(blob => {
      saveAs(blob, `galaxy-${preset.name}.png`);
    });
  };

  const onUndoChanges = () => {
    track('click', 'undoChanged');
    document.location.hash = '';
    setPresetValue(presets[localStorage.getItem('lastPreset') || 'default']);
  };

  const onChange = value => {
    track('inputChanged', Object.keys(value)[0]);
    const newPreset = { ...preset, ...value };
    setPresetValue(newPreset);
    document.location.hash = presetToHash(newPreset);
  };

  const onSavePreset = () => {
    track('click', 'presetSaved');
    const newPresets = { ...presets, [preset.name]: preset };
    localStorage.setItem('presets', JSON.stringify(newPresets));
    localStorage.setItem('lastPreset', preset.name);
    setPresets(newPresets);
  };

  const onChangePreset = value => {
    const presetName = value.preset;
    track('presetChanged');
    setPresetValue(presets[presetName]);
    localStorage.setItem('lastPreset', presetName);
  };

  const onShare = () => {
    track('click', 'shareTwitter');
    shareOnTwitter(presetToUrl(preset), 'I created a galaxy! ⭐', ['icreatedagalaxy', 'reversim', 'rs19']);
  };

  const onChangeAdvanced = value => {
    track('advancedChanged', value);
    setAdvanced(value);
    localStorage.setItem('advanced', value);
  };

  return (
    <div className="layout">
      <Canvas canvasRef={canvasRef} size={CANVAS_SIZE} preset={preset} />
      <Inputs
        presets={Object.keys(presets)}
        preset={preset}
        advanced={advanced}
        onSave={onSave}
        onSavePreset={onSavePreset}
        onUndoChanges={onUndoChanges}
        onChange={onChange}
        onChangePreset={onChangePreset}
        onShare={onShare}
        onChangeAdvanced={onChangeAdvanced}
      />
    </div>
  );
}
