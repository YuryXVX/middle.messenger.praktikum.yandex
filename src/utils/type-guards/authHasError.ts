import { ErrorRequest } from '../../models/auth';

export function authHasError(response: any): response is ErrorRequest {
  return response && response.reason;
}