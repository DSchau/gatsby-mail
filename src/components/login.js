import React from 'react'
import styled from 'react-emotion'

import Authentication from './authentication'

const Container = styled.div(
  {
    display: `flex`,
  },
  props => ({
    color: props.theme.color,
  })
)

const Card = styled.div(({ theme }) => ({
  display: `flex`,
  flexDirection: 'column',
  alignItems: `center`,
  justifyContent: `center`,
  padding: `5rem`,
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: 4,
}))

const Message = styled.p({
  position: 'absolute',
  bottom: 0,
  margin: 0,
  padding: 0,
  fontSize: 12,
})

const Button = styled.button(
  {
    padding: `1rem 2rem`,
    border: `none`,
    borderRadius: 8,
    color: `white`,
    cursor: `pointer`,
    fontSize: 24,
  },
  ({ theme }) => ({
    backgroundColor: theme.accent,
  })
)

function Login() {
  return (
    <Container>
      <Authentication>
        {({ authenticated, login }) => {
          if (authenticated) {
            return null
          }
          return (
            <Card>
              <Button onClick={login()}>Login</Button>
              <Message>
                (Don't use this for anything <em>real!</em>)
              </Message>
            </Card>
          )
        }}
      </Authentication>
    </Container>
  )
}

export default Login
