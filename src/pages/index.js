import AuthPage from './Auth';
import ChangePasswordPage from './ChangePassword';
import ChatPage from './Chat';
import ErrorPage from './Error';
import NotFoundPage from './NotFound';
import RegistrationPage from './Registration';
import UserPage from './User';
import UserSettingsPage from './UserSettings';


export const PAGES = {
  '/': ChatPage,
  '/auth': AuthPage,
  '/not-found': NotFoundPage,
  '/error': ErrorPage, 
  '/registration': RegistrationPage,
  '/user': UserPage,
  '/change-password': ChangePasswordPage,
  '/user-settings': UserSettingsPage,
};