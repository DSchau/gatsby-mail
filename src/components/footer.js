import React from 'react'
import styled from 'react-emotion'
import { FaHeart } from 'react-icons/fa'

import { PULSE } from '../style/animations'

const Container = styled.footer(
  {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flex: '0 0 auto',
    padding: `1rem 0.5rem`,
  },
  ({ theme }) => ({
    backgroundColor: theme.inverted.bg,
    color: theme.inverted.color,
  })
)

const Message = styled.p({
  fontSize: 14,
})

const Heart = styled(FaHeart)({
  color: `red`,
  margin: `0.125rem 0.25rem`,
  fontSize: 16,
  position: 'relative',
  top: 2,
  ...PULSE,
})

function Footer() {
  return (
    <Container>
      <Message>
        Developed with <Heart /> by the GatsbyJS team.
      </Message>
    </Container>
  )
}

export default Footer
