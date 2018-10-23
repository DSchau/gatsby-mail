import React from 'react'

const Star = ({ size, height, width, fill, opacity, ...rest }) => (
  <svg
    width={size || width}
    height={size || height}
    fill="none"
    viewBox="0 0 8 8"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      opacity={opacity}
      d="M7.97 4c0-.696-.692-1.217-1.385-1.217-.867 0-1.387-.696-1.387-1.392C5.025.696 4.678 0 3.985 0c-.693 0-1.213.696-1.213 1.391 0 .87-.693 1.392-1.386 1.392S0 3.304 0 4c0 .696.693 1.217 1.386 1.217.867 0 1.386.696 1.386 1.392 0 .695.52 1.391 1.213 1.391.694 0 1.213-.696 1.213-1.391 0-.696.693-1.392 1.387-1.392C7.278 5.043 7.97 4.696 7.97 4z"
      fill={fill}
    />
  </svg>
)

Star.defaultProps = {
  fill: '#639',
  opacity: 0.15,
  width: 8,
  height: 8,
}

export default Star
