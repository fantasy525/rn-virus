import LottieView from 'lottie-react-native';
import React from "react";

const  BikeLoading = React.memo((props:{})=> {
    return(
        <LottieView
            style={{width:100,height:100}}
            hardwareAccelerationAndroid={true}
            source={require('../data/bike-animation.json')}/>
    )
});
export {BikeLoading}
