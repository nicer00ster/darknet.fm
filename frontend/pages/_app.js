import App, { Container } from 'next/app';
import Layout from '../components/layout';
import fetch from 'isomorphic-unfetch';

class DNApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...this.props}/>
        </Layout>
      </Container>
    );
  }
}

export default DNApp;
