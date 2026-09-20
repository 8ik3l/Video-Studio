import {LinearGradient} from 'expo-linear-gradient';
import {Pressable,StyleSheet,Text} from 'react-native';
import {GRADIENT} from '../constants/theme';
export default function GradientButton({title,onPress,icon='＋'}){return <Pressable onPress={onPress}><LinearGradient colors={GRADIENT} style={s.b}><Text style={s.i}>{icon}</Text><Text style={s.t}>{title}</Text></LinearGradient></Pressable>}
const s=StyleSheet.create({b:{height:54,borderRadius:16,alignItems:'center',justifyContent:'center',flexDirection:'row-reverse',gap:7},t:{color:'#fff',fontSize:16,fontWeight:'900'},i:{color:'#fff',fontSize:20}});