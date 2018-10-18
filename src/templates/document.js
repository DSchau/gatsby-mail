import React from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'

const Content = styled.div(
  {
    margin: '0 auto',
    padding: '1rem',
    '@media only screen and (min-width: 768px)': {
      maxWidth: '60%',
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.bgLight,
    'h1, h2, h3, h4, h5, h6': {
      color: theme.color,
    },
  })
)

function Document({ data }) {
  return <Content dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
}

export default Document

export const pageQuery = graphql`
  query DocumentBySlug($slug: String!) {
    markdown: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
