import App, { Container } from 'next/app';
import Layout from '../components/layout';

class DNApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Layout>
          <Component />
        </Layout>
      </Container>
    );
  }
}

export default DNApp;
