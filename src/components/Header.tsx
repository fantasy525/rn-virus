import {View, Text, StyleSheet, StatusBar} from "react-native";
import React, {FC, Fragment} from "react";
type Props = {
    title: string
}
 const Header:FC<Props> = (props) => {
    return(
        <Fragment>

            <View>
                <Text> {props.title}</Text>
            </View>
        </Fragment>
    )
}
const style = StyleSheet.create({
    container:{
      justifyContent: 'center',
        height: 50
    },
    title:{
        fontSize:26,
        color:'#000000'
    }
})
export {
     Header
}
