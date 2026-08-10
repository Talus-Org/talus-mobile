import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';

const { width } = Dimensions.get('window');
const PADDING = spacing.md;
const GAP = 8;
const COLS = 3;
const POCKET_SIZE = (width - PADDING * 2 - GAP * (COLS - 1)) / COLS;

// Placeholder pockets — replace with a Supabase query against your `cards` table.
const POCKETS = Array.from({ length: 9 }, (_, i) => ({ id: String(i) }));

export default function CollectionScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Collection</Text>
      <Text style={styles.subhead}>Binder — Page 01</Text>
      <FlatList
        data={POCKETS}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        contentContainerStyle={{ paddingHorizontal: PADDING }}
        columnWrapperStyle={{ gap: GAP, marginBottom: GAP }}
        renderItem={() => <View style={[styles.pocket, { width: POCKET_SIZE, height: POCKET_SIZE * 1.4 }]} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: { fontFamily: fonts.heading, fontSize: 24, color: colors.ink, paddingHorizontal: spacing.md, paddingTop: spacing.md },
  subhead: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkDim,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  pocket: {
    backgroundColor: colors.paperRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.sm,
  },
});
