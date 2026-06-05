import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/styles/global';

export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.greetingRow}>
        <View style={styles.avatar}>
          <Ionicons name='person' size={20} color={colors.primaryLight} />
        </View>
        <View style={styles.greetingContent}>
          <Text style={styles.greeting}>Good afternoon</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  greetingContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  date: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
});
