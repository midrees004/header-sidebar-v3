import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  hydrate: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = 'app_theme_v1';

/**
 * Premium theme store with 100% reliable light/dark mode toggle
 * - Persists to localStorage
 * - Updates document.documentElement classList
 * - Triggers full re-renders on toggle
 * - Works with Tailwind dark mode class strategy
 */
export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',

  setTheme: (newTheme: Theme) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Update classList
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, newTheme);

    // Update store state
    set({ theme: newTheme });

    // Dispatch custom event for external listeners
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },

  hydrate: () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored ?? (systemPrefersDark ? 'dark' : 'light');

    // Apply theme immediately to avoid flash
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    set({ theme });
  },
}));
