import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Screen, Input, Button, AuthShell } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
import { supabase } from '../lib/supabase';

export default function VerifyCodeScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendMsg, setResendMsg] = useState('');

  async function handleVerify() {
    setErrorMsg('');

    if (!/^\d{6}$/.test(code)) {
      setErrorMsg('Enter the 6-digit code from your email.');
      return;
    }

    setVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });
    setVerifying(false);

    if (error) {
      if (/expired|invalid/i.test(error.message)) {
        setErrorMsg('That code is incorrect or expired. Request a new one below.');
      } else if (error.status >= 500) {
        setErrorMsg('Trouble reaching the server. Try again in a moment.');
      } else {
        setErrorMsg(error.message);
      }
      return;
    }
    // On success, the onAuthStateChange listener at the app root
    // will detect the new session and switch to the main stack.
  }

  async function handleResend() {
    setErrorMsg('');
    setResendMsg('');
    setResending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setResending(false);

    if (error) {
      if (error.status === 429 || /rate limit/i.test(error.message)) {
        setErrorMsg('Too many attempts. Wait a bit before requesting another code.');
      } else {
        setErrorMsg(error.message);
      }
      return;
    }
    setResendMsg(`A new code was sent to ${email}.`);
  }

  return (
    <Screen style={styles.screen}>
      <AuthShell>
        <Text style={[styles.logo, { color: colors.ink }]}>Talus</Text>
        <Text style={[styles.headline, { color: colors.ink }]}>Enter the code{'\n'}we sent you.</Text>
        <Text style={[styles.note, { color: colors.inkDim }]}>Sent to {email}</Text>

        <Input
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={(v) => {
            setCode(v.replace(/[^\d]/g, ''));
            if (errorMsg) setErrorMsg('');
          }}
          style={styles.codeInput}
        />
        {!!errorMsg && (
          <Text style={[styles.error, { color: colors.error ?? '#B5622E' }]}>{errorMsg}</Text>
        )}
        {!!resendMsg && !errorMsg && (
          <Text style={[styles.note, { color: colors.inkDim, fontSize: 13 }]}>{resendMsg}</Text>
        )}

        <Button label="Verify" onPress={handleVerify} loading={verifying} />

        <Button
          label={resending ? 'Sending...' : "Didn't get a code? Resend"}
          variant="text"
          onPress={handleResend}
          disabled={resending}
          style={styles.resend}
        />
      </AuthShell>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 34,
    marginBottom: spacing.xs,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  codeInput: {
    letterSpacing: 4,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  resend: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
});