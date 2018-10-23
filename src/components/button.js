import styled from 'react-emotion'

import { HEADER_FONTS } from '../util/typography'

const Button = styled.button(
  {
    padding: `0.5rem 1rem`,
    border: `none`,
    color: `white`,
    cursor: `pointer`,
    fontFamily: HEADER_FONTS.join(','),
    fontSize: 18,
  },
  ({ theme }) => ({
    backgroundColor: theme.accent,
  })
)

export default Button
