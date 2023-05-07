import './form.js';
import './scale.js';
import './filter.js';
import { createMiniatures } from './miniatures.js';
import { getData } from './api.js';
import './img-filter.js';
import './avatar.js';
import { sort } from './img-filter.js';
getData((photos) => { createMiniatures(photos);
  sort(photos);
});


