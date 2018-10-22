const Z_INDEX = {
  base: 1,
  content: 1,
  header: 2,
  footer: 2,
  button: 3,
}

const getZIndex = name => {
  return Z_INDEX[name] || Z_INDEX.base
}

export default getZIndex
