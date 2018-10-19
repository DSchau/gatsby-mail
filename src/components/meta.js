import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

function Meta({ meta, title }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }

          content: contentYaml {
            description
            url
            twitter
          }
        }
      `}
      render={data => (
        <Helmet
          meta={[
            {
              name: `description`,
              content: data.content.description,
            },
            {
              name: `og:url`,
              content: data.content.url,
            },
            {
              name: `twitter:creator`,
              content: data.content.twitter,
            },
          ].concat(meta)}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        >
          <html lang="en" />
        </Helmet>
      )}
    />
  )
}

Meta.propTypes = {
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
}

Meta.defaultProps = {
  title: `Inbox`,
  meta: [],
}

export default Meta
