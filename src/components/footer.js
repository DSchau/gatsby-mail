import React from 'react'
import styled from 'react-emotion'
import { FaHeart, FaGithub, FaStar } from 'react-icons/fa'
import { graphql, StaticQuery } from 'gatsby'

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
  margin: 0,
})

const Heart = styled(FaHeart)({
  color: `red`,
  margin: `0.125rem 0.25rem`,
  fontSize: 16,
  position: 'relative',
  top: 2,
  ...PULSE,
})

const Link = styled.a({
  display: 'inline-block',
  color: 'inherit',
  transition: 'transform 175ms cubic-bezier(.17, .67, .83, .67)',
  ':hover': {
    color: 'inherit',
    transform: 'scale(1.1)',
  },
})

Link.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

function Footer() {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          github {
            repository(owner: "dschau", name: "gatsby-mail") {
              stargazers {
                totalCount
              }
            }
          }
          site {
            siteMetadata {
              repository {
                url
              }
            }
          }
        }
      `}
      render={data => (
        <Container>
          <div css={{ position: 'absolute', left: 8 }}>
            <Link href={`${data.site.siteMetadata.repository.url}/stargazers`}>
              <strong css={{ marginRight: 6 }}>
                {data.github.repository.stargazers.totalCount}
              </strong>
              <FaStar css={{ position: 'relative', top: 1 }} size={16} />
            </Link>
          </div>
          <Message>
            Developed with <Heart /> by the GatsbyJS team.
          </Message>
          <div css={{ position: 'absolute', right: 8 }}>
            <Link href={data.site.siteMetadata.repository.url}>
              <FaGithub size={24} />
            </Link>
          </div>
        </Container>
      )}
    />
  )
}

export default Footer
