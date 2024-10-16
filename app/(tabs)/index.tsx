import { Image, StyleSheet, Platform, View, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';


export default function HomeScreen() {
  const [username, setUserName] = useState('');



  return (
    <View>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Strictly Platonic</ThemedText>
       </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
