// Navigation types
export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface DropdownCategory {
  category: string;
  items: DropdownItem[];
}

export interface MenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownCategory[];
}

export interface NavbarProps {
  menuItems: MenuItem[];
}
