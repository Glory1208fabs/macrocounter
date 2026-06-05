import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/src/storage/meals';
import MealItem from './MealIteam';
import { colors } from '@/src/styles/global';

type RecentMealsProps = {
  meals: Meal[];
  onDelete: () => void;
};

export default function RecentMeals({ meals, onDelete }: RecentMealsProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name='time-outline' size={18} color={colors.textSecondary} />
        <Text style={styles.sectionTitle}>Recent Meals</Text>
        <Text style={styles.count}>{meals.length > 5 ? '5 latest' : `${meals.length} total`}</Text>
      </View>
      {meals.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name='restaurant-outline' size={40} color={colors.textMuted} />
          <Text style={styles.emptyText}>No meals logged yet.</Text>
        </View>
      ) : (
        meals.slice(0, 5).map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            calories={meal.calories}
            protein={meal.protein}
            carbs={meal.carbs}
            fat={meal.fat}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  count: {
    fontSize: 12,
    color: colors.textMuted,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },
});
