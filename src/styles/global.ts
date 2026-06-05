import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0f0f23',
  surface: '#1a1a3e',
  surfaceLight: '#242450',
  card: '#1e1e45',
  primary: '#6c5ce7',
  primaryLight: '#a29bfe',
  secondary: '#00cec9',
  accent: '#fd79a8',
  text: '#ffffff',
  textSecondary: '#8888aa',
  textMuted: '#555577',
  alert: '#ff5252',
  success: '#00b894',
  warning: '#fdcb6e',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
});
