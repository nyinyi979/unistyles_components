import Color from "color";
import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LinkBtnProps } from "..";
import { Pressable} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { FontSizes } from "../unistyles";

/** It is not named Link because there are a lot of libraries out there using Link. 
 * @param Link
 * - variant - primary, secondary, tertiary, success, warning, error, black, white
 * - onPress - onPress function
 * - onHover - onHover function 
 * - fontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl 
 * @returns Link react node
*/
function LinkBtn(props: LinkBtnProps){
    const {
        variant='primary',
        onPress=()=>{},
        onHover=()=>{},
        fontSize='md',
    } = props;
    
    const {styles:{link}} = useStyles(styleSheet,{
        variant:variant
    });


    const usedColor = useSharedValue(link.color);
    const animatedStyles = useAnimatedStyle(()=>({
        color: usedColor.value
    }))
    const originalState = () =>{    
        usedColor.value = withTiming(link.color,{duration:50});
    }
    const hoverState = () =>{
        usedColor.value = withTiming(link.hoverColor,{duration:50});
        onHover();
    }
    const pressState = () =>{
        usedColor.value = withTiming(link.hoverColor,{duration:50});
        onPress();
        setTimeout(()=>{
            originalState();
        },50);
    }


    return(
        <Pressable
            onHoverIn={hoverState}
            onPress={pressState}
            onHoverOut={originalState}
            onPressOut={originalState}
            style={{alignSelf:'flex-start'}}
        >
            <Animated.Text style={[animatedStyles,{
                    textAlign: 'center',
                    fontSize: FontSizes[fontSize],
                    pointerEvents: 'box-none'
                    }]}
            >
                {props.title}
            </Animated.Text>
        </Pressable>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    link: {
        variants:{
            variant:{
                'primary': {
                    hoverColor: Color(theme.color['primary']).lighten(.2).toString(),
                    color: theme.color['primary'],
                },
                'secondary': {
                    hoverColor: Color(theme.color['secondary']).lighten(.2).toString(),
                    color: theme.color['secondary'],
                },
                'tertiary': {
                    hoverColor: Color(theme.color['tertiary']).lighten(.2).toString(),
                    color: theme.color['tertiary'],
                },
                'success': {
                    hoverColor: Color(theme.color['success']).lighten(.2).toString(),
                    color: theme.color['success'],
                },
                'warning': {
                    hoverColor: Color(theme.color['warning']).lighten(.2).toString(),
                    color: theme.color['warning'],
                },
                'error': {
                    hoverColor: Color(theme.color['error']).lighten(.2).toString(),
                    color: theme.color['error'],
                },
                'black': {
                    hoverColor: theme.color['darkGray'],
                    color: theme.color['black'],
                },
                'white': {
                    hoverColor: theme.color['lightGray'],
                    color: theme.color['white'],
                }
            }
        }
    }
})));

export default LinkBtn