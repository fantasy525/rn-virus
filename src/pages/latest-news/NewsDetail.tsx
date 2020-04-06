import {View, Text, Route, StatusBar, ProgressBarAndroid} from "react-native";

import React, {useEffect, useState} from "react";
import WebView from "react-native-webview";
import {Screen} from "../../types/CommonType";
import {StackNavigationProp} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/native";
import {NavigationState} from "react-native-tab-view";


const NewsDetail = React.memo((props:{
    navigation:StackNavigationProp<ParamListBase>,
    route:Route
}) => {
    const [url,setUrl] = useState();
    const [progress ,setProgress] = useState(0)
    useEffect(() => {
        if (props.route.params?.url) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
            console.log(props.route.params?.url);
            setUrl(props.route.params?.url);
        }
    }, [props.route.params?.url]);

    return (
        <View style={{flex:1}}>
            <StatusBar translucent={true} backgroundColor={'black'}/>
            <ProgressBarAndroid
                style={{marginTop:StatusBar.currentHeight,opacity:progress<1?1:0}}
                indeterminate={false} styleAttr={'Horizontal'} progress={progress}/>
            {url && <WebView onLoadProgress={(e) => {
                console.log(e.nativeEvent.progress);
                setProgress(e.nativeEvent.progress)
            }}  source={{uri:url}}/>}
        </View>
    )
});
export {NewsDetail}
