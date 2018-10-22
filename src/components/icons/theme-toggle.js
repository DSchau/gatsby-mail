import React from 'react'

const ThemeToggle = props => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 16 16"
    preserveAspectRatio="none"
    {...props}
  >
    <path
      d="M8 12.244c-.63 0-1.23-.141-1.768-.389A4.248 4.248 0 0 0 8.707 8a4.248 4.248 0 0 0-2.475-3.855A4.227 4.227 0 0 1 8 3.756 4.247 4.247 0 0 1 12.244 8 4.247 4.247 0 0 1 8 12.244zm5.659-6.585V2.34H10.34L8 0 5.659 2.341H2.34V5.66L0 8l2.341 2.341v3.318H5.66L8 16l2.341-2.341h3.318V10.34L16 8l-2.341-2.341z"
      fill="#8953A3"
    />
  </svg>
)

ThemeToggle.defaultProps = {
  size: 16,
}

export default ThemeToggle
