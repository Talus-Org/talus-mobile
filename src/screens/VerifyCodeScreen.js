import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { colors, fonts, spacing, radii } from '../theme';
import { supabase } from '../lib/supabase';

export default function VerifyCodeScreen({ route, navigation }) {
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
    <View style={styles.screen}>
      <Text style={styles.logo}>Talus</Text>
      <Text style={styles.headline}>Enter the code{'\n'}we sent you.</Text>
      <Text style={styles.note}>Sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="123456"
        placeholderTextColor={colors.inkDim}
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={handleVerify} disabled={verifying}>
        {verifying ? (
          <ActivityIndicator color={colors.paperRaised} />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </Pressable>

      <Pressable onPress={handleResend} disabled={resending} style={styles.resend}>
        <Text style={styles.resendText}>
          {resending ? 'Sending...' : "Didn't get a code? Resend"}
        </Text>
      </Pressable>
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
    marginBottom: spacing.sm,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkDim,
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
    letterSpacing: 4,
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
  resend: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  resendText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkDim,
  },
});