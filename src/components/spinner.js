import React from 'react'
import styled, { keyframes } from 'react-emotion'

const loaderSize = 20

const scale = keyframes`
0% { transform: scale(0); opacity: 0; }
5% { opacity: 1; }
100% { transform: scale(1); opacity: 0; }
`

const SpinnerContainer = styled.span({
  display: 'inline-block',
  width: loaderSize,
  height: loaderSize,
  marginRight: '0.25rem',
  position: 'relative',
  top: 4,
  'span:nth-child(2)': {
    animationDelay: '-0.8s',
  },
  'span:nth-child(3)': {
    animationDelay: '-0.4s',
  },
})

const SpinnerBall = styled.span(({ theme }) => ({
  backgroundColor: theme.accent,
  borderRadius: '100%',
  animationFillMode: 'both',
  position: 'absolute',
  opacity: 0,
  margin: 0,
  width: loaderSize,
  height: loaderSize,
  animation: `${scale} 1s 0s linear infinite`,
}))

const Spinner = () => (
  <SpinnerContainer>
    <SpinnerBall />
    <SpinnerBall />
    <SpinnerBall />
  </SpinnerContainer>
)

export default Spinner
