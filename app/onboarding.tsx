import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '@/src/styles/global';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'analytics',
    title: 'Track Your Macros',
    description: 'Log your meals and track calories, protein, carbs, and fat all in one place.',
    color: '#6c5ce7',
  },
  {
    icon: 'restaurant',
    title: 'Log Meals Instantly',
    description: 'Quickly add meals with macros. Your data is saved locally on your device.',
    color: '#00cec9',
  },
  {
    icon: 'stats-chart',
    title: 'See Your Progress',
    description: 'View daily breakdowns, recent meals, and share your progress with friends.',
    color: '#fd79a8',
  },
];

const ONBOARDING_KEY = 'onboarding_complete';

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/tabs');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={60} color={item.color} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === currentIndex ? colors.primary : 'rgba(255,255,255,0.15)' },
              ]}
            />
          ))}
        </View>

        {currentIndex < slides.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextText}>Next</Text>
            <Ionicons name='arrow-forward' size={20} color={colors.background} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleGetStarted} activeOpacity={0.8}>
            <Text style={styles.nextText}>Get Started</Text>
            <Ionicons name='checkmark' size={20} color={colors.background} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  nextText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
});
