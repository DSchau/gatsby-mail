import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { Star } from './icons'

const Container = styled.main(
  {
    display: `flex`,
    flexDirection: `column`,
    flex: `1 1 auto`,
    position: 'relative',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  ({ center, theme }) => ({
    backgroundColor: theme.bg,
    color: theme.color,
    ...(center
      ? {
          alignItems: `center`,
        }
      : {}),
  })
)

const StyledStar = styled(Star)({
  position: 'fixed',
})

StyledStar.defaultProps = {
  height: 180,
  width: 180,
}

function Content({ children, center, decoration }) {
  return (
    <Container center={center}>
      {decoration && (
        <div css={{ zIndex: 0 }}>
          <StyledStar css={{ bottom: -45, left: -90 }} fill="#FFDF37" />
          <StyledStar css={{ bottom: '25vh', right: -90 }} fill="#73FFF7" />
          <StyledStar
            css={{ top: '25vh', left: -20 }}
            size={40}
            fill="#3FA9F5"
          />
          <StyledStar
            css={{ top: '12.5vh', left: '15vw' }}
            size={14}
            fill="#663399"
          />
          <StyledStar
            css={{ bottom: '12.5vh', left: '35vw' }}
            size={8}
            fill="#663399"
          />
        </div>
      )}
      {children}
    </Container>
  )
}

Content.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  decoration: PropTypes.bool,
}

Content.defaultProps = {
  center: false,
  decoration: false,
}

export default Content
