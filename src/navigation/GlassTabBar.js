import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Compass, PlayingCards, BriefcaseBusiness, ScanSearch, User } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { fonts } from '../theme';
 
const ICONS = {
  Discovery: Compass,
  Archive: PlayingCards,
  Collection: BriefcaseBusiness,
  Search: ScanSearch,
  Profile: User,
};
 
const FILLABLE = new Set(['Profile']);
 
const ICON_SIZE = 20;
const CAPSULE_HEIGHT = 44;
const CAPSULE_INSET = 6; // shrinks the capsule slightly inside each tab's own width
 
export default function GlassTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { scheme, colors, overlay } = useTheme();
 
  const [tabLayouts, setTabLayouts] = useState({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    const activeRoute = state.routes[state.index];
    const layout = tabLayouts[activeRoute.key];
    if (!layout) return;
 
    Animated.spring(indicatorX, {
      toValue: layout.x + CAPSULE_INSET / 2,
      useNativeDriver: false,
      friction: 9,
      tension: 70,
    }).start();
    Animated.spring(indicatorWidth, {
      toValue: layout.width - CAPSULE_INSET,
      useNativeDriver: false,
      friction: 9,
      tension: 70,
    }).start();
  }, [state.index, tabLayouts]);
 
  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: insets.bottom || 12, borderColor: colors.lineStrong },
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'android' ? 95 : 65}
        tint={scheme === 'dark' ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: overlay }]} />
 
      <LinearGradient
        colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
 
      <View style={styles.row}>
        {/* Sized to each tab's own width (icon + label), vertically
            centered in the row, with its own frosted blur layer. */}
        {Object.keys(tabLayouts).length === state.routes.length && (
          <Animated.View
            style={[
              styles.capsule,
              { width: indicatorWidth, transform: [{ translateX: indicatorX }] },
            ]}
            pointerEvents="none"
          >
            <BlurView
              intensity={Platform.OS === 'android' ? 80 : 50}
              tint={scheme === 'dark' ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: 'rgba(244, 196, 48, 0.20)' },
              ]}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  borderRadius: CAPSULE_HEIGHT / 2,
                  borderWidth: 1,
                  borderColor: 'rgba(244, 196, 48, 0.35)',
                },
              ]}
            />
          </Animated.View>
        )}
 
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const Icon = ICONS[route.name] ?? Compass;
          const tintColor = isFocused ? colors.clay : colors.inkDim;
          const canFill = FILLABLE.has(route.name);
 
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
 
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                setTabLayouts((prev) => ({ ...prev, [route.key]: { x, width } }));
              }}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
            >
              <Icon
                size={ICON_SIZE}
                color={tintColor}
                fill={isFocused && canFill ? colors.clay : 'none'}
                strokeWidth={isFocused ? 2.2 : 1.7}
              />
              <Text
                style={[styles.label, { color: tintColor }, isFocused && styles.labelActive]}
                numberOfLines={1}
              >
                {route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    zIndex: 1,
  },
  capsule: {
     position: 'absolute',
    height: CAPSULE_HEIGHT,
    borderRadius: CAPSULE_HEIGHT / 2,
    overflow: 'hidden',
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 9.5,
  },
  labelActive: {
    fontFamily: fonts.bodyMedium,
  },
});
