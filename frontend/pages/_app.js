import App, { Container } from 'next/app';
import fetch from 'isomorphic-unfetch';
import { ApolloProvider } from 'react-apollo';

import withData from '../lib/withData';
import Layout from '../components/layout';

class DNApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Container>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </Container>
      </ApolloProvider>
    );
  }
}

export default withData(DNApp);
