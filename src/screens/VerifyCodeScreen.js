import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
import { supabase } from '../lib/supabase';

export default function VerifyCodeScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleVerify() {
    if (!code) return;
    setVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });
    setVerifying(false);
    if (error) {
      Alert.alert('Invalid code', error.message);
      return;
    }
    // On success, the onAuthStateChange listener at the app root
    // will detect the new session and switch to the main stack.
  }

  async function handleResend() {
    setResending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setResending(false);
    if (error) {
      Alert.alert('Something went wrong', error.message);
      return;
    }
    Alert.alert('Code sent', `A new code was sent to ${email}.`);
  }

  return (
    <Screen style={styles.screen}>
      <Text style={[styles.logo, { color: colors.ink }]}>Talus</Text>
      <Text style={[styles.headline, { color: colors.ink }]}>Enter the code{'\n'}we sent you.</Text>
      <Text style={[styles.note, { color: colors.inkDim }]}>Sent to {email}</Text>

      <Input
        placeholder="123456"
        keyboardType="number-pad"
        maxLength={8}
        value={code}
        onChangeText={setCode}
        style={{ letterSpacing: 4 }}
      />

      <Button label="Verify" onPress={handleVerify} loading={verifying} />

      <Button
        label={resending ? 'Sending...' : "Didn't get a code? Resend"}
        variant="text"
        onPress={handleResend}
        disabled={resending}
        style={styles.resend}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: 22,
    marginBottom: spacing.xl,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 15,
    marginBottom: spacing.lg,
  },
  resend: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
});