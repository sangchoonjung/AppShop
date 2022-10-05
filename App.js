import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'baseFont': require("./assets/font/NanumGothic-Regular.ttf")
  })
  if (!fontsLoaded) {
    return <StatusBar/>
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{fontFamily:"baseFont",fontSize:40}}>상춘Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
