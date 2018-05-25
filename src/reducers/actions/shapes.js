export const shapesAdd = (shape) => ({
  type: 'SHAPES_ADD',
  shape,
})

export const shapesClear = () => ({
  type: 'SHAPES_CLEAR',
})

export const setContext = (context) => ({
  type: 'SHAPES_SET_CONTEXT',
  drawContext: context,
})
