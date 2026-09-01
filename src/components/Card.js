import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, radii } from '../theme';

export default function Card({ children, onPress, style, padded = true }) {
  const { colors } = useTheme();

  const content = (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.paperRaised, borderColor: colors.line },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radii.md,
  },
  padded: {
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
});
