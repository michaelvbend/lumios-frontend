import axios from 'axios';

import { LOGIN_API_URL_LOCAL, LOGIN_API_URL_PROD } from './LoginService.constants';
import { LoginRequest } from '../LoginForm.interface';

export default function login(loginRequest: LoginRequest) {
  return axios.post(LOGIN_API_URL_PROD, loginRequest, { timeout: 5000 });
}
