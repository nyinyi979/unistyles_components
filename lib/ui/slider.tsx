import React from "react";
import { View } from "react-native";
import { SliderProps } from "..";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Color from "color";

/**
 * 
 * @param Slider
 * - defaultValue - default value (1-100)
 * - onChange - (number)=>fn
 * - width - width of the slider
 * - min - minimum value
 * - max - maximum value
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * @returns 
 */
export default function Slider(props: SliderProps){
    const {
        defaultValue=10,
        onChange=()=>{},
        variant='ghost',
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
                primary:{
                    backgroundColor: theme.color.primary,
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                },
                success:{
                    backgroundColor: theme.color.success,
                },
                warning: {
                    backgroundColor: theme.color.warning,
                },
                error: {
                    backgroundColor: theme.color.error,
                },
                ghost:{
                    backgroundColor: theme.color.white,
                },
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
                primary:{
                    backgroundColor: theme.color.primaryForeground,
                },
                secondary:{
                    backgroundColor: theme.color.secondaryForeground,
                },
                tertiary:{
                    backgroundColor: theme.color.tertiaryForeground,
                },
                success:{
                    backgroundColor: theme.color.successForeground,
                },
                warning: {
                    backgroundColor: theme.color.warningForeground,
                },
                error: {
                    backgroundColor: theme.color.errorForeground,
                },
                ghost:{
                    backgroundColor: Color(theme.color.white).darken(.3).toString(),
                },
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
                primary:{
                    backgroundColor: Color(theme.color.primary).darken(.3).toString(),
                    borderColor: Color(theme.color.primary).darken(.6).toString()
                },
                secondary:{
                    backgroundColor: Color(theme.color.secondary).darken(.3).toString(),
                    borderColor: Color(theme.color.secondary).darken(.6).toString()
                },
                tertiary:{
                    backgroundColor: Color(theme.color.tertiary).darken(.3).toString(),
                    borderColor: Color(theme.color.tertiary).darken(.6).toString()
                },
                success:{
                    backgroundColor: Color(theme.color.success).darken(.3).toString(),
                    borderColor: Color(theme.color.success).darken(.6).toString()
                },
                warning: {
                    backgroundColor: Color(theme.color.warning).darken(.3).toString(),
                    borderColor: Color(theme.color.warning).darken(.6).toString()
                },
                error: {
                    backgroundColor: Color(theme.color.error).darken(.3).toString(),
                    borderColor: Color(theme.color.error).darken(.6).toString()
                },
                ghost:{
                    backgroundColor: Color(theme.color.white).darken(.3).toString(),
                    borderColor: Color(theme.color.white).darken(.6).toString()
                },
            }
        }
    }
}))