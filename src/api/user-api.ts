import BaseApi from './base-api';

const PREFIX = 'usesr';

export default class UserApi extends BaseApi {
  constructor() {
    super(PREFIX);    
  }

  public updateProfile(data: any) {
    return this.put('/profile', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }   
}