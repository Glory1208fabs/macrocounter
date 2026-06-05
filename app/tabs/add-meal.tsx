import { addMeal } from '@/src/storage/meals';
import { colors, globalStyles } from '@/src/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function AddMealScreen() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const handleAddMeal = async () => {
    if (!name || !calories) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Please enter a meal name and calories.');
      return;
    }

    await addMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');

    Alert.alert('Success', 'Meal added successfully!', [
      { text: 'View Meals', onPress: () => router.push('/tabs/meals') },
      { text: 'Add Another', style: 'cancel' },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <View style={globalStyles.header}>
          <View>
            <Text style={globalStyles.title}>Add Meal</Text>
            <Text style={globalStyles.subtitle}>Log what you ate today</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name='restaurant' size={28} color={colors.primary} />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Meal Details</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Ionicons name='pizza-outline' size={18} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder='Meal name'
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Ionicons name='flame-outline' size={18} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder='Calories'
              placeholderTextColor={colors.textMuted}
              keyboardType='numeric'
              value={calories}
              onChangeText={setCalories}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Macros (optional)</Text>
          <View style={styles.macroRow}>
            <View style={[styles.inputGroup, styles.macroInput]}>
              <View style={[styles.inputIcon, { backgroundColor: '#4ecdc420' }]}>
                <Ionicons name='fitness-outline' size={16} color='#4ecdc4' />
              </View>
              <TextInput
                style={styles.input}
                placeholder='Protein'
                placeholderTextColor={colors.textMuted}
                keyboardType='numeric'
                value={protein}
                onChangeText={setProtein}
              />
              <Text style={styles.unit}>g</Text>
            </View>

            <View style={[styles.inputGroup, styles.macroInput]}>
              <View style={[styles.inputIcon, { backgroundColor: '#ffd93d20' }]}>
                <Ionicons name='leaf-outline' size={16} color='#ffd93d' />
              </View>
              <TextInput
                style={styles.input}
                placeholder='Carbs'
                placeholderTextColor={colors.textMuted}
                keyboardType='numeric'
                value={carbs}
                onChangeText={setCarbs}
              />
              <Text style={styles.unit}>g</Text>
            </View>

            <View style={[styles.inputGroup, styles.macroInput]}>
              <View style={[styles.inputIcon, { backgroundColor: '#6bcb7720' }]}>
                <Ionicons name='water-outline' size={16} color='#6bcb77' />
              </View>
              <TextInput
                style={styles.input}
                placeholder='Fat'
                placeholderTextColor={colors.textMuted}
                keyboardType='numeric'
                value={fat}
                onChangeText={setFat}
              />
              <Text style={styles.unit}>g</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddMeal} activeOpacity={0.8}>
          <Ionicons name='add-circle-outline' size={20} color={colors.background} />
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  formSection: {
    marginTop: 28,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  inputIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLight,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: 12,
    fontSize: 15,
    height: 44,
  },
  unit: {
    color: colors.textMuted,
    fontSize: 13,
    paddingRight: 12,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },
  macroInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
});
