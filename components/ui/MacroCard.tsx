import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
  icon,
}: MacroCardProps) {
  const progress = Math.min(Number(value.replace(/[^0-9.]/g, '')) / Number(goal.replace(/[^0-9.]/g, '')), 1);

  return (
    <View style={[styles.card, { borderColor: color + '30' }]}>
      <View style={[styles.iconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.goal}>goal {goal}</Text>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a3e',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    marginBottom: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#8888aa',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  goal: {
    fontSize: 12,
    color: '#555577',
    marginTop: 2,
  },
  progressBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
