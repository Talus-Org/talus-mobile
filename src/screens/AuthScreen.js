import { useState } from 'react';
import { Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Screen, Input, Button, AuthShell } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendCode() {
    if (!email.trim()) {
      setError('Enter your email first.');
      return;
    }
    setError('');

    if (__DEV__ && email.trim() === 'skip') {
      navigation.navigate('VerifyCode', { email: 'dev@talus.app' });
      return;
    }

    setLoading(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({ email: email.trim() });
    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }
    navigation.navigate('VerifyCode', { email: email.trim() });
  }

  return (
    <Screen style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AuthShell>
          <Text style={[styles.kicker, { color: colors.ink }]}>Talus</Text>
          <Text style={[styles.headline, { color: colors.ink }]}>Trade cards,{'\n'}not just cash.</Text>

          <Input
            placeholder="you@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              if (error) setError('');
            }}
          />

          {!!error && (
            <Text style={[styles.error, { color: colors.error ?? '#B5622E' }]}>{error}</Text>
          )}

          <Button
            label={loading ? 'Sending...' : 'Send code'}
            onPress={sendCode}
            loading={loading}
          />
        </AuthShell>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
  },
  flex: {
    flex: 1,
  },
  kicker: {
    fontFamily: fonts.heading,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 34,
    marginBottom: spacing.md,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
});