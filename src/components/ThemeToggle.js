import { Pressable, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { radii } from '../theme';

/**
 * Small icon button that toggles between light and dark mode.
 * Drop this anywhere — Profile screen, a settings row, a header, etc.
 */
export default function ThemeToggle({ size = 20 }) {
  const { scheme, colors, toggleScheme } = useTheme();
  const Icon = scheme === 'dark' ? Sun : Moon;

  return (
    <Pressable
      onPress={toggleScheme}
      style={[
        styles.button,
        { backgroundColor: colors.paperRaised, borderColor: colors.line },
      ]}
      accessibilityRole="button"
      accessibilityLabel={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon size={size} color={colors.ink} strokeWidth={1.8} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});