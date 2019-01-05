import { ServerResponse } from 'http'

export default (res: ServerResponse | undefined, statusCode: number) => {
  if (res) {
    res.statusCode = statusCode
  }
}
