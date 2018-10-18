import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const Container = styled.div()

const List = styled.ul({
  margin: 0,
  padding: 0,
})

const ListItem = styled.li({
  display: 'inline-block',
  listStyleType: 'none',
  margin: '0.5rem',
})

function FooterLinks({ className }) {
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
        <Container className={className}>
          <List>
            {data.markdown.edges.map(({ node }) => (
              <ListItem key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    />
  )
}

FooterLinks.propTypes = {
  className: PropTypes.string,
}

export default FooterLinks
