import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Screen, ScreenHeader, Card } from '../components';
import { spacing } from '../theme';

const { width } = Dimensions.get('window');
const PADDING = spacing.md;
const GAP = 8;
const COLS = 3;
const POCKET_SIZE = (width - PADDING * 2 - GAP * (COLS - 1)) / COLS;

// Placeholder pockets — replace with a Supabase query against your `cards` table.
const POCKETS = Array.from({ length: 9 }, (_, i) => ({ id: String(i) }));

export default function CollectionScreen() {
  return (
    <Screen>
      <ScreenHeader title="Collection" subtitle="Binder — Page 01" />
      <FlatList
        data={POCKETS}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        contentContainerStyle={{ paddingHorizontal: PADDING, paddingBottom: 120 }}
        columnWrapperStyle={{ gap: GAP, marginBottom: GAP }}
        renderItem={() => (
          <Card padded={false} style={{ width: POCKET_SIZE, height: POCKET_SIZE * 1.4 }}>
            <View />
          </Card>
        )}
      />
    </Screen>
  );
}
