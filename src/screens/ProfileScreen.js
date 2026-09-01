import { View, Text, StyleSheet } from 'react-native';
import { Screen, ScreenHeader, Button, ThemeToggle } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing, radii } from '../theme';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <Screen style={{ paddingHorizontal: spacing.md }}>
      <View style={styles.headerRow}>
        <ScreenHeader title="Profile" style={{ paddingHorizontal: 0, paddingBottom: 0 }} />
        <ThemeToggle />
      </View>

      <Text style={[styles.placeholderText, { color: colors.inkDim, borderColor: colors.lineStrong }]}>
        Showcase binder + trust score go here.
      </Text>
      <Button
        label="Sign out"
        variant="text"
        onPress={() => supabase.auth.signOut()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
  },
  placeholderText: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
});
