import { useState } from 'react';
import { Text, Alert, StyleSheet } from 'react-native';
import { Screen, Input, Button } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { fonts, spacing } from '../theme';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSignIn() {
    if (!email) return;
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) {
      Alert.alert('Something went wrong', error.message);
      return;
    }
    navigation.navigate('VerifyCode', { email });
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
        onChangeText={setEmail}
      />
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
});
