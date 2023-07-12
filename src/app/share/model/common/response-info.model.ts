export class ResponseInfo {
  page: any
  size: any
  total: any
  errors: Error[]
  paginationInfo = [];
}
export interface Error {
  code: string
  message: string
}
