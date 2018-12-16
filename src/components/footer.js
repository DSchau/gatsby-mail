import React from 'react'
import cx from 'classnames'
import { FaGithub } from 'react-icons/fa'
import { MdStar } from 'react-icons/md'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import Airmail from './air-mail'

const Container = ({ className, ...rest }) => (
  <footer className={cx('footer', className)} {...rest}>
    {rest.children}
  </footer>
)

const Contents = ({ className, ...rest }) => (
  <div className={cx('footer--contents', className)} {...rest}>
    {rest.children}
  </div>
)

const List = props => (
  <ul className={cx('footer--list')} {...props}>
    {props.children}
  </ul>
)

const ListItem = ({ className, ...rest }) => (
  <li className={cx('footer--list--list-item', className)} {...rest}>
    {rest.children}
  </li>
)

const Link = props => (
  <a className={cx('footer--link')} {...props}>
    {props.children}
  </a>
)

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
