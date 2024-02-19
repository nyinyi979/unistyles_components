import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { SkeletonProps } from "..";
import Color from "color";
import React from "react";

export default function Skeleton(props: SkeletonProps){
    const {backgroundColor} = props;
    const darkerColor = React.useRef(Color(backgroundColor).darken(.3).toString());
    const backgroundColorValue = useSharedValue(backgroundColor);
    const animatedStyles = useAnimatedStyle(()=>({
        backgroundColor: backgroundColorValue.value
    }));
    backgroundColorValue.value = withRepeat(withTiming(darkerColor.current,{duration:1000}),-1,true)
    return(
        <Animated.View {...props} style={[props.style,animatedStyles]}/>
    )
}


