import Typography from 'typography'

import '../fonts/Webfonts/futurapt_book_macroman/stylesheet.css'
import '../fonts/Webfonts/futurapt_bookitalic_macroman/stylesheet.css'
import '../fonts/Webfonts/futurapt_demi_macroman/stylesheet.css'
import '../fonts/Webfonts/futurapt_demiitalic_macroman/stylesheet.css'

export const HEADER_FONTS = [
  `Futura PT`,
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  `Oxygen`,
  `Ubuntu`,
  `Cantarell`,
  `Fira Sans`,
  `Droid Sans`,
  `Helvetica Neue`,
  `Arial`,
  `sans-serif`,
]

export const SYSTEM_FONTS = [
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  `Oxygen`,
  `Ubuntu`,
  `Cantarell`,
  `Fira Sans`,
  `Droid Sans`,
  `Helvetica Neue`,
  `Arial`,
  `sans-serif`,
]

export default new Typography({
  headerFontFamily: HEADER_FONTS,
  bodyFontFamily: SYSTEM_FONTS,
  baseLineHeight: 1.4,
  baseFontSize: `16px`,
  headerLineHeight: 1.075,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
})
