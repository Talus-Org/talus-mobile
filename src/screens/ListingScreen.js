import { Text, StyleSheet } from 'react-native';
import { Screen, ScreenHeader } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';

export default function ListingScreen({ route }) {
  const { colors } = useTheme();
  const { id } = route.params ?? {};

  return (
    <Screen style={{ paddingHorizontal: spacing.md }}>
      <ScreenHeader title={`Listing ${id}`} style={{ paddingHorizontal: 0 }} />
      <Text style={[styles.body, { color: colors.inkDim }]}>
        Offer leaderboard goes here — mirror the web app's Listing page logic
        once it's wired to Supabase.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21 },
});
