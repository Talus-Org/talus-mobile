import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Showcase binder + trust score go here.
        </Text>
      </View>
      <Pressable style={styles.signOut} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: spacing.md },
  header: { fontFamily: fonts.heading, fontSize: 24, color: colors.ink, paddingVertical: spacing.md },
  placeholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lineStrong,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  placeholderText: { fontFamily: fonts.body, fontSize: 13.5, color: colors.inkDim },
  signOut: { paddingVertical: 12, alignItems: 'flex-start' },
  signOutText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.clay },
});
