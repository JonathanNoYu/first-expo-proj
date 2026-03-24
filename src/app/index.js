import { ThemedView } from '@/src/components/themed-view';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
    return (
        <ThemedView style={styles.container}>
            <ActivityIndicator size="large" color="gray" />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});