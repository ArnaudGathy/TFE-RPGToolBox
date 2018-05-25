export const actionSetMode = (mode) => ({
  type: 'ACTION_SET_MODE',
  mode,
})

export const actionSetText = (text) => ({
  type: 'ACTION_SET_TEXT',
  text,
})

export const actionSetScale = (scale) => ({
  type: 'ACTION_SET_SCALE',
  scale,
})

export const actionSetColor = (color) => ({
  type: 'ACTION_SET_COLOR',
  color,
})

export const actionSetAll = (options) => ({
  type: 'ACTION_SET_ALL',
  options: {
    ...options
  },
})

export const actionReset = () => ({
  type: 'ACTION_RESET',
})
