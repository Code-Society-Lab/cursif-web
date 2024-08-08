const Config = {
  environment: process.env.NODE_ENV,
  
  development: () => Config.environment === 'development',

  production: () => Config.environment === 'production',
  
  test: () => Config.environment === 'test',

  homeserver: {
    domain: process.env.CURSIF_HOMESERVER_DOMAIN || 'localhost:4000',
    ssl: process.env.CURSIF_HOMESERVER_SSL,

    http_endpoint: null,
    websocket_endpoint: null,
    subscription_endpoint: null,
  },
}

function _build_endpoint(protocol, path) {
  if (Config.production() || Config.homeserver.ssl) {
    return `${protocol}s://${Config.homeserver.domain}/${path}`;
  }

  return `${protocol}://${Config.homeserver.domain}/${path}`;
}

Config.homeserver.http_endpoint = _build_endpoint('http', 'api');
Config.homeserver.websocket_endpoint = _build_endpoint('ws', 'socket');
Config.homeserver.subscription_endpoint = _build_endpoint('ws', 'subscriptions');


export default Config;