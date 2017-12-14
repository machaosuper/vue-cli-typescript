import Common from './common'

export interface IConfigAdapter {
  readonly env: string
  readonly protocol: string
  readonly successCode: string
}

export const serverConfig: IConfigAdapter = {
  env: Common.getEnv(),
  protocol: window.location.protocol,
  successCode: '000000'
}
