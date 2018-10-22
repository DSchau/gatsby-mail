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
  display: 'block',
  fontSize: 14,
  listStyleType: 'none',
  margin: '0.75rem 0',
})

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.link,
  textDecoration: 'none',
  ':hover': {
    color: theme.link,
    textDecoration: 'underline',
  },
}))

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
        <Container className={className}>
          <List>
            {data.markdown.edges.map(({ node }) => (
              <ListItem key={node.fields.slug}>
                <StyledLink to={node.fields.slug}>
                  {node.frontmatter.title}
                </StyledLink>
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    />
  )
}

LoginLinks.propTypes = {
  className: PropTypes.string,
}

export default LoginLinks
