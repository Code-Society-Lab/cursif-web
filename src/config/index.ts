const Config = {
  environment: process.env.NODE_ENV,
  
  development: () => Config.environment === 'development',

  production: () => Config.environment === 'production',
  
  test: () => Config.environment === 'test',

  // hopefully remove NEXT_PUBLIC
  graphql: {
    domain: process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN,
    ssl: process.env.NEXT_PUBLIC_GRAPHQL_SSL,

    http: () => {
      if (Config.production()) {
        return `https://${Config.graphql.domain}/api`
      }

      return `http://${Config.graphql.domain}/api`
    },
    socket: () => {
      if (Config.production()) {
        return `https://${Config.graphql.domain}/api`
      }

      return `ws://${Config.graphql.domain}/socket`
    },

    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/api'
  }
}

export default Config;