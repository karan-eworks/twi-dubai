/** biome-ignore-all assist/source/organizeImports: <explanation> */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type NavSurface = "light" | "dark";

interface NavMenuContextValue {
  activeKey: string | null;
  surface: NavSurface;
  /** True when this panel opened while another was already open — the panel
   *  then crossfades instead of replaying its entrance. */
  switching: boolean;
  openMenu: (key: string) => void;
  closeMenu: (key: string) => void;
  toggleMenu: (key: string) => void;
  closeAll: () => void;
  keepOpen: () => void;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

/** Grace period before a panel closes, so the pointer can cross the gap
 *  between the trigger and the panel without it snapping shut. */
const CLOSE_DELAY = 160;

export function NavMenuProvider({
  children,
  surface = "light",
}: {
  children: ReactNode;
  surface?: NavSurface;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [switching, setSwitching] = useState(false);
  const activeKeyRef = useRef<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (key: string) => {
      clearCloseTimer();
      if (activeKeyRef.current === key) return;
      setSwitching(activeKeyRef.current !== null);
      activeKeyRef.current = key;
      setActiveKey(key);
    },
    [clearCloseTimer],
  );

  const closeAll = useCallback(() => {
    clearCloseTimer();
    activeKeyRef.current = null;
    setActiveKey(null);
    setSwitching(false);
  }, [clearCloseTimer]);

  const closeMenu = useCallback(
    (key: string) => {
      clearCloseTimer();
      closeTimer.current = setTimeout(() => {
        if (activeKeyRef.current === key) closeAll();
      }, CLOSE_DELAY);
    },
    [clearCloseTimer, closeAll],
  );

  const toggleMenu = useCallback(
    (key: string) => {
      if (activeKeyRef.current === key) closeAll();
      else openMenu(key);
    },
    [closeAll, openMenu],
  );

  // One Escape listener for the whole bar instead of one per dropdown.
  useEffect(() => {
    if (!activeKey) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeKey, closeAll]);

  // Navigating from inside a panel should not leave it hanging open.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const value = useMemo(
    () => ({
      activeKey,
      surface,
      switching,
      openMenu,
      closeMenu,
      toggleMenu,
      closeAll,
      keepOpen: clearCloseTimer,
    }),
    [
      activeKey,
      surface,
      switching,
      openMenu,
      closeMenu,
      toggleMenu,
      closeAll,
      clearCloseTimer,
    ],
  );

  return (
    <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
  );
}

export function useNavMenu() {
  const ctx = useContext(NavMenuContext);
  if (!ctx) throw new Error("useNavMenu must be used inside <NavMenuProvider>");
  return ctx;
}

/** Shared styling for every top-level nav item — dropdown triggers and plain
 *  links alike, so they can't drift apart again. */
export function navItemClasses(surface: NavSurface, active: boolean) {
  return [
    "motion-link relative flex min-h-10 cursor-pointer items-center justify-center gap-1.5 px-1 text-sm font-semibold no-underline transition-colors",
    "after:absolute after:inset-x-1 after:bottom-1 after:h-0.5 after:transition-opacity after:duration-200 after:content-['']",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    surface === "dark"
      ? "text-white/80 hover:text-white after:bg-cannon-400 focus-visible:outline-white"
      : "text-foreground/75 hover:text-foreground after:bg-cannon-500 focus-visible:outline-ring",
    active
      ? surface === "dark"
        ? "text-white after:opacity-100"
        : "text-foreground after:opacity-100"
      : "after:opacity-0 hover:after:opacity-100",
  ].join(" ");
}
