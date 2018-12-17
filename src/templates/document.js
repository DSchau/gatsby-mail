import React from 'react'
import { graphql } from 'gatsby'

import BackLink from '../components/back-link'
import Meta from '../components/meta'

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
      <div className="document" dangerouslySetInnerHTML={{ __html: html }} />
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
