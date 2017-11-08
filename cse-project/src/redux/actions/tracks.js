const show = id => ({ type: 'SHOW', payload: id })
const hide = id => ({ type: 'HIDE', payload: id })

export { show, hide }
