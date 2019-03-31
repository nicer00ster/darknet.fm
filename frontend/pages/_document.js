import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class DNDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags
    }
  }
  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link rel="stylesheet" href="../static/fontawesome-pro-5.6.3-web/css/all.min.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
