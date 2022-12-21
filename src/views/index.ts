import AuthPage from './Auth';
import UserChangePassword from './UserChangePassword';
import ChatPage from './Chat';
import ErrorPage from './Error';
import NotFoundPage from './NotFound';
import RegistrationPage from './Registration';
import UserPage from './User';
import UserSettingsPage from './UserSettings';
import Block from '../core/Block';

type Path = string;
type Screen = typeof Block;

type ScreenMap = { [key: Path]: Screen }

export const SCREENS: ScreenMap = {
  '/': ChatPage,
  '/auth': AuthPage,
  '/not-found': NotFoundPage,
  '/error': ErrorPage, 
  '/registration': RegistrationPage,
  '/user': UserPage,
  '/user-change-password': UserChangePassword,
  '/user-settings': UserSettingsPage,
};
