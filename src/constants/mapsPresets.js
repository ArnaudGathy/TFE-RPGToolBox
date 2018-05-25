import {MAPS_COLORS} from '../constants/mapsColors'

export const presets = {
  player: (text) => ({
    mode: 'Circle',
    text,
    scale: 1,
    color: MAPS_COLORS.player,
  }),
  ennemy: {
    mode: 'Circle',
    text: '',
    scale: 1,
    color: MAPS_COLORS.ennemy,
  },
  ogre: {
    mode: 'Circle',
    text: 'OGRE',
    scale: 2,
    color: MAPS_COLORS.ennemy,
  },
  goblin: {
    mode: 'Circle',
    text: 'GOBLIN',
    scale: 1,
    color: MAPS_COLORS.ennemy,
  },
  loot: {
    mode: 'Star',
    text: '',
    scale: 1,
    color: MAPS_COLORS.loot,
  },
  trap: {
    mode: 'Ring',
    text: '',
    scale: 1,
    color: MAPS_COLORS.trap,
  },
}
