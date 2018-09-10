import React, { Fragment } from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import Layout, { LeftMenu } from 'views/new-layout'
import { HistoryProvider, Router } from 'views/router'
import { content, overlay, still, unauthRoutes } from 'views/route-config'
import defaultTheme from 'views/themes/default'
import { Nothing } from 'ui/elements'

injectGlobal`
  /*
  body {
    background: ${ defaultTheme.primary.base };
    color: ${ defaultTheme.primary.on.base};
  }
  */

  #root {
    position: relative;
    height: 100%;
    min-height: 100%;
    font-size: 12px;
  }

  ::-webkit-scrollbar {
    width: ${ defaultTheme.spacing.tiny };
  }

  ::-webkit-scrollbar-track {
    background: ${ defaultTheme.secondary.base };

    &:hover {
      background: ${ defaultTheme.secondary.light.base };
    }

    &:active {
      background: ${ defaultTheme.secondary.dark.base };
    }
  }

  ::-webkit-scrollbar-thumb {
    background: ${ defaultTheme.primary.base };

    &:hover {
      background: ${ defaultTheme.primary.light.base };
    }

    &:active {
      background: ${ defaultTheme.primary.dark.base };
    }
  }
`

const overlayRoutesPattern = Object.keys(unauthRoutes)
  .map(p => p.split(':')[0] + '*')
  .join('|')

const Overlay = ({ history, width }) => (
  <Router
    history={ history }
    routes={ overlay }
  />
)

const Content = ({ history }) => (
  <Router
    history={ history }
    routes={ content }
  />
)

const Still = ({ history }) => (
  <Router
    history={ history }
    routes={ still }
  />
)

const render = {
  overlay: Overlay,
  content: Content,
  still: Still
}

const App = () => (
  <ThemeProvider theme={ defaultTheme }>
    <HistoryProvider>
      <Layout render={ render } />
    </HistoryProvider>
  </ThemeProvider>
)

export default App
