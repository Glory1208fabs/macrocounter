import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/src/storage/meals';
import MacroCard from './MacroCard';
import { colors } from '@/src/styles/global';

type MacroGridProps = {
  meals: Meal[];
};

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Meals</Text>
          <Text style={styles.summaryValue}>{meals.length}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Avg Calories</Text>
          <Text style={styles.summaryValue}>
            {meals.length > 0 ? Math.round(totals.calories / meals.length) : 0}
          </Text>
        </View>
      </View>
      <Text style={styles.sectionLabel}>Daily Breakdown</Text>
      <View style={styles.grid}>
        <MacroCard
          label='Calories'
          value={`${totals.calories}`}
          goal='2000'
          color='#ff6b6b'
          icon='flame'
        />
        <MacroCard
          label='Protein'
          value={`${totals.protein}g`}
          goal='150g'
          color='#4ecdc4'
          icon='fitness'
        />
        <MacroCard
          label='Carbs'
          value={`${totals.carbs}g`}
          goal='250g'
          color='#ffd93d'
          icon='leaf'
        />
        <MacroCard
          label='Fat'
          value={`${totals.fat}g`}
          goal='65g'
          color='#6bcb77'
          icon='water'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1a1a3e',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 4,
  },
});
