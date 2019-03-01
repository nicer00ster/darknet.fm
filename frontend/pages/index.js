import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
    <h1>DARKNET.FM</h1>

)

// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//
//   console.log(`Show data fetched. Count: ${data.length}`)
//
//   return {
//     shows: data
//   }
// }

export default Index
