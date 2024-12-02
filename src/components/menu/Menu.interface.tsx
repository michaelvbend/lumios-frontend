import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

export const menuItems: MenuItemProps[] = [
  {
    id: 'lees-profiel',
    title: 'Leesmatch',
    navigateTo: '',
    color: colors.PRIMARY_COLOR_GREEN_DARK,
  },
  {
    id: 'swipe',
    title: 'Swipe',
    navigateTo: 'SwipeScreen',
    color: colors.PRIMARY_COLOR_GREEN_LIGHT,
  },
  {
    id: 'achievements',
    title: 'Prestaties',
    navigateTo: '',
    color: colors.PRIMARY_COLOR_GREEN_ULTRA_LIGHT,
  },
];

export interface MenuItemProps {
  id: string;
  title: string;
  navigateTo: 'MatchScreen' | 'SwipeScreen' | 'AchievementScreen';
  color: string;
}

export const images: { [key: string]: any } = {
  'lees-profiel': require('./../../../assets/lees-profiel-icon.png'),
  swipe: require('./../../../assets/swipe-icon.png'),
  achievements: require('./../../../assets/badge-icon.png'),
};
