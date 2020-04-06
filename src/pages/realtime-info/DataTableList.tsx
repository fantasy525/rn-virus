import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    PanResponder,
    PanResponderInstance
} from "react-native";
import React, {useRef, useState} from "react";
import {px} from "../../utils/screen";
import {useRefCallback} from "../../components/useRefCallback";
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '湖北',
        sure_cnt:33434,
        cure_cnt:343,
        die_cnt:1312
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '河南',
        sure_cnt:33434,
        cure_cnt:343,
        die_cnt:1312
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29dd72',
        title: '广西',
        sure_cnt:33434,
        cure_cnt:343,
        die_cnt:1312
    },

    {
        id: '58694a0f-3da1-471f-bd96-145571e2d29d72',
        title: '北京',
        sure_cnt:33434,
        cure_cnt:343,
        die_cnt:1312
    },

    {
        id: '58694a0f-3da1-471f-bd96-14557145e29d72',
        name: '黑龙江省',
        sure_cnt:33434,
        cure_cnt:343,
        die_cnt:1312
    },


];

interface IProps {
    name:string,
    sure_cnt:number,
    cure_cnt:number,
    die_cnt:number,
    cities:Array<Omit< IProps, 'cities'>>
}
function ProvinceItem(props:IProps) {
    const [showCity,setShowCity] = useState(false);
    const handleProvinceClick = useRefCallback(()=>{
        setShowCity(!showCity);
    },[])
    const activeStyle = showCity?{elevation:2}:{}
    return (
     <View>
         <TouchableWithoutFeedback onPress={handleProvinceClick}>
             <View style={{...styles.item,...activeStyle}}>
                 <View style={{width:px(130),alignItems:'center'}}>
                     <Text style={styles.title}>{props.name}</Text>
                 </View>
                 <View style={{flex:1,justifyContent:'space-around',flexDirection:'row'}}>
                     <Text style={styles.title}>{props.sure_cnt?props.sure_cnt:0}</Text>
                     <Text style={styles.title}>{props.cure_cnt?props.cure_cnt:0}</Text>
                     <Text style={styles.title}>{props.die_cnt?props.cure_cnt:0}</Text>
                 </View>
             </View>
         </TouchableWithoutFeedback>
         {showCity && props.cities.map(((item,index) => {
             return (
                 <CityItem key={index.toString()} {...item} />
             )
         }))}
     </View>
    );
}

function CityItem( props:{name:string, sure_cnt:number,cure_cnt:number,die_cnt:number}) {
    return (
        <View style={styles.item} >
            <View style={{width:px(130),alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#999'}}>{props.name}</Text>
            </View>
            <View style={{flex:1,justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={{fontSize:14,color:'#999'}}>{props.sure_cnt?props.sure_cnt:0}</Text>
                <Text style={{fontSize:14,color:'#999'}}>{props.cure_cnt?props.cure_cnt:0}</Text>
                <Text style={{fontSize:14,color:'#999'}}>{props.die_cnt?props.die_cnt:0}</Text>
            </View>
        </View>
    );
}
interface IDataTableListProps {
    provinces:Array<{
        province:string,
        sure_cnt:number,
        cure_cnt:number,
        die_cnt:number,

    }>,
    cities:Array<{
        city:string,
        sure_cnt:number,
        cure_cnt:number,
        die_cnt:number,
        province:string,
        two_level_area:string
    }>,
    setEnableScroll:(res:boolean) => void

}

const DataTableList = (props:IDataTableListProps) => {
    const flatListRef:React.MutableRefObject<FlatList<{}> | undefined> = useRef()
    const instanceRef:React.MutableRefObject<{shouldRes:boolean,panResponser:PanResponderInstance}> = useRef(
        {
            shouldRes:true,
            panResponser: PanResponder.create({
                onStartShouldSetPanResponderCapture: () => {
                    return true
                },
                onMoveShouldSetPanResponderCapture: ()=> true,

            })
        }
    )
    const provinces = props.provinces.map((pro)=>{
        const cities = props.cities.filter((city) =>{
            return city.province === pro.province
        }).map(value => {
            return {
                sure_cnt:value.sure_cnt,
                cure_cnt:value.cure_cnt,
                die_cnt:value.die_cnt,
                name:value.city?value.city:value.two_level_area
            }
        })

        return {
            province:pro.province,
            sure_cnt:pro.sure_cnt,
            cure_cnt:pro.cure_cnt,
            die_cnt:pro.die_cnt,
            cities: cities.sort((a,b)=> b.sure_cnt - a.sure_cnt)
        }
    })
    return (
        <View  style={{height:480}}>

            {props.provinces.length>0 &&<FlatList
                nestedScrollEnabled={true}

                ref = {(r) => {
                    if(r) {
                        // @ts-ignore
                        flatListRef.current = r;
                    }
                }}
                scrollEnabled={true}
                data={provinces}
                renderItem={({ item }) => {
                    return(
                        <ProvinceItem
                                cities={item.cities}
                                name={item.province}
                                sure_cnt={item.sure_cnt}
                                cure_cnt={item.cure_cnt}
                                die_cnt={item.die_cnt}/>
                    )
                }}
                keyExtractor={(item,index) => item.province}/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {

        display:'flex',
        flexDirection:'row',

        paddingTop:px(20),
        paddingBottom:px(20),
        alignItems:'center',
        backgroundColor:'rgba(250,250,250,1)',
        marginTop:px(5),
        marginBottom:px(5)
    },
    title: {
        fontSize: 14,
        fontWeight:'bold'
    },
});
export  {DataTableList}
