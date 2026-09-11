import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Screen, Input, Button } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
import { supabase } from '../lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSignIn() {
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Enter your email to continue.');
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setErrorMsg('That email doesn\'t look right.');
      return;
    }

    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim() });
    setSending(false);

    if (error) {
      if (error.status === 429 || /rate limit/i.test(error.message)) {
        setErrorMsg('Too many attempts. Wait a bit before requesting another code.');
      } else if (error.status >= 500) {
        setErrorMsg('Trouble reaching the server. Try again in a moment.');
      } else {
        setErrorMsg(error.message);
      }
      return;
    }

    navigation.navigate('VerifyCode', { email: email.trim() });
  }

  return (
    <Screen style={styles.screen}>
      <Text style={[styles.logo, { color: colors.ink }]}>Talus</Text>
      <Text style={[styles.headline, { color: colors.ink }]}>Trade cards,{'\n'}not just cash.</Text>

      <Input
        placeholder="you@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          if (errorMsg) setErrorMsg('');
        }}
      />
      {!!errorMsg && (
        <Text style={[styles.error, { color: colors.error ?? '#B5622E' }]}>{errorMsg}</Text>
      )}

      <Button label="Send code" onPress={handleSignIn} loading={sending} />
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
    marginBottom: spacing.lg,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 13,
    marginTop: spacing.xs ?? 6,
    marginBottom: spacing.sm ?? 12,
  },
});