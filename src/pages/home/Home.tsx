import React, {FC, Fragment, lazy, useEffect, useState} from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Image, StatusBar, Text, View, ImageSourcePropType, TouchableWithoutFeedback} from "react-native";
import {px} from "../../utils/screen";
import { Screen } from "src/types/CommonType";
import { HttpClient } from "src/utils/HttpClient";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RealtimeInfo } from "../realtime-info/RealtimeInfo";
import { LatestNews } from "../latest-news/LatestNews";
import SplashScreen from 'react-native-splash-screen'
import {Test} from "./Test";
let a:any;
const Home:Screen<any,any> = (props) => {
    const [showModal,setShowModal] = useState(true);
    useEffect(() => {
        SplashScreen.hide();
        AsyncStorage.getItem('guide').then((res) => {
            if(!res) {
                AsyncStorage.setItem('guide','1');
                setShowModal(true)
            }
        })


    },[])
    return (
       <Fragment>
           <StatusBar translucent={true} backgroundColor={'rgba(8,19,186,1)'}/>
           <Image source={require('../../images/home/banner.jpg')} style={{width:px(750),height:px(210),marginTop:StatusBar.currentHeight}}/>
           <TopTabs/>
           {
               showModal &&  <View style={{
                   position:'absolute',
                   backgroundColor:'rgba(0,0,0,0.5)',
                   width:'100%',
                   height:'100%',
                   justifyContent:'center',
                   alignItems:'center'
               }}>
                   <View style={{width:px(700),
                       paddingTop:px(30),
                       paddingBottom:px(30),
                       paddingLeft:px(30),
                       paddingRight:px(30),
                       backgroundColor:'#fff',borderRadius:px(30)}}>
                       <Text style={{fontSize:16,color:'#999'}}>本app仅供参考学习使用,数据，图片等来源于
                           <Text style={{fontSize:16,fontWeight:'bold',color:'#000'}}>UC浏览器，腾讯新闻等</Text>,
                           不保证数据的展示正确性</Text>
                       <View style={{marginTop:px(30)}}>
                           <Button  title={'关闭'} onPress={() => setShowModal(false)}/>
                       </View>
                   </View>
               </View>
           }
       </Fragment>
    )
}

const CreateTab = createMaterialTopTabNavigator();
const TopTabs = (props:any) =>{
    // @ts-ignore

    return (
        <CreateTab.Navigator
        tabBarOptions={{
            labelStyle: { fontSize: 16 },
            tabStyle:{
                padding:0
            },
            style: { },
            indicatorStyle:{
                height:4,
                backgroundColor:'#10aeb5'
            },
            activeTintColor:'#10aeb5',
            inactiveTintColor:'#999',
            showIcon:true,
            // @ts-ignore
            lazy:true
        }}
        >
            <CreateTab.Screen
             name="疫情动态"

             component={RealtimeInfo}></CreateTab.Screen>
            <CreateTab.Screen
            name="疫情新闻"

            component={LatestNews}></CreateTab.Screen>


            <CreateTab.Screen

             name="谣言粉碎"
             component={Test}></CreateTab.Screen>

            <CreateTab.Screen

             name="同行查询"
             component={Test}></CreateTab.Screen>

        </CreateTab.Navigator>
    )
}

const TabLabel = (props:{ focused: boolean; color: string ,name:string,icon:ImageSourcePropType,}) =>{
    return (
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            {/*<Image style={{width:px(30),height:px(30)}} source={props.icon}/>*/}
            <Text style={{
                marginLeft:px(5),
                fontSize:px(32),
                color:props.focused?'#10aeb5':'#999'
            }}>疫情动态</Text>
        </View>
    )
}

export default Home;
