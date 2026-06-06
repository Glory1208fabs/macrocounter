import MealItem from '@/components//ui/MealIteam';
import { clearAllMeals, getMeals, Meal } from '@/src/storage/meals';
import { colors, globalStyles } from '@/src/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const handleClearAll = async () => {
    Alert.alert('Clear All Meals', 'This will delete all your logged meals. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          await clearAllMeals();
          loadMeals();
        },
      },
    ]);
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
          <Text style={globalStyles.title}>All Meals</Text>
          <Text style={globalStyles.subtitle}>{meals.length} meal{meals.length !== 1 ? 's' : ''} logged</Text>
        </View>
        {meals.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton} activeOpacity={0.7}>
            <Ionicons name='trash-outline' size={16} color={colors.alert} />
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ marginTop: 24, paddingBottom: 40 }}>
          {meals.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name='restaurant-outline' size={48} color={colors.textMuted} />
              <Text style={globalStyles.empty}>No meals logged yet.</Text>
              <Text style={styles.emptySub}>Tap the Add Meal tab to get started!</Text>
            </View>
          ) : (
            meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                calories={meal.calories}
                protein={meal.protein}
                carbs={meal.carbs}
                fat={meal.fat}
                imageUri={meal.imageUri}
                onDelete={loadMeals}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  clearButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: 'rgba(255,82,82,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  clearText: {
    color: colors.alert,
    fontSize: 13,
    fontWeight: '600' as const,
  },
  empty: {
    alignItems: 'center' as const,
    paddingVertical: 60,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  emptySub: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 6,
  },
};
