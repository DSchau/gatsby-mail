import React, { Component } from 'react'
import styled from 'react-emotion'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

import Meta from '../components/meta'
import Textarea from '../components/textarea'
import User from '../components/user'

import delay from '../util/delay'

const styles = {
  input: {
    display: 'block',
    border: `1px solid #ccc`,
    padding: '0.5rem 0.25rem',
    margin: '0.125rem 0',
    width: '100%',
  },
}

const Card = styled.form(
  {
    width: `100%`,
    margin: `0 auto`,
    '@media only screen and (min-width: 768px)': {
      width: '50%',
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.bgLight,
  })
)

const Title = styled.h2(({ theme }) => ({
  display: 'block',
  backgroundColor: theme.inverted.bg,
  color: theme.inverted.color,
  padding: '0.5rem',
  margin: 0,
  width: '100%',
}))

const Alert = styled.div(
  {
    color: 'white',
    backgroundColor: '#00A388',
    padding: '0.5rem 1rem',
    margin: '1rem',
    textAlign: 'center',
  },
  ({ type }) => ({
    ...(type === 'error'
      ? {
          backgroundColor: '#C33325',
        }
      : {}),
    ...(type === 'loading'
      ? {
          backgroundColor: '#526C70',
        }
      : {}),
  })
)

const Text = styled.p({
  margin: 0,
  lineHeight: 1.5,
})

const Content = styled.div({
  padding: '1rem',
  width: '100%',
})

const Label = styled.label(
  {
    display: 'block',
    fontWeight: 'bold',
    margin: '0.5rem 0',
  },
  ({ theme }) => ({
    color: theme.color,
  })
)

const Input = styled.input(styles.input)

Input.defaultProps = {
  type: 'text',
}

const Button = styled.button(({ theme }) => ({
  backgroundColor: theme.accent,
  border: 'none',
  color: 'white',
  padding: '0.5rem 1rem',
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}))

Button.defaultProps = {
  type: 'submit',
}

class NewMessage extends Component {
  state = {
    body: ``,
    subject: ``,
    to: ``,
    message: ``,
    status: ``,
  }

  componentDidMount() {
    this.firstInput.focus()
  }

  handleChange = ev => {
    const name = ev.target.getAttribute('id')
    this.setState({
      [name]: ev.target.value,
    })
  }

  handleComplete = async () => {
    this.setState({
      body: ``,
      subject: ``,
      to: ``,
      status: `success`,
    })

    await delay(2500)

    this.setState({
      status: ``,
    })
  }

  handleSubmit = (sendMessage, user) => {
    return async ev => {
      ev.preventDefault()

      const fields = ['body', 'subject', 'to']
      const valid = fields.every(name => this.state[name].length > 0)

      if (!valid) {
        this.setState({
          status: `error`,
          message: `All fields are required`,
        })

        return
      }

      this.setState({
        status: `loading`,
      })

      return sendMessage({
        variables: fields.reduce(
          (merged, field) => {
            merged[field] = this.state[field]
            return merged
          },
          {
            from: [user.name, `<${user.email}>`]
              .filter(part => part && part.length > 0)
              .join(' '),
          }
        ),
      })
    }
  }

  getMessage(status, message) {
    if (message) {
      return message
    }

    switch (status) {
      case 'loading':
        return 'Sending message...'
      case 'error':
        return 'Oh no, an error!'
      case 'success':
        return 'Success! Sent your message.'
      default:
        return ''
    }
  }

  render() {
    const { body, subject, to } = this.state
    return (
      <>
        <Meta title="Send a message" />
        <User>
          {({ user }) => (
            <Mutation
              onCompleted={this.handleComplete}
              mutation={gql`
                mutation SendMessage(
                  $body: String!
                  $from: String!
                  $to: String!
                  $subject: String!
                ) {
                  google {
                    gmail {
                      sendMessage(
                        data: {
                          body: $body
                          from: $from
                          to: $to
                          subject: $subject
                        }
                      ) {
                        message {
                          threadId
                        }
                      }
                    }
                  }
                }
              `}
              children={sendMessage => {
                const message = this.getMessage(
                  this.state.status,
                  this.state.message
                )
                return (
                  <Card onSubmit={this.handleSubmit(sendMessage, user)}>
                    <Title>Send a message</Title>
                    {message && (
                      <Alert type={this.state.status}>
                        <Text>{message}</Text>
                      </Alert>
                    )}
                    <Content>
                      <Label htmlFor="subject">
                        Subject
                        <Input
                          id="subject"
                          innerRef={ref => (this.firstInput = ref)}
                          value={subject}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <Label htmlFor="to">
                        To
                        <Input
                          id="to"
                          value={to}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <Label htmlFor="body">
                        Message
                        <Textarea
                          id="body"
                          css={styles.input}
                          rows={5}
                          value={body}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <Button disabled={!user}>Send message</Button>
                    </Content>
                  </Card>
                )
              }}
            />
          )}
        </User>
      </>
    )
  }
}

export default NewMessage
