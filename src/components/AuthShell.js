import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Card from './Card';
import { useTheme } from '../theme/ThemeContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const WAVE_HEIGHT = 150;
const WAVE_BACK_PATH = `M0,80 C${SCREEN_WIDTH * 0.25},40 ${SCREEN_WIDTH * 0.75},120 ${SCREEN_WIDTH},80 L${SCREEN_WIDTH},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;
const WAVE_FRONT_PATH = `M0,110 C${SCREEN_WIDTH * 0.3},70 ${SCREEN_WIDTH * 0.7},150 ${SCREEN_WIDTH},100 L${SCREEN_WIDTH},${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function AuthShell({ children }) {
  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      <View style={[styles.illustrationWrap, { backgroundColor: hexToRgba(colors.clay, 0.15) }]}>
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
        <Path d={WAVE_BACK_PATH} fill={hexToRgba(colors.clay, 0.35)} />
        <Path d={WAVE_FRONT_PATH} fill={colors.clay} />
      </Svg>

      <View style={styles.centerLayer} pointerEvents="box-none">
        <Card style={styles.card}>{children}</Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  illustrationWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '38%',
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
  card: {
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  // Card's own padded style sets a flat `padding`; the specific
  // paddingTop/Horizontal/Bottom above override each side of it.
});