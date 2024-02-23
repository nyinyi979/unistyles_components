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
    let timeOut:NodeJS.Timeout;
    const {ParentView,PopOverView,animationDuration=200,backdrop={color:'black',opacity:.5}} = props;
    const {styles:{backdropStyle,popOverContainer}} = useStyles(styleSheet);
    const {animateIntro,animateOutro,animatedStyles} = GenerateScaleAnimation({animationDuration,oneDirectionalAnimation:true});
    
    const closePopOver = () =>{
        animateOutro();
        timeOut = setTimeout(()=>{
            setVisible(false);
        },animationDuration)
    }
    React.useEffect(()=>{
        if(visible) animateIntro();
        else clearInterval(timeOut);
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
                    style={[backdropStyle,{
                        backgroundColor:backdrop.color,
                        opacity:backdrop.opacity
                    }]} 
                />}
            <Animated.View onLayout={(e)=>{visible&&setDimension({width:e.nativeEvent.layout.width,height:e.nativeEvent.layout.height})}} 
                style={[animatedStyles,popOverContainer(visible, position)]}
                
            >
                {PopOverView}
            </Animated.View>
        </View>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    popOverContainer:(visible: boolean,position: {top: number, left: number})=>({ 
        display: visible? 'flex' : 'none',
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 3,
        ...position
    }),
    backdropStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2
    }
}));
