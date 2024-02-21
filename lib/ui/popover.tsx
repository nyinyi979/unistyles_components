import React from 'react';
import Animated from 'react-native-reanimated';
import { Dimensions, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { GenerateScaleAnimation } from '../utils/slide_animation';
import { LongPressMenuBoxProps } from '..';

export default function LongPressMenuBox(props: LongPressMenuBoxProps){
    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({
        top: 0,
        left: 0
    });
    const [dimension, setDimension] = React.useState({
        width: 100,
        height: 100
    });
    const {ParentView,PopOverView,animationDuration=200,backdrop={color:'black',opacity:.5}} = props;
    const {styles} = useStyles(styleSheet);
    const {animateIntro,animateOutro,animatedStyles} = GenerateScaleAnimation({animationDuration,oneDirectionalAnimation:true});
    
    const closePopOver = () =>{
        animateOutro();
        setTimeout(()=>{
            setVisible(false);
        },animationDuration)
    }
    React.useEffect(()=>{
        if(visible) animateIntro();
    },[visible])

    const optimisePosition = (left: number, top: number,pageY:number) =>{
        const {width,height} = Dimensions.get('screen');
        let leftToSet = left;
        let topToSet = top;
        if(width-left < dimension.width) leftToSet -= dimension.width;
        if(height-pageY < dimension.height) topToSet -= dimension.height;
        setPosition({left: leftToSet, top: topToSet});
    }
    return(
        <View style={{alignSelf:'flex-start'}}>
            <Pressable 
                onLongPress={()=>{setVisible(true)}}
                onPressIn={(evt)=>{optimisePosition(evt.nativeEvent.locationX,evt.nativeEvent.locationY,evt.nativeEvent.pageY)}}
            >
                {ParentView}
            </Pressable>
            {visible&&
                <Pressable 
                    onPress={closePopOver}  
                    style={[styles.backdrop,{
                        backgroundColor:backdrop.color,
                        opacity:backdrop.opacity
                    }]} 
                />}
            <Animated.View onLayout={(e)=>{visible&&setDimension({width:e.nativeEvent.layout.width,height:e.nativeEvent.layout.height})}} 
                style={[animatedStyles,position,styles.popOverContainer,{
                    display: visible? 'flex' : 'none',
                }]}
            >
                {PopOverView}
            </Animated.View>
        </View>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    popOverContainer:{
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 3
    },
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2
    }
}));
