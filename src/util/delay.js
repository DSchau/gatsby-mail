const delay = duration =>
  new Promise(resolve => window.setTimeout(resolve, duration))

export default delay
