import React from 'react'
import styled from 'react-emotion'
import { FaGithub } from 'react-icons/fa'
import { MdStar } from 'react-icons/md'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import Airmail from './air-mail'
import getZIndex from '../style/z-index'

const Container = styled.footer(
  {
    flex: '0 0 auto',
    zIndex: getZIndex('footer'),
  },
  ({ theme }) => ({
    backgroundColor: theme.bgDark,
    color: theme.footerLink,
  })
)

const Contents = styled.div({
  padding: `0.75rem 1rem`,
})

const List = styled.ul({
  margin: 0,
  padding: 0,
})

const ListItem = styled.li({
  display: 'inline-block',
  margin: '0.25rem 0.5rem',
  listStyleType: 'none',
})

const Link = styled.a({
  color: 'inherit',
  fontWeight: 'bold',
  transition: '175ms cubic-bezier(.17, .67, .83, .67)',
  textDecoration: 'none',
  fontSize: 14,
  ':hover': {
    color: 'white',
  },
})

Link.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

function Footer({ stripes }) {
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
          {stripes && <Airmail />}
          <Contents>
            <List>
              <ListItem css={{ marginLeft: 0 }}>
                <Link href={data.site.siteMetadata.repository.url}>
                  <FaGithub
                    size={16}
                    css={{
                      marginRight: '0.5rem',
                      verticalAlign: 'sub',
                    }}
                  />
                  <span>Source on Github</span>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={`${data.site.siteMetadata.repository.url}/stargazers`}
                >
                  <strong css={{ fontWeight: 'normal', marginRight: 2 }}>
                    {data.github.repository.stargazers.totalCount}
                  </strong>
                  <MdStar css={{ verticalAlign: 'sub' }} size={16} />
                </Link>
              </ListItem>
            </List>
          </Contents>
        </Container>
      )}
    />
  )
}

Footer.propTypes = {
  stripes: PropTypes.bool,
}

Footer.defaultProps = {
  stripes: false,
}

export default Footer
