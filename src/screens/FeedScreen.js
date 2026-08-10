import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';

// Placeholder data — replace with a Supabase query against your `listings` table.
const LISTINGS = [
  { id: '1', title: 'JP · 025/165 for trade', bids: 6 },
  { id: '2', title: 'EN · 151/165 open auction', bids: 3 },
  { id: '3', title: 'KR · 118/189 looking to swap', bids: 1 },
];

export default function FeedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Feed</Text>
      <FlatList
        data={LISTINGS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Listing', { id: item.id })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.bids} offers</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.ink,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  card: {
    backgroundColor: colors.paperRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTitle: { fontFamily: fonts.bodyMedium, fontSize: 15.5, color: colors.ink, marginBottom: 4 },
  cardMeta: { fontFamily: fonts.body, fontSize: 13, color: colors.inkDim },
});
