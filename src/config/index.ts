const Config = {
  environment: process.env.NODE_ENV,
  
  development: () => Config.environment === 'development',

  production: () => Config.environment === 'production',
  
  test: () => Config.environment === 'test',

  graphql: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/api'
  }
}

export default Config;