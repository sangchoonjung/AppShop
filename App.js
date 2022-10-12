import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/home/homeScreen';
import ZzimScreen from './components/zzim/zzimScreen';
import LoginScreen from './components/account/login/loginScreen';
import JoinScreen from './components/account/login/joinScreen';
import MypageScreen from './components/account/mypage/mypageScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AppContext, AppContextProvider } from './context/auth';
import { useContext } from 'react';
import UpdateAccountScreen from './components/account/mypage/updateAccountScreen';
import ItemDetailScreen from './components/home/itemDetailScreen';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 세훈 안한거 (할 거)
// 시간 나면 스피너
// 정보 수정 완료시 반응
// time 타이머 수정
// pending 수정 ctx 설정 찜처럼 하면 될 듯 

function GuestStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='join' component={JoinScreen} />
    </Stack.Navigator>
  )
}

function MemberStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='mypage' component={MypageScreen} />
      <Stack.Screen name='update' component={UpdateAccountScreen} />
    </Stack.Navigator>
  )
}

function SwipeStackNavigator() {
  const ctx = useContext(AppContext);

  return (
    <>
      {ctx.auth ? <MemberStackNavigator /> : <GuestStackNavigator />}
    </>
  )
}

function MainHomeScreen() {

  return (<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='mainHome' component={HomeScreen} />
    <Stack.Screen name='detail' component={ItemDetailScreen} />
  </Stack.Navigator>
  )
}



function DefaultNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='home' component={MainHomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }} />
      <Tab.Screen name='account' component={SwipeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />
        }} />
      <Tab.Screen name='zzim' component={ZzimScreen}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="heart" size={24} color={color} />
        }} />
    </Tab.Navigator>
  )
}


export default function App() {


  const [fontsLoaded] = useFonts({
    'baseFont': require("./assets/font/NanumGothic-Regular.ttf")
  })
  if (!fontsLoaded) {
    return <StatusBar />
  }
  return (
    <>
      <StatusBar style="auto" />
      <AppContextProvider>
        <NavigationContainer>
          <DefaultNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </>
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
