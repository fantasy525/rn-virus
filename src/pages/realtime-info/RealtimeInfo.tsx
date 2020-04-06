import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  Text,
  Animated,
  Easing,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback, PanResponder, PanResponderInstance, FlatList,
} from 'react-native';
import {px} from '../../utils/screen';
import {useRefCallback} from '../../components/useRefCallback';
import {getInfoList, IInfoList} from '../../api/home';
import {WToast} from 'react-native-smart-tip';
import {useMountedRef} from '../../components/useMountedRef';
import {ChinaMap} from "./Maps";
import {DataTableList} from "./DataTableList";

const RealtimeInfo = React.memo(() => {
  const isMountedRef = useMountedRef();
  const [infoListData,setInfoListData] = useState<IInfoList | null>(null)

  const infoData = infoListData ?infoListData.iflow:{
    cure_cnt: 0,
    cure_cnt_incr: 0,
    die_cnt: 0,
    die_cnt_incr: 0,
    incr_day: '',
    is_incr_yesterDay: true,
    like_cnt: 0,
    like_cnt_incr: 0,
    statisEndTime: '',
    sure_cnt: 0,
    sure_cnt_incr: 0,
  };
  const provincesInfo = infoListData?infoListData.provinces:[];

  const huBeiInfo = infoListData?infoListData.cities.filter((value => {
   return value.province === '湖北'
  })):[];
  const transformProvinceInfo = provincesInfo.map((value)=>{
    return {
      name: value.province,
      value:value.sure_cnt,
      sure_cnt: value.sure_cnt,
      die_cnt: value.die_cnt,
      cure_cnt: value.cure_cnt
    }
  })
  const transformHuBeiInfo = huBeiInfo.map((value)=>{
    let name;
    if(value!.city === '恩施'){
      name = value!.city + '土家族苗族自治州'
    } else if(value!.city === '神农架'){
      name = value!.city + '林区'
    } else {
      name = value!.city + '市';
    }
    return {
      name: name,
      value:value!.sure_cnt,
      sure_cnt: value!.sure_cnt,
      die_cnt: value!.die_cnt,
      cure_cnt: value!.cure_cnt
    }
  })
  const [scrollEnable , setScrollEnable] = useState(true)
  const handleScrollEnable = useRefCallback((res:boolean) => {
    setScrollEnable(res);
  },[])
  const instanceRef = useRef({
    isRefresh:false,
    scrollView: null
  })
  useEffect(() => {
    getData();
  }, []);
  const handleRefreshClick = useRefCallback(() => {
    instanceRef.current.isRefresh = true;
    getData();
  }, []);
  const getData = () => {
    getInfoList({
      trend: 1,
      iflow: 1,
      district: 1,
      uc_param_str: 'pccplo',
    }).then(res => {
      if (res.code === 0 && isMountedRef.current) {
        res.data.provinces = res.data.provinces.sort((a,b) => {
          return b.sure_cnt - a.sure_cnt;
        })
        setInfoListData(res.data)
        if(instanceRef.current.isRefresh) {
          instanceRef.current.isRefresh = false;
          WToast.show({data: '刷新成功', backgroundColor: 'rgba(0,0,0,0.5)'});
        }
      }
    });
  }
  return (
    <>
      <View style={{height:'100%'}}>
        <View style={styles.summary}>
          <View
              style={{
                marginLeft: px(34),
                height: 20,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: px(20),
              }}>
            <Text>截止2020-{infoData.statisEndTime}</Text>
            <RefreshImage onClick={handleRefreshClick} />
          </View>
          {
            <View style={styles.itemContainer}>
              <InfoItem
                  total={infoData.sure_cnt}
                  color="#fc4042"
                  title="全国确诊"
                  dayNum={`+${infoData.sure_cnt_incr}`}
              />
              <InfoItem
                  total={infoData.like_cnt}
                  color="#ffae0c"
                  title="疑似病例"
                  dayNum={`+${infoData.like_cnt_incr}`}
              />
              <InfoItem
                  total={infoData.cure_cnt}
                  color="#4faf2b"
                  title="治愈人数"
                  dayNum={`+${infoData.cure_cnt_incr}`}
              />
              <InfoItem
                  total={infoData.die_cnt}
                  color="#7c7c7c"
                  title="死亡人数"
                  dayNum={`+${infoData.die_cnt_incr}`}
              />
            </View>
          }
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{
            marginLeft:px(20),
            marginRight:px(20),
            backgroundColor:'#ffffff',
            borderRadius: px(20),
          }}>
            <Text style={{fontSize:18,marginLeft:px(20),marginTop:px(20)}}>全国疫情地图</Text>
            <View style={{height:500}}>
              <ChinaMap mapName={'china'} dataList={transformProvinceInfo}/>
            </View>
          </View>
          <View style={{
            marginLeft:px(20),
            marginRight:px(20),
            backgroundColor:'#ffffff',
            marginTop:px(20),
            borderRadius: px(20),
            height:1500
          }}>
            {infoListData && infoListData?.trends.length > 0 &&  <ChinaMap
                trends={infoListData?.trends}
                mapName={'湖北'} dataList={transformHuBeiInfo}/>}

          </View>
          <View style={{marginLeft:px(20),
            height:450,
            marginRight:px(20),
            marginTop:px(20),
            backgroundColor:'#ffffff',
            borderRadius: px(20),}}>
            <Text style={{fontSize:20,marginLeft:px(20),marginTop:px(20)}}>全国各地数据</Text>
            <View style={{
              display:'flex',
              flexDirection:'row',
              height: 50,
              alignItems:'center',
              borderTopWidth:px(1)
            }}>
              <View style={{width:px(130),alignItems:'center'}}>
                <Text style={{color:'#666',fontSize:14}}>省份</Text>
              </View>
              <View style={{flex:1,justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={{color:'#ff5d5d',fontSize:14}}>确诊</Text>
                <Text style={{color:'#ffca65',fontSize:14}}>治愈</Text>
                <Text style={{color:'#b5bbc6',fontSize:14}}>死亡</Text>
              </View>

            </View>
            { infoListData &&  <DataTableList
                setEnableScroll={handleScrollEnable}
                cities={infoListData?.cities} provinces={infoListData?.provinces}/>}
          </View>
        </ScrollView>
      </View>
    </>
  );
});

const InfoItem = React.memo(
  (props: {color: string; title: string; dayNum: string; total: number}) => {
    return (
      <View style={infoStyle.container}>
        {useMemo(
          () => (
            <Text
              style={{
                ...styles.numTotal,
                color: props.color,
              }}>
              {props.total}
            </Text>
          ),
          [props.color, props.total],
        )}
        <Text style={styles.numTitle}>{props.title}</Text>
        <Text style={styles.numDay}>
          较上日
          <Text
            style={{
              ...styles.numDay,
              color: props.color,
            }}>
            {props.dayNum}
          </Text>
        </Text>
      </View>
    );
  },
);

const RefreshImage = React.memo((props: {onClick: () => void}) => {
  const [rotate, handleClick] = useCircleRotate(props.onClick);
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Animated.View
        style={{
          marginLeft: px(10),
          justifyContent: 'center',
          alignItems: 'center',
          transformOrigin: 'center',
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../images/home/refresh_icon.png')}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const useCircleRotate = function(
  onClick: () => void,
): [Animated.Value, () => void] {
  const rotate = useMemo(() => new Animated.Value(0), []);
  const instance = useRef<{
    controller: Animated.CompositeAnimation;
    isClick: boolean;
    animationStatus: 'start' | 'complete';
  }>({
    controller: Animated.timing(rotate, {
      toValue: 1,
      easing: Easing.linear,
      duration: 1000,
    }),
    isClick: false,
    animationStatus: 'complete',
  });
  useEffect(() => {
    rotate.addListener(value => {
      if (value.value === 1) {
        instance.current.isClick = false;
        instance.current.animationStatus = 'complete';
      }
    });
    return () => {
      rotate.removeAllListeners();
      rotate.stopAnimation();
    };
  }, [rotate]);
  const handleClick = useRefCallback(() => {
    if (instance.current.isClick) {
      return;
    }
    instance.current.isClick = true;
    onClick();
    instance.current.controller.stop();
    rotate.setValue(0);
    instance.current.controller.start(() => {
      instance.current.animationStatus = 'start';
    });
  }, []);
  return [rotate, handleClick];
};

const styles = StyleSheet.create({
  container: {},
  summary: {
    backgroundColor: '#fff',
    marginTop: px(16),
    marginLeft: px(16),
    marginRight: px(16),
    marginBottom: px(16),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    height: px(280),
    borderRadius: px(20),
    elevation: px(10),
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  numTotal: {
    fontSize: px(50),
  },
  numTitle: {
    fontSize: px(30),
    color: '#262626',
  },
  numDay: {
    fontSize: px(24),
    color: '#828c9b',
    marginTop: px(10),
  },
});
const infoStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export {RealtimeInfo};
