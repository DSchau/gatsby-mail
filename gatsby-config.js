const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Gatsby Mail',
    unauthenticatedRoutes: [`/privacy-policy/`, `/terms-of-service/`],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-mail',
        short_name: 'mail',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-offline',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'content'),
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
  ],
}
