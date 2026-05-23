import { MENU } from "@/lib/georgian-menu";

export const MENU_ITEM_COUNT = MENU.reduce((sum, cat) => sum + cat.items.length, 0);
export const MENU_CATEGORY_COUNT = MENU.length;
