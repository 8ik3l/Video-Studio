import {Tabs} from 'expo-router';import {Ionicons} from '@expo/vector-icons';import {C} from '../constants/theme';
export default function BottomTabs(){return <Tabs screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'#0B1016',borderTopColor:'#202936',height:72,paddingBottom:9,paddingTop:7},tabBarActiveTintColor:C.purple,tabBarInactiveTintColor:'#697585',tabBarLabelStyle:{fontSize:10,fontWeight:'800'}}}>
<Tabs.Screen name="index" options={{title:'الرئيسية',tabBarIcon:({color})=><Ionicons name="home" size={21} color={color}/>}}/>
<Tabs.Screen name="projects" options={{title:'المشاريع',tabBarIcon:({color})=><Ionicons name="folder-open" size={21} color={color}/>}}/>
<Tabs.Screen name="settings" options={{title:'الإعدادات',tabBarIcon:({color})=><Ionicons name="settings" size={21} color={color}/>}}/>
</Tabs>}