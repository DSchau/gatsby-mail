import React, { Component } from 'react'
import autosize from 'autosize'
import PropTypes from 'prop-types'

class Textarea extends Component {
  componentDidMount() {
    autosize(this.textarea)
  }

  componentWillUnmount() {
    autosize.destroy(this.textarea)
  }

  render() {
    return <textarea {...this.props} ref={ref => (this.textarea = ref)} />
  }
}

Textarea.defaultProps = {
  className: PropTypes.string.isRequired,
}

export default Textarea
