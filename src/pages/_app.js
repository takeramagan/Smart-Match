// import react
import React from 'react';
// import react typechecking
import PropTypes from 'prop-types';
// import config file that initialize i18next
import "../i18n/config";
// inject element to head tag of page
import Head from 'next/head';
/* use custom theme (based on default theme)  */
// import custom theme
import theme from '../theme';
// wrapper to wrap content with themeprovider
import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline to provides better cross-browser consistency in the default styling of HTML elements. (Same as normalize.css)
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { store } from '../store/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import global variable wrapper using context API
import { ContextWrapper } from "../globalContext";

export default function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Smart Match Web Application</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <ContextWrapper>
            <Component {...pageProps} />
          </ContextWrapper>
        </Provider>
      </ThemeProvider>
      <ToastContainer />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
