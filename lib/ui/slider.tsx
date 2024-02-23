import React from "react";
import { View } from "react-native";
import { SliderProps } from "..";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";

/**
 * 
 * @param Slider
 * - defaultValue - default value (1-100)
 * - onChange - (number)=>fn
 * - width - width of the slider
 * - min - minimum value
 * - max - maximum value
 * - variant - white, black
 * @returns 
 */
export default function Slider(props: SliderProps){
    const {
        defaultValue=10,
        onChange=()=>{},
        variant='white',
        width=200,
        min=0,
        max=100
    } = props;
    const [value, setValue] = React.useState(defaultValue);
    const pan = Gesture.Pan()
    .onUpdate((e)=>{
        if(e.translationX < min) {
            if(value < min) return;
            setValue(e.absoluteX/width*100);
        }
        else {
            if(value > max) return;
            setValue(e.absoluteX/width*100);
        }
    })
    .onEnd(()=>{
        if(value < min) {
            onChange(min);
            setValue(min);
        }
        else if(value > max) {
            onChange(max);
            setValue(max);
        }
        else onChange(value);
    })

    const tap = Gesture.Tap()
    .onBegin((e)=>{
        setValue(e.absoluteX/width*100)
    })
    .onEnd(()=>{
        if(value < min) {
            onChange(min);
            setValue(min);
        }
        else if(value > max) {
            onChange(max);
            setValue(max);
        }
        else onChange(value);
    });
    const {styles:{sliderContainer,bgSliderBar,slideBar,circle}} = useStyles(styleSheet,{
        variant: variant
    });
    return(
        <View style={[{width:width},sliderContainer]}>
            <GestureDetector gesture={tap}>
                <View style={{flex:1}}>
                    <View style={[{width:width+5},bgSliderBar]} />
                    <View style={[{width:`${value}%`},slideBar]}/>
                    <GestureDetector gesture={pan}>
                        <View style={[circle,{left:`${value-2}%`}]} />
                    </GestureDetector>
                </View>
            </GestureDetector>
        </View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    sliderContainer:{
        height:20,
        alignSelf:'flex-start',
        position:'relative',
    },
    bgSliderBar:{
        position:'absolute',
        top:5,
        height:10,
        zIndex:2,
        borderRadius:10,
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color.lightGray,
                },
                black:{
                    backgroundColor: theme.color.darkGray,
                }
            }
        }
    },
    slideBar:{
        position:'absolute',
        top:5,
        height:10,
        zIndex:3,
        borderRadius:10,
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color.darkGray,
                },
                black:{
                    backgroundColor: theme.color.black,
                }
            }
        }
    },
    circle:{
        position:'absolute',
        top:0,
        width:20,
        height:20,
        borderRadius:20,
        zIndex:3,
        borderWidth: 1,
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color.lightGray,
                    borderColor: theme.color.darkGray
                },
                black:{
                    backgroundColor: theme.color.black,
                    borderColor: theme.color.darkGray
                }
            }
        }
    }
}))