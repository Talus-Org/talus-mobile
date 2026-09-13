import { Text, FlatList } from 'react-native';
import { Screen, ScreenHeader, Card } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
 
// Placeholder data — replace with a real query against a `sets` reference
// table (all official sets across supported TCGs, not the user's own
// collection — that's what the Collection tab is for).
const SETS = [
  { id: '1', name: 'Triplet Beat', meta: '2024 · 197 cards' },
  { id: '2', name: 'Classic Collection', meta: '2023 · 88 cards' },
  { id: '3', name: 'Dragon Frontiers', meta: '2006 · 101 cards' },
];
 
export default function ArchiveScreen() {
  const { colors } = useTheme();
 
  return (
    <Screen>
      <ScreenHeader title="Archive" subtitle="All sets" />
      <FlatList
        data={SETS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: 120, gap: spacing.sm }}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 15.5, color: colors.ink, marginBottom: 4 }}>
              {item.name}
            </Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.inkDim }}>
              {item.meta}
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
}