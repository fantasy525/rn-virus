import {StackNavigationProp} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/native";
import {FC, ReactElement} from "react";

interface IScreenProps<T extends ParamListBase> {
    navigation:StackNavigationProp<T>;
}

/**
 * Navigation导航组件的props
 * [P]是函数组件的Props,
 * [T]是导航参数的类型信息[ParamListBase]
 */
export type Screen<P extends object,T  extends ParamListBase> = FC<IScreenProps<T> & {[k in keyof P]:P[k]}>;

