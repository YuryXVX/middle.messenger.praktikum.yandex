import { Avatar } from './avatar';
import { AvatarEdit } from './avatar-edit';
import { BackToView } from './back-to-view-panel';
import { Button } from './button/button';
import { Input } from './input/input';
import { Link } from './link';
import { ListItem } from './list-item';

export const ComponentsMap = {
  'button': Button,
  'input': Input,
  'link': Link,
  'avatar': Avatar,
  'list-item': ListItem,
  'back-to-button': BackToView,
  'avatar-edit': AvatarEdit,
}