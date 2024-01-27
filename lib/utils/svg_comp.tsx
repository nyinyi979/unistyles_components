import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

/** 
 * @param 
 * - Color - the icon color, please use unistyles color to support light mode and dark mode
 * - Activated - boolean state to control the state of the element, 
 * @returns PlusMinus icon, animated according to state
 */
export function PlusMinus(props:{color: string,activated:boolean}){
    const {color,activated} = props;
    const rotation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(()=>({
      transform: [{rotate: `${rotation.value}deg`}]
    }));

    React.useEffect(()=>{
        if(activated) rotation.value = withTiming(90,{duration:500});
        else rotation.value = withTiming(0,{duration: 500});
    }, [activated]);

    return(
        <>
            <View style={{
                backgroundColor:
                color,
                position:'absolute',
                width: 15, 
                height: 4,
                top:5}}
            />
            <Animated.View 
                style={[{
                    backgroundColor:color,
                    position:'absolute',
                    width: 4, 
                    height: 15,
                    right:6},
                    animatedStyles]
                }>
            </Animated.View>
        </>
    )
}
/**
 * 
 * @param 
 * - Color - the icon color, please use unistyles color to support light mode and dark mode
 * - Activated - boolean state to control the state of the element, 
 * @returns Arrow icon, animated according to state
 */
export function ChevronArrow(props:{color:string,activated:boolean}){
    const {color,activated} = props;
    const rotate = useSharedValue(90);
    const translateX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{
            rotateZ: `${rotate.value}deg`,
        }]
    }))
    React.useEffect(()=>{
      if(activated) rotate.value = withTiming(90,{duration: 100});
      else rotate.value = withTiming(-90,{duration:100})
    },[activated])
    return(
        <Animated.Text style={[animatedStyle,
            {
                color:color,
                fontSize:20,
                fontWeight:'700'
            }
        ]}>
            &gt;
        </Animated.Text>
    )
}

export function BottomBar(props: {duration:number,foreground:string,reversed?: boolean}){
    const {
        reversed=false,
        duration,
        foreground
    } = props;
    const width = useSharedValue(reversed? 100 : 0);
    const animatedStyles = useAnimatedStyle(()=>({
        width: `${width.value}%`
    }));

    if(reversed) width.value = withTiming(0, {duration:duration-300})
    else width.value = withTiming(100, {duration:duration-300})
    
    return(
        <View style={{
            width:'100%',height:2,position:'absolute',bottom:0,left:0
        }}>
            <Animated.View style={[
                animatedStyles, {backgroundColor: foreground,height:2}
            ]}></Animated.View>
        </View>
    )
}