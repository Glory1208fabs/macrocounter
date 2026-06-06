import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteMeal } from '@/src/storage/meals';
import { colors } from '@/src/styles/global';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUri?: string;
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
  imageUri,
  onDelete,
}: MealItemProps) {
  const handleDelete = () => {
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
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={22} color={colors.primaryLight} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.caloriesRow}>
          <Ionicons name='flame-outline' size={12} color={colors.textSecondary} />
          <Text style={styles.calories}> {calories} cal</Text>
        </View>
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
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name='trash-outline' size={16} color={colors.alert} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 12,
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
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  calories: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  macroBadges: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 4,
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
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,82,82,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
