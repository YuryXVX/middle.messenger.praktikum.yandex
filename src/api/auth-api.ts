import { AuthDTO } from '../models/auth';
import * as Http from '../utils/HTTPTrasnport';



class BaseApi {
  $http: typeof Http;

  constructor() {
    this.$http = Http;
  }
}

export class AuthApi extends BaseApi {
  auth(payload: AuthDTO) {
    console.log(payload);
  }
}