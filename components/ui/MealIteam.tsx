import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteMeal } from '@/src/storage/meals';
import { colors } from '@/src/styles/global';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
};

const foodIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  chicken: 'fast-food',
  rice: 'fast-food',
  salad: 'leaf',
  egg: 'egg',
  bread: 'fast-food',
  milk: 'water',
  fish: 'fish',
  apple: 'nutrition',
  banana: 'nutrition',
  pasta: 'fast-food',
  pizza: 'pizza',
  burger: 'fast-food',
  coffee: 'cafe',
  tea: 'cafe',
  juice: 'water',
  smoothie: 'cafe',
};

function getIcon(name: string): keyof typeof Ionicons.glyphMap {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(foodIcons)) {
    if (lower.includes(key)) return icon;
  }
  return 'restaurant';
}

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) {
  const handleLongPress = () => {
    Alert.alert('Delete Meal', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMeal(id);
          onDelete();
        },
      },
    ]);
  };

  const icon = getIcon(name);

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={colors.primaryLight} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.macros}>
          {calories} cal
        </Text>
      </View>
      <View style={styles.macroBadges}>
        <View style={[styles.badge, { backgroundColor: '#4ecdc420' }]}>
          <Text style={[styles.badgeText, { color: '#4ecdc4' }]}>{protein}P</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#ffd93d20' }]}>
          <Text style={[styles.badgeText, { color: '#ffd93d' }]}>{carbs}C</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#6bcb7720' }]}>
          <Text style={[styles.badgeText, { color: '#6bcb77' }]}>{fat}F</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  macroBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
