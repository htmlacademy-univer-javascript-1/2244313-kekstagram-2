import './data.js';
import './miniatures.js';
import './big-picture.js';
import './form.js';
import './scale.js';
import './filter.js';
import { createMiniatures } from './miniatures.js';
import { getData } from './api.js';

getData((photos) => { createMiniatures(photos);});
