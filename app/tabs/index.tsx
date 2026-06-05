import HomeHeader from '@/components/ui/HomeHeader';
import MacroGrid from '@/components/ui/MacroGrid';
import RecentMeals from '@/components/ui/RecentMeals';
import ShareButton from '@/components/ui/ShareButton';
import CopyButton from '@/components/ui/CopyButton';
import { getMeals, Meal } from '@/src/storage/meals';
import { globalStyles } from '@/src/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.title}>MacroZone</Text>
          <Text style={globalStyles.subtitle}>Track your nutrition</Text>
        </View>
        <ShareButton meals={meals} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <HomeHeader />
        <MacroGrid meals={meals} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <CopyButton meals={meals} />
          <View style={{ height: 1, flex: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
        </View>
        <RecentMeals meals={meals} onDelete={loadMeals} />
      </ScrollView>
    </View>
  );
}
