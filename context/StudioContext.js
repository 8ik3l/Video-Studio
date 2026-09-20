import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const empty=()=>({id:String(Date.now()),name:'مشروع جديد',media:[],createdAt:Date.now(),duration:32});
const Ctx=createContext(null);
export function StudioProvider({children}){
 const [project,setProject]=useState(empty); const [projects,setProjects]=useState([]);
 useEffect(()=>{AsyncStorage.getItem('vs-projects').then(v=>v&&setProjects(JSON.parse(v))).catch(()=>{});},[]);
 const saveProject=async()=>{const next=[project,...projects.filter(x=>x.id!==project.id)].slice(0,30);setProjects(next);await AsyncStorage.setItem('vs-projects',JSON.stringify(next));};
 const value=useMemo(()=>({project,projects,
  addMedia:item=>setProject(p=>({...p,media:[...p.media,item]})),
  removeMedia:id=>setProject(p=>({...p,media:p.media.filter(x=>x.id!==id)})),
  renameProject:name=>setProject(p=>({...p,name:name.trim()||'مشروع جديد'})),
  saveProject,resetProject:()=>setProject(empty())
 }),[project,projects]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStudio(){const v=useContext(Ctx);if(!v)throw new Error('StudioProvider missing');return v;}