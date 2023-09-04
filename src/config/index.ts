const Config = {
  environment: process.env.NODE_ENV,
  
  development: () => {
    return Config.environment === 'development';
  },
  production: () => {
    return Config.environment === 'production';
  },
  test: () => {
    return Config.environment === 'test';
  },

  graphql: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/api'
  }
}

export default Config;