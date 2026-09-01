import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing, radii } from '../theme';

export default function Button({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) {
  const { colors } = useTheme();
  const isText = variant === 'text';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        isText
          ? styles.textButton
          : [styles.button, { backgroundColor: colors.clay }],
        pressed && !isText && { backgroundColor: colors.clayBright },
        (disabled || loading) && !isText && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isText ? colors.clay : colors.paperRaised} />
      ) : (
        <Text style={isText ? [styles.textLabel, { color: colors.clay }] : [styles.label, { color: colors.paperRaised }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
  },
  textButton: {
    paddingVertical: spacing.xs,
    alignItems: 'flex-start',
  },
  textLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
  },
});
