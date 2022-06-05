import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './App.scss';

export default function App() {
  console.log({styles});
  return (
    <View style={styles.container}>
      <Text>Progress 1/500  1. Milijon</Text>
      <StatusBar style="auto" />
    </View>
  );
}