import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkThemeColors, lightThemeColors, glassOverlay } from './palettes';

const STORAGE_KEY = 'talus-color-scheme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [scheme, setSchemeState] = useState(systemScheme ?? 'dark');
  const [ready, setReady] = useState(false);

  // Load a previously saved preference, if the user has toggled before.
  // Falls back to the system's current light/dark setting otherwise.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') {
        setSchemeState(saved);
      }
      setReady(true);
    });
  }, []);

  function setScheme(next) {
    setSchemeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next);
  }

  function toggleScheme() {
    setScheme(scheme === 'dark' ? 'light' : 'dark');
  }

  const colors = scheme === 'dark' ? darkThemeColors : lightThemeColors;
  const overlay = glassOverlay[scheme];

  // Avoid a flash of the wrong theme while AsyncStorage loads.
  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ scheme, colors, overlay, setScheme, toggleScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
