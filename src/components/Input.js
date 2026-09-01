import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing, radii } from '../theme';

export default function Input({ style, ...props }) {
  const { colors } = useTheme();

  return (
    <TextInput
      placeholderTextColor={colors.inkDim}
      style={[
        styles.input,
        {
          borderColor: colors.lineStrong,
          backgroundColor: colors.paperRaised,
          color: colors.ink,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: radii.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
});
