export const selectMaps = state => state.maps

export const mapsReducer = (state = {}, action) => {
  if (action.type === 'SET_MAPS') {
    return {
      ...state,
      [action.payload.key]: action.payload.payload
    }
  }

  return state
}
