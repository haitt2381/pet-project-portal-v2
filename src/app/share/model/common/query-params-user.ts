import {QueryParams} from "./query-params.model";

export class QueryParamsUser extends QueryParams{
  role: string[]
  active: boolean
  keyword: string;
}
