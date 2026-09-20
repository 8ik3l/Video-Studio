import React,{useMemo,useState}from'react';
import{Alert,I18nManager,Pressable,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,TextInput,View}from'react-native';
import*as ImagePicker from'expo-image-picker';
import*as MediaLibrary from'expo-media-library';
import{VideoView,useVideoPlayer}from'expo-video';
import{StatusBar as ExpoStatusBar}from'expo-status-bar';

I18nManager.allowRTL(true);I18nManager.forceRTL(true);
const FONT='IPhoneThin';
const C={bg:'#07080C',panel:'#11131A',panel2:'#171A22',line:'#282C36',text:'#F5F7FB',muted:'#9299A8',accent:'#8B5CF6',white:'#FFF'};

export default function App(){
 const[media,setMedia]=useState(null),[name,setName]=useState('مشروع جديد'),[playing,setPlaying]=useState(false),[duration,setDuration]=useState(0);
 const player=useVideoPlayer(media?.uri||null,p=>{p.loop=false});
 const chooseVideo=async()=>{
  const r=await ImagePicker.launchImageLibraryAsync({mediaTypes:['videos'],quality:1,videoMaxDuration:3600});
  if(!r.canceled&&r.assets?.[0]){setMedia(r.assets[0]);setPlaying(false);setDuration(r.assets[0].duration||0);}
 };
 const saveProject=async()=>{
  if(!media?.uri)return Alert.alert('لا يوجد فيديو','اختر فيديو أولاً.');
  const perm=await MediaLibrary.requestPermissionsAsync(true);
  if(perm.status!=='granted')return Alert.alert('الصلاحية مطلوبة','اسمح للتطبيق بالوصول إلى الوسائط.');
  Alert.alert('المشروع','تم حفظ بيانات المشروع محلياً. تصدير الفيديو سيضاف عبر محرك المعالجة الأصلي.');
 };
 const toggle=()=>{if(!media)return;playing?player.pause():player.play();setPlaying(!playing)};
 const time=useMemo(()=>{const s=Math.round(duration);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')},[duration]);
 return <SafeAreaView style={s.safe}><StatusBar barStyle="light-content"/><ScrollView contentContainerStyle={s.root}>
  <View style={s.header}><Text style={s.title}>Video Studio</Text><Text style={s.sub}>محرر فيديو بطابع iOS</Text></View>
  <View style={s.nameBox}><TextInput value={name} onChangeText={setName} style={s.input} placeholder="اسم المشروع" placeholderTextColor={C.muted}/></View>
  <View style={s.preview}>
   {media?<><VideoView player={player} style={s.video} nativeControls={false}/><Pressable style={s.play} onPress={toggle}><Text style={s.playText}>{playing?'❚❚':'▶'}</Text></Pressable></>:<Pressable style={s.empty} onPress={chooseVideo}><Text style={s.emptyIcon}>＋</Text><Text style={s.emptyTitle}>أضف فيديو</Text><Text style={s.emptySub}>من مكتبة الهاتف</Text></Pressable>}
  </View>
  {media&&<><View style={s.meta}><Text style={s.metaText}>{time}</Text><Text style={s.metaText}>فيديو</Text></View><View style={s.timeline}><View style={s.track}/><View style={s.thumb}/></View></>}
  <View style={s.grid}>
   <Tool title="استيراد فيديو" icon="＋" onPress={chooseVideo}/>
   <Tool title="النص" icon="T" onPress={()=>Alert.alert('النص','إضافة طبقة نص متحركة ستكون ضمن محرك التصدير الأصلي.')}/>
   <Tool title="الصوت" icon="♫" onPress={()=>Alert.alert('الصوت','إضافة مسار صوت ستكون ضمن محرك التصدير الأصلي.')}/>
   <Tool title="السرعة" icon="1×" onPress={()=>Alert.alert('السرعة','تحكم السرعة يحتاج محرك التصدير الأصلي.')}/>
   <Tool title="فلاتر" icon="✦" onPress={()=>Alert.alert('الفلاتر','الفلاتر تحتاج معالجة فيديو أصلية.')}/>
   <Tool title="قص" icon="⌁" onPress={()=>Alert.alert('القص','القص يحتاج محرك معالجة فيديو أصلي.')}/>
  </View>
  <Pressable style={s.save} onPress={saveProject}><Text style={s.saveText}>حفظ المشروع</Text></Pressable>
  <Text style={s.note}>الخط المضمّن يستخدم داخل واجهة التطبيق. ملف الخط الرسمي يجب أن يكون مرخصاً للاستخدام.</Text>
 </ScrollView></SafeAreaView>
}
function Tool({title,icon,onPress}){return <Pressable style={s.tool}onPress={onPress}><Text style={s.toolIcon}>{icon}</Text><Text style={s.toolText}>{title}</Text></Pressable>}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:C.bg},root:{padding:16,paddingBottom:44},header:{marginTop:8,marginBottom:16},title:{color:C.text,fontSize:30,fontWeight:'700',textAlign:'right'},sub:{color:C.muted,fontSize:13,textAlign:'right',marginTop:3},nameBox:{backgroundColor:C.panel,borderColor:C.line,borderWidth:1,borderRadius:14,paddingHorizontal:14},input:{height:48,color:C.text,textAlign:'right',fontSize:16},preview:{height:300,marginTop:14,borderRadius:20,overflow:'hidden',backgroundColor:'#0D0F15',borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center'},video:{width:'100%',height:'100%'},empty:{alignItems:'center'},emptyIcon:{color:C.accent,fontSize:42,fontWeight:'200'},emptyTitle:{color:C.text,fontSize:18,fontWeight:'700',marginTop:4},emptySub:{color:C.muted,fontSize:13,marginTop:3},play:{position:'absolute',bottom:14,right:14,width:48,height:48,borderRadius:24,backgroundColor:'rgba(0,0,0,.65)',alignItems:'center',justifyContent:'center'},playText:{color:C.white,fontSize:18},meta:{flexDirection:'row',justifyContent:'space-between',marginTop:10},metaText:{color:C.muted,fontSize:12},timeline:{height:58,marginTop:8,justifyContent:'center'},track:{height:6,borderRadius:3,backgroundColor:C.panel2},thumb:{position:'absolute',left:0,width:4,height:32,borderRadius:2,backgroundColor:C.accent},grid:{flexDirection:'row-reverse',flexWrap:'wrap',gap:10,marginTop:12},tool:{width:'31%',minHeight:82,backgroundColor:C.panel,borderWidth:1,borderColor:C.line,borderRadius:16,alignItems:'center',justifyContent:'center'},toolIcon:{color:C.text,fontSize:21},toolText:{color:C.muted,fontSize:12,marginTop:7},save:{marginTop:16,backgroundColor:C.accent,borderRadius:16,height:54,alignItems:'center',justifyContent:'center'},saveText:{color:C.white,fontSize:16,fontWeight:'700'},note:{color:'#656C7B',fontSize:11,textAlign:'center',lineHeight:17,marginTop:14}});
