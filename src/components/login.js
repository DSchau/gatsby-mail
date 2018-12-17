import React from 'react'
import cx from 'classnames'
import { FaArrowRight, FaExclamationTriangle } from 'react-icons/fa'

import Authentication from './authentication'
import Button from './button'
import LoginLinks from './login-links'

const Container = ({ className, ...rest }) => (
  <div className={cx('login', className)} {...rest}>
    {rest.children}
  </div>
)

const Title = ({ children, className }) => (
  <h1 className={cx('login--title', className)}>{children}</h1>
)

const Subtitle = ({ children, className }) => (
  <span className={cx('login--title--sub', className)}>{children}</span>
)

const Message = ({ children, className }) => (
  <h4 className={cx('login--message', className)}>{children}</h4>
)

function Login() {
  return (
    <Container>
      <Authentication.Consumer>
        {({ authenticated, login }) => {
          if (authenticated) {
            return null
          }
          return (
            <>
              <Title>
                Welcome to
                <Subtitle>Gatsby Mail</Subtitle>
              </Title>
              <Button style={{ margin: '1rem 0' }} onClick={login()}>
                Log in with Google{' '}
                <FaArrowRight style={{ position: 'relative', top: 4 }} />
              </Button>
              <Message>
                <FaExclamationTriangle
                  style={{
                    position: 'relative',
                    top: 2,
                    marginRight: '0.25rem',
                  }}
                />{' '}
                Don't use this for anything <em>real!</em>
              </Message>
            </>
          )
        }}
      </Authentication.Consumer>
      <LoginLinks />
    </Container>
  )
}

export default Login
