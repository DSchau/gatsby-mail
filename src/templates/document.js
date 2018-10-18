import React from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'

import Meta from '../components/meta'

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
  const {
    markdown: { html, frontmatter },
  } = data
  return (
    <>
      <Meta title={frontmatter.title} />
      <Content dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export default Document

export const pageQuery = graphql`
  query DocumentBySlug($slug: String!) {
    markdown: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
