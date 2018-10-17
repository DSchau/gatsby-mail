import { keyframes } from 'react-emotion'

const PULSE_ANIMATION = keyframes({
  '0%': {
    transform: 'scale(1)',
  },
  '50%': {
    transform: 'scale(1.25)',
  },
  '100%': {
    transform: 'scale(1)',
  },
})

export const PULSE = {
  animation: `${PULSE_ANIMATION} 2.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite`,
}
