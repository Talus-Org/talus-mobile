import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const THEME = {
  background: '#F7F2E9',
  surface: '#FFFFFF',
  textPrimary: '#1C1B1A',
  textSecondary: '#8A8578',
  accent: '#F0B93E',
  border: '#E4DFD3',
  illustrationBg: '#FBEBC9',
};

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    if (!email.trim()) {
      setError('Enter your email first.');
      return;
    }
    setError('');
    setLoading(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({ email: email.trim() });
    setLoading(false);
    if (otpError) {
      setError(otpError.message);
      return;
    }
    navigation.navigate('VerifyCode', { email: email.trim() });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.illustrationWrap}>
        <Image
          source={require('../../assets/pokedex.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>Talus</Text>
        <Text style={styles.headline}>Trade cards,{'\n'}not just cash.</Text>

        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor={THEME.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        style={styles.sendButton}
        onPress={sendCode}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  illustrationWrap: {
    height: '42%',
    backgroundColor: THEME.illustrationBg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  illustration: {
    width: '70%',
    height: '80%',
  },
  card: {
    flex: 1,
    backgroundColor: THEME.surface,
    marginTop: -28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 6,
  },
  kicker: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 16,
    color: THEME.textPrimary,
    marginBottom: 12,
  },
  headline: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 28,
    lineHeight: 34,
    color: THEME.textPrimary,
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: THEME.textPrimary,
    backgroundColor: THEME.surface,
  },
  error: {
    color: '#C0392B',
    fontSize: 13,
    marginTop: 8,
  },
  sendButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});