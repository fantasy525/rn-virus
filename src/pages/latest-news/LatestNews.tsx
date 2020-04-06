import React, {FC, Fragment, useState, useEffect, useRef, useCallback, useMemo} from "react";
import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import {HttpClient} from "../../utils/HttpClient";
import {getNewsProgress, IInfoList, INewsProgressList} from "../../api/home";
import {px} from "../../utils/screen";
import {useRefCallback} from "../../components/useRefCallback";
import {StackNavigationProp} from "@react-navigation/stack";
import {DefaultHeader} from 'react-native-smartrefreshlayout';
import { SmartRefreshLayout} from "../../../package/react-native-smartrefreshlayout";
import SmartRefreshControl from "../../../package/react-native-smartrefreshlayout/SmartRefreshControl";
import AnyHeader from "../../../package/react-native-smartrefreshlayout/AnyHeader";
import {BikeLoading} from "../../components/BikeLoading";
import LottieView from "lottie-react-native";


const LatestNews = React.memo((props:{
    navigation:StackNavigationProp<any>
}) =>{
    const [newsList , setNewsList] = useState<Array<INewsProgressList>>([])
    useEffect(() => {
        getNewsProgress({
            num:50,
            bkn:1464022595
        }).then((res) => {
            if(res.data){
                setNewsList(res.data.dataList)
            }
        })
    },[]);
    const handleClick = useRefCallback<(url:string) => void>((url:string) => {
        props.navigation.navigate('NewsDetail',{
            url:url
        })
    },[])
    const smartRefreshControl = useRef<SmartRefreshControl>();

    const handleHeaderMoving = useRefCallback((event)=>{
        let {percent} = event.nativeEvent;
        if(percent<=1) {

        }
    },[])
    return (
        <>
            <View style={{backgroundColor:'#fff'}}>
                { <FlatList
                    refreshControl={
                        <SmartRefreshControl
                            ref={(ref) => ref&&(smartRefreshControl.current = ref)}
                            renderHeader={<AnyHeader>
                                <LottieView
                                    style={{width:100,height:100}}
                                    hardwareAccelerationAndroid={true}
                                    source={require('../../data/bike-animation.json')}/>
                            </AnyHeader>}
                            onRefresh={() => {
                                setTimeout(() => {
                                    smartRefreshControl.current && smartRefreshControl.current.finishRefresh();
                                }, 1000)
                            }}
                        />
                    }
                    ListHeaderComponent={<View style={{height: 30}}></View>}
                    keyExtractor={(item => item.id.toString())}
                    data={newsList}
                    renderItem={(news) => {
                        return (
                            <View style={style.card}>
                                <View>
                                    <View style={style.point}/>
                                    <View style={style.line}/>
                                </View>
                                <TouchableWithoutFeedback onPress={() => {
                                    handleClick(news.item.url);
                                }}>
                                    <View style={style.cardContent}>
                                        <Text style={style.time}>更新时间: {news.item.label}</Text>
                                        <View style={{backgroundColor:'#f6f6f6',borderRadius:px(10),
                                            paddingLeft:px(10),paddingBottom:px(20),paddingRight:px(10,),
                                            marginTop:px(20)}}>
                                            <Text style={style.newsText}>{news.item.desc}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }
                    }/>
                }
            </View>
        </>
    )
})
const style = StyleSheet.create({
    card:{
      display:'flex',
        position: 'relative',
        flexDirection:'row',
        marginLeft:px(20),
        backgroundColor: '#fff'
    },
    point:{
        width:5,
        height:5,
        backgroundColor:'blue',
        borderRadius:px(5)
    },
    cardContent:{
        paddingBottom:px(50),
        marginLeft:px(20),
        marginRight:px(40)
    },
    line:{
        position: 'absolute',
        width:px(10),
        top:5,
        height: '100%',
        bottom:px(-20),
        left:1.4,
        borderLeftWidth:px(5),
        borderLeftColor:'rgba(39,82,242,.2)'
    },
    time:{
        fontSize:12,
        color:'#aaa',
        lineHeight:14
    },
    newsText:{
        flexWrap: 'wrap',
        color:'#414141',
        fontWeight:'700',
        marginTop:px(20)
    }
})
export {
    LatestNews
}
