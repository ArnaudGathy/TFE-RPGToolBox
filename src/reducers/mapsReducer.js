import {MAPS_COLORS} from '../constants/mapsColors'

const initialState = {
  action: {
    mode: '',
    text: '',
    scale: 1,
    color: MAPS_COLORS.shapeDefault,
    uri: '',
  },
  shapes: {
    list: [],
    drawContext: null,
  },
  grid: {
    visible: true,
  },
  players: {
    list: [],
  },
}

export const mapsReducer = (state = initialState, action) => {
  if(action.type === 'GRID_TOGGLE') {
      return {...state, grid: { visible: !state.grid.visible}}
  }

  if(action.type === 'SHAPES_ADD') {
    const newList = state.shapes.list.slice()
    newList.push(action.shape)
    return {...state, shapes: { ...state.shapes, list: newList}}
  }
  if(action.type === 'SHAPES_CLEAR') {
    return {...state, shapes: { ...state.shapes, list: [] }}
  }
  if(action.type === 'SHAPES_SET_CONTEXT') {
    return {...state, shapes: { ...state.shapes, drawContext: action.drawContext }}
  }

  if(action.type === 'ACTION_SET_MODE') {
    return {...state, action: {...state.action, mode: action.mode}}
  }
  if(action.type === 'ACTION_SET_TEXT') {
    return {...state, action: {...state.action, text: action.text}}
  }
  if(action.type === 'ACTION_SET_SCALE') {
    return {...state, action: {...state.action, scale: action.scale}}
  }
  if(action.type === 'ACTION_SET_COLOR') {
    return {...state, action: {...state.action, color: action.color}}
  }
  if(action.type === 'ACTION_SET_ALL') {
    return {...state, action: {...state.action, ...action.options}}
  }
  if(action.type === 'ACTION_RESET') {
    return {...state, action: {...initialState.action}}
  }

  if(action.type === 'PLAYERS_SET') {
    return {...state, players: { ...state.players, list: action.players}}
  }

  return state
}
