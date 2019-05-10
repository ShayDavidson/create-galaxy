import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { invalidatePresetCacheIfNeeded } from './presets';

invalidatePresetCacheIfNeeded();
ReactDOM.render(<App />, document.getElementById('root'));
