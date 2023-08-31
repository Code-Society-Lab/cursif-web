const Config = {
  graphql: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/api'
  }
}

export default Config;