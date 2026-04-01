import * as migration_20260329_192333 from './20260329_192333';
import * as migration_20260401_182543 from './20260401_182543';

export const migrations = [
  {
    up: migration_20260329_192333.up,
    down: migration_20260329_192333.down,
    name: '20260329_192333',
  },
  {
    up: migration_20260401_182543.up,
    down: migration_20260401_182543.down,
    name: '20260401_182543'
  },
];
