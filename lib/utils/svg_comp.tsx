import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

/** 
 * @param 
 * - Activated - boolean state to control the state of the element, 
 * @returns PlusMinus icon, animated according to state
 */
export function PlusMinus(props:{activated:boolean,color:string}){
    const {activated,color} = props;
    const {styles} = useStyles(styleSheet);
    const rotation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(()=>({
      transform: [{rotate: `${rotation.value}deg`}]
    }));

    React.useEffect(()=>{
        if(activated) rotation.value = withTiming(90,{duration:100});
        else rotation.value = withTiming(0,{duration:100});
    }, [activated]);

    return(
        <>
            <View style={[styles.plusHorizontal,{backgroundColor:color}]}/>
            <Animated.View style={[animatedStyles,styles.plusVertical,{backgroundColor:color}]} />
        </>
    )
}
/**
 * 
 * @param 
 * - color of the arrow, please use unistyles color for light and dark mode optimisation
 * - Activated - boolean state to control the state of the element, 
 * @returns Arrow icon, animated according to state
 */
export function ChevronArrow(props:{activated:boolean,color:string}){
    const {activated,color} = props;
    const rotateZ = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{rotateZ: `${rotateZ.value}deg`}]
    }))
    React.useEffect(()=>{
      if(activated) rotateZ.value = withTiming(90,{duration:50});
      else rotateZ.value = withTiming(0,{duration:70});
      
    },[activated])
    const {styles} = useStyles(styleSheet);
    return(
        <View style={{marginTop: activated? 4 : 1,marginRight: activated? -2 : 0}}>
            <Animated.Text style={[animatedStyles,styles.arrowStyle,{color:color}]}>
                &gt;
            </Animated.Text>
        </View>
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


const styleSheet = createStyleSheet((theme)=>({
    plusHorizontal:{
        position:'absolute',
        width: 15, 
        height: 4,
        top:5
    },
    plusVertical:{
        position:'absolute',
        width: 4, 
        height: 15,
        right:-9
    },
    arrowStyle:{
        fontSize:20,
        fontWeight:'700',
    }
}))