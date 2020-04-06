import { WebView } from 'react-native-webview';
import React from 'react';
import { px } from '../../utils/screen';

interface IProps {
    dataList:Array<{
        name:string,
        value:number,
        sure_cnt: number,
        die_cnt: number,
        cure_cnt: number
    }>,
    mapName:string,
    trends?:Array<any>
}
const ChinaMap = (props:IProps)=> {
    const runFirst = `
            window.map = {};
             window.map.dataList = ${JSON.stringify(props.dataList)};
             window.map.trends = ${JSON.stringify(props.trends)}
             window.map.mapName = '${props.mapName}'
    `;
    if(props.dataList.length === 0){
        return null;
    }
    // 192.168.0.108
    const uri = props.mapName === 'china'
        ? 'file:///android_asset/map/index.html'
        :'file:///android_asset/map/hubei.html'
    // const uri = props.mapName === 'china'
    //     ? 'http://192.168.0.108:5500/index.html'
    //     :'http://192.168.0.108:5500/hubei.html'
    return (
        <WebView
            injectedJavaScript={runFirst}
            style={{
                height: '100%'
            }}
            source={{uri: uri}}/>
    );
}

export {
    ChinaMap
}
