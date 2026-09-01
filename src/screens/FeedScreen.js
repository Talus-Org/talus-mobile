import { Text, FlatList } from 'react-native';
import { Screen, ScreenHeader, Card } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';

const LISTINGS = [
  { id: '1', title: 'JP · 025/165 for trade', bids: 6 },
  { id: '2', title: 'EN · 151/165 open auction', bids: 3 },
  { id: '3', title: 'KR · 118/189 looking to swap', bids: 1 },
];

export default function FeedScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <Screen>
      <ScreenHeader title="Feed" />
      <FlatList
        data={LISTINGS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: 120, gap: spacing.sm }}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Listing', { id: item.id })}>
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 15.5, color: colors.ink, marginBottom: 4 }}>
              {item.title}
            </Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.inkDim }}>
              {item.bids} offers
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
}

