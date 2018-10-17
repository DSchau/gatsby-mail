import { injectGlobal } from 'react-emotion'

injectGlobal`
  html, body, #___gatsby, #___gatsby > div {
    height: 100%;
  }

  body {
    overflow: hidden;
  }
`
