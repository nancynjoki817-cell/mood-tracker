import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const MoodButton = ({ emoji, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.moodButton} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.emojiText}>{emoji}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [moodCounts, setMoodCounts] = useState({
    happy: 0,
    sad: 0,
    tired: 0,
    excited: 0,
  });

  const moods = [
    { key: 'happy', emoji: '😊', label: 'Happy' },
    { key: 'sad', emoji: '😢', label: 'Sad' },
    { key: 'tired', emoji: '😴', label: 'Tired' },
    { key: 'excited', emoji: '🤩', label: 'Excited' },
  ];

  const handleMoodPress = (key) => {
    setMoodCounts((prevCounts) => ({
      ...prevCounts,
      [key]: prevCounts[key] + 1,
    }));
  };

  const handleReset = () => {
    setMoodCounts({
      happy: 0,
      sad: 0,
      tired: 0,
      excited: 0,
    });
  };

  const maxCount = Math.max(...Object.values(moodCounts));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121214" />

      <View>
        <Text style={styles.headerTitle}>Mood Tracker</Text>
        <Text style={styles.subTitle}>How are you feeling right now?</Text>
      </View>

      <View style={styles.buttonGrid}>
        {moods.map((item) => (
          <MoodButton
            key={item.key}
            emoji={item.emoji}
            label={item.label}
            onPress={() => handleMoodPress(item.key)}
          />
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Logged Moods</Text>

        <View style={styles.countsRow}>
          {moods.map((item) => {
            const count = moodCounts[item.key];
            const isTopMood = count > 0 && count === maxCount;

            return (
              <View
                key={item.key}
                style={[styles.countCard, isTopMood && styles.topCountCard]}
              >
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
                <Text style={[styles.countText, isTopMood && styles.topCountText]}>{count}</Text>
                {isTopMood && <Text style={styles.badgeText}>Top</Text>}
              </View>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset All Counts</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  moodButton: {
    backgroundColor: '#1e293b',
    width: '48%',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emojiText: {
    fontSize: 36,
    marginBottom: 6,
  },
  labelText: {
    color: '#f0f4f8',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  sectionTitle: {
    color: '#f0f4f8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  countsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countCard: {
    backgroundColor: '#27272a',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '22%',
  },
  topCountCard: {
    backgroundColor: '#059669',
    borderColor: '#10b981',
    borderWidth: 1.5,
    transform: [{ scale: 1.05 }],
  },
  cardEmoji: {
    fontSize: 20,
  },
  countText: {
    color: '#f0f4f8',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  topCountText: {
    color: '#ffffff',
    fontSize: 22,
  },
  badgeText: {
    color: '#a7f3d0',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  resetButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});