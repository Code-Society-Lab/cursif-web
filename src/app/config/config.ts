export default class Config {
  public static readonly API = {
    url: process.env.REACT_API_URL || 'http://localhost:4000/default'
  }
}