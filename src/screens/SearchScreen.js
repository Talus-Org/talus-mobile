import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by card, artist, or set"
        placeholderTextColor={colors.inkDim}
      />
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Filter chips (type, artist, set, language) go here — wire to your
          card database once it's connected.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: spacing.md },
  header: { fontFamily: fonts.heading, fontSize: 24, color: colors.ink, paddingVertical: spacing.md },
  input: {
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: colors.paperRaised,
    borderRadius: radii.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  placeholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lineStrong,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 13.5, color: colors.inkDim, lineHeight: 19 },
});
