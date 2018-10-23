<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Mail
</h1>

A proof of concept application that demonstrates a few concepts, namely:

1. App-like functionality with GraphQL, data fetching, mutations, etc.
1. Static creation of pages (e.g. `/privacy-policy`, `/terms-of-service`, etc.)
1. Client-side only routes, e.g. dynamic routes
1. Schema stitching with Github's API (requests ⭐ count at _build_ time!)

## 🚀 Set up

- `yarn` or `npm install`
- Request a [Github token](https://github.com/settings/tokens) and give `repo` full access to the token
- `cat .env.sample > .env.development` then paste in your access token from gitub
- `yarn develop` or `npm run develop`
