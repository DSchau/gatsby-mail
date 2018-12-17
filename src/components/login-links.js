import React from 'react'
import { graphql, Link as GatsbyLink, StaticQuery } from 'gatsby'
import cx from 'classnames'
import PropTypes from 'prop-types'

const List = ({ className, ...rest }) => (
  <ul className={cx('link-container--list', className)} {...rest}>
    {rest.children}
  </ul>
)

const ListItem = ({ className, ...rest }) => (
  <li className={cx('link-container--list-item', className)} {...rest}>
    {rest.children}
  </li>
)

const Link = ({ className, ...rest }) => (
  <GatsbyLink className={cx('link-container--link', className)} {...rest}>
    {rest.children}
  </GatsbyLink>
)

function LoginLinks({ className }) {
  return (
    <StaticQuery
      query={graphql`
        query GetLinks {
          markdown: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div className={className}>
          <List>
            {data.markdown.edges.map(({ node }) => (
              <ListItem key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    />
  )
}

LoginLinks.propTypes = {
  className: PropTypes.string,
}

export default LoginLinks
