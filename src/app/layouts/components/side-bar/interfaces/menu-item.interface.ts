import { MenuCategory } from '../../../../shared/enums/menu-category.enum';

export interface MenuItem {
  label: string;
  icon: string;
  link: string;
  selected?: boolean;
}

export interface MenuGroup {
  category: MenuCategory;
  categoryLabel: string;
  items: MenuItem[];
}
