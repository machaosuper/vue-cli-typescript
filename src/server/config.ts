import Common from './common'

export interface IConfigAdapter {
  readonly env: string
  readonly apiOrigin: string
  readonly protocol: string
  readonly successCode: string
  readonly version: string
  readonly origin: string
}
declare const API_ENV: string
declare const API_ORIGIN: string
declare const VERSION: string
console.log(API_ORIGIN)
export const serverConfig: IConfigAdapter = {
  apiOrigin: API_ORIGIN,
  env: Common.getEnv(),
  protocol: window.location.protocol,
  successCode: '000000',
  version: VERSION,
  origin: 'h5'
}
