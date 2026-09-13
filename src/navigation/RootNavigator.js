import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import { supabase } from '../lib/supabase';
import GlassTabBar from './GlassTabBar';
 
import AuthScreen from '../screens/AuthScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListingScreen from '../screens/ListingScreen';
 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
// Order here determines left-to-right order in the tab bar.
// Note: route is named "Search" (not "Scan") to match the icon map —
// same ScanScreen.js component underneath, just registered under a
// different route name.
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <GlassTabBar {...props} />}
    >
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="Archive" component={ArchiveScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="Search" component={ScanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
 
export default function RootNavigator() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
 
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
 
    return () => listener.subscription.unsubscribe();
  }, []);
 
  if (loading) return null;
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen
              name="Listing"
              component={ListingScreen}
              options={{ headerShown: true, title: '' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
