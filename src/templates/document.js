import React from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'

import BackLink from '../components/back-link'
import Meta from '../components/meta'

const Content = styled.div(
  {
    margin: '0 auto',
    padding: '0.5rem 1rem',
    fontSize: 14,
    p: {
      lineHeight: 1.4,
    },
    '@media only screen and (min-width: 768px)': {
      maxWidth: '60%',
    },
  },
  ({ theme }) => ({
    a: {
      color: theme.linkAccent,
    },
    'h1, h2, h3, h4, h5, h6': {
      color: theme.name === 'dark' ? theme.link : theme.accent,
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
      <BackLink css={{ padding: '0.5rem' }} to="/">
        Home
      </BackLink>
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
