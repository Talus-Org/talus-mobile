import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSignIn() {
    if (!email) return;
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) {
      Alert.alert('Something went wrong', error.message);
      return;
    }
    setSent(true);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>Talus</Text>
      <Text style={styles.headline}>Trade cards,{'\n'}not just cash.</Text>

      {sent ? (
        <Text style={styles.note}>Check {email} for a sign-in link.</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="you@email.com"
            placeholderTextColor={colors.inkDim}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable style={styles.button} onPress={handleSignIn} disabled={sending}>
            {sending ? (
              <ActivityIndicator color={colors.paperRaised} />
            ) : (
              <Text style={styles.buttonText}>Send magic link</Text>
            )}
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.ink,
    marginBottom: spacing.xl,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    color: colors.ink,
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: colors.paperRaised,
    borderRadius: radii.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.clay,
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.paperRaised,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkDim,
  },
});
