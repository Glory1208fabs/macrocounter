import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/src/styles/global';

const ONBOARDING_KEY = 'onboarding_complete';

export default function Index() {
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (value === 'true') {
        router.replace('/tabs');
      } else {
        router.replace('/onboarding' as any);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size='large' color={colors.primary} />
    </View>
  );
}
