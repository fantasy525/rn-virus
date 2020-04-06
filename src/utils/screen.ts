import {Dimensions,PixelRatio } from 'react-native'
const dpr = PixelRatio.get();
const UI_WIDTH = 750;
function px(px:number):number {
    const deviceWidth = Dimensions.get('window')
    return px/UI_WIDTH * (deviceWidth.width);
}
export {px}
