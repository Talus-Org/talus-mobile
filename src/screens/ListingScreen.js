import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts, spacing } from '../theme';

export default function ListingScreen({ route }) {
  const { id } = route.params ?? {};
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Listing {id}</Text>
      <Text style={styles.body}>
        Offer leaderboard goes here — mirror the web app's Listing page logic
        once it's wired to Supabase.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: spacing.md, paddingTop: spacing.md },
  header: { fontFamily: fonts.heading, fontSize: 22, color: colors.ink, marginBottom: spacing.sm },
  body: { fontFamily: fonts.body, fontSize: 14.5, color: colors.inkDim, lineHeight: 21 },
});
