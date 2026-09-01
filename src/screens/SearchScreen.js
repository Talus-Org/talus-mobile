import { View, Text, StyleSheet } from 'react-native';
import { Screen, ScreenHeader, Input } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing, radii } from '../theme';

export default function SearchScreen() {
  const { colors } = useTheme();

  return (
    <Screen style={{ paddingHorizontal: spacing.md }}>
      <ScreenHeader title="Search" style={{ paddingHorizontal: 0 }} />
      <Input placeholder="Search by card, artist, or set" />
      <View style={[styles.placeholder, { borderColor: colors.lineStrong }]}>
        <Text style={[styles.placeholderText, { color: colors.inkDim }]}>
          Filter chips (type, artist, set, language) go here — wire to your
          card database once it's connected.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: spacing.md,
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19 },
});
