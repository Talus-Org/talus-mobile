import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';

export default function ScreenHeader({ title, subtitle, style }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.title, { color: colors.ink }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.inkDim }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 4,
  },
});
