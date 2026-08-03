import { getLayoutMenus } from "@/data/api/menus";
import { Navbar } from "./navbar";

export async function Header() {
  const { primaryNavigation } = await getLayoutMenus();

  return (
    <Navbar
        primaryNavigation={primaryNavigation}
    />
  );
}
