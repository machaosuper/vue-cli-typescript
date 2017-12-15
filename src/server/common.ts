declare const API_ENV: string
export default class Common {
  static getEnv (): string {
    return API_ENV
  }
}
