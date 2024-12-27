export type Menu = {
  id: number;
  icon?: JSX.Element;
  title: string;
  path?: string;
  paragraph?: string;
  newTab: boolean;
  submenu?: Menu[];
};
