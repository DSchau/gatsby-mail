import React, { Component } from 'react'
import cx from 'classnames'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { MdSend } from 'react-icons/md'

import FloatingButton from '../components/floating-button'
import Meta from '../components/meta'
import Textarea from '../components/textarea'
import Toolbar from '../components/toolbar'
import User from '../components/user'

import delay from '../util/delay'

const Label = ({ className, ...rest }) => (
  <label className={cx('new-page__label', className)} {...rest}>
    {rest.children}
  </label>
)

const Input = class extends Component {
  static defaultProps = {
    type: 'text',
  }

  render() {
    const { className, innerRef, ...rest } = this.props
    return (
      <input
        className={cx('new-page__input', className)}
        ref={innerRef}
        {...rest}
      >
        {rest.children}
      </input>
    )
  }
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
      <div className="new-page">
        <Meta title="Send a message" />
        <Toolbar />
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
                  <form
                    className="new-page__card"
                    onSubmit={this.handleSubmit(sendMessage, user)}
                  >
                    {message && (
                      <div className="new-page__alert" type={this.state.status}>
                        <p className="new-page__text">{message}</p>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="to">
                        To
                        <Input
                          id="to"
                          value={to}
                          innerRef={ref => (this.firstInput = ref)}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <Label htmlFor="subject">
                        Subject
                        <Input
                          id="subject"
                          value={subject}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <Label htmlFor="body">
                        Message
                        <Textarea
                          className="new-page__input"
                          id="body"
                          rows={5}
                          value={body}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Label>
                      <div className="new-page__submit">
                        <FloatingButton
                          style={{ backgroundColor: '#3FA9F5', fontSize: 20 }}
                          disabled={!user}
                          type="submit"
                        >
                          <MdSend />
                        </FloatingButton>
                      </div>
                    </div>
                  </form>
                )
              }}
            />
          )}
        </User>
      </div>
    )
  }
}

export default NewMessage
