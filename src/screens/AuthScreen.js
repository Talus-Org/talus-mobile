import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
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
  waveBack: '#FBE7B8',
  waveFront: '#F0C86B',
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const WAVE_HEIGHT = 150;
const WAVE_BACK_PATH = `M0,80 C${SCREEN_WIDTH * 0.25},40 ${SCREEN_WIDTH * 0.75},120 ${SCREEN_WIDTH},80 L${SCREEN_WIDTH},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;
const WAVE_FRONT_PATH = `M0,110 C${SCREEN_WIDTH * 0.3},70 ${SCREEN_WIDTH * 0.7},150 ${SCREEN_WIDTH},100 L${SCREEN_WIDTH},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;

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

      <Svg
        style={styles.waveSvg}
        width={SCREEN_WIDTH}
        height={WAVE_HEIGHT}
        viewBox={`0 0 ${SCREEN_WIDTH} ${WAVE_HEIGHT}`}
      >
        <Path d={WAVE_BACK_PATH} fill={THEME.waveBack} />
        <Path d={WAVE_FRONT_PATH} fill={THEME.waveFront} />
      </Svg>

      <View style={styles.centerLayer} pointerEvents="box-none">
        <View style={styles.cardWrapper}>
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  illustrationWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '38%',
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
  waveSvg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  centerLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
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
    bottom: -28,
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