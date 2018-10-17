import OneGraphAuth from 'onegraph-auth'

let auth

export const appId = process.env.GATSBY_OG_APP_ID

export default () => {
  if (!auth) {
    auth = new OneGraphAuth({
      appId,
    })
  }
  return auth
}
