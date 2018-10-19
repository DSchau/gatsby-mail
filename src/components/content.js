import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const Container = styled.main(
  {
    display: `flex`,
    flexDirection: `column`,
    flex: `1 1 auto`,
    padding: `1rem`,
    position: 'relative',
    overflowY: 'auto',
    WebikitOverflowScrolling: 'touch',
  },
  ({ center, theme }) => ({
    backgroundColor: theme.bg,
    color: theme.color,
    ...(center
      ? {
          alignItems: `center`,
          justifyContent: `center`,
        }
      : {}),
  })
)

function Content({ children, center }) {
  return <Container center={center}>{children}</Container>
}

Content.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
}

Content.defaultProps = {
  center: false,
}

export default Content
