import { SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Screen({ children, style }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.paper }, style]}>
      {children}
    </SafeAreaView>
  );
}
