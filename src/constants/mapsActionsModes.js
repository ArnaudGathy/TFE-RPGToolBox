export const MAPS_MODES = {
  CIRCLE: 'Circle',
  SQUARE: 'Square',
  RECT: 'Rect',
  TRIANGLE: 'Triangle',
  DIAMOND: 'Diamond',
  STAR: 'Star',
  RING: 'Ring',
  FREE: 'free',
  ERASE: 'erase',
  IMG: 'image',
}

export const WIDTH_HEIGHT = [
  MAPS_MODES.RECT,
]

export const SCALED = [
  MAPS_MODES.CIRCLE,
  MAPS_MODES.SQUARE,
  MAPS_MODES.TRIANGLE,
  MAPS_MODES.DIAMOND,
  MAPS_MODES.STAR,
  MAPS_MODES.RING,
]

export const COLORED = [
  ...SCALED,
  ...WIDTH_HEIGHT,
  MAPS_MODES.FREE,
]

export const TEXTED = [
  MAPS_MODES.RECT,
  MAPS_MODES.CIRCLE,
  MAPS_MODES.SQUARE,
]
