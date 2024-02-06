import React from 'react';
import Color from 'color';
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps } from '..';
import { FontSizes } from '../unistyles';
/**
 * 
 * @param ButtonProps You can provide more params than ViewProps
 * - title: value that you want to display,
 * - variant?: 'error', 'warning', 'success', 'tertiary', 'secondary', 'primary', 'outlined',
 * - size?: 'sm', 'md', 'lg', 'xl',
 * - textAlign?: 'left', 'right', 'center'
 * - onPress?: void function to be called when a press is captured
 * - onPressOut?: void function to be called after press is out
 * - onHover?: void function to be called when the button is hovered
 * - onHoverOut?: void function to be called when the button is not hovered
 * - active? active is not stable it is currently just used in dropdown
 * @returns JSX Element Button
 */
function Button(props:BtnProps){
    //Destructuring the properties
    const {
        title="",
        variant='primary',
        block=false,
        asChild=false,
        size=asChild? 'xs': 'md',
        rounded=true,
        active=false,
        animateScale=!active,
        onPress=()=>{},
        onHover=()=>{},
        onHoverOut=()=>{},
        onPressOut=()=>{},
        onBlur=()=>{},
        onFocus=()=>{},
        children
    } = props;

    const { styles:{button} } = useStyles(styleSheet, {
        variant: variant,
        sizes: size
    });
    
    const backgroundColor = button.backgroundColor;
    const hoverColor = button.hoverColor;
    const color = button.color;
    const fontSize = button.fontSize;
    const padding = {
        paddingHorizontal: button.paddingHorizontal,
        paddingVertical: button.paddingVertical
    }
    const scale = useSharedValue(1);

    const bgSharedValue = useSharedValue(backgroundColor);
    const animatedStyles = useAnimatedStyle(()=>({
        backgroundColor: active? hoverColor : bgSharedValue.value,
        transform: [{scale: scale.value}],
    }));
    
    const originalState = () =>{
        bgSharedValue.value = withTiming(active? hoverColor : backgroundColor ,{duration:150});
    }

    const hoverState = () =>{
        bgSharedValue.value = withTiming(hoverColor,{duration:150});
        onHover();
    }

    const pressState = () =>{
        if(animateScale) scale.value = withTiming(0.92, {duration:100});
        bgSharedValue.value = withTiming(hoverColor,{duration:150});
        setTimeout(()=>{
            scale.value = withTiming(1, {duration:50});
        },50)
        onPress();
    }

    const hoverOutState = () =>{
        originalState();
        onHoverOut();
    }
    const pressOutState = ()=>{
        originalState();
        onPressOut();
    }
    return(
        <Animated.View {...props}
            style={[
                animatedStyles,
                {position:'relative'},
                block? 
                    {alignItems:'center',justifyContent:'flex-start'}: 
                    {alignSelf:'flex-start'},
                rounded&& {
                    borderRadius: 5
                },
                padding
            ]}>
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onFocus={onFocus}
                onHoverOut={hoverOutState}
                onPressOut={pressOutState}
                onBlur={onBlur}
                style={[{width:'100%',height:'100%'},padding]}
                >
                {asChild? children :
                <Text selectable={false} style={{
                    color:color,
                    textAlign: 'center',
                    fontSize: fontSize,
                    pointerEvents: 'box-none'
                    }}>
                    {props.title}
                </Text>}
            </Pressable>
        </Animated.View>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    button:{
        variants:{
            variant:{
                primary: {
                    backgroundColor: theme.color['primary'],
                    hoverColor: Color(theme.color['primary']).darken(.5).toString(),
                    color: 'white',
                },
                secondary: {
                    backgroundColor: theme.color['secondary'],
                    hoverColor: Color(theme.color['secondary']).darken(.5).toString(),
                    color: 'white',
                },
                tertiary: {
                    backgroundColor: theme.color['tertiary'],
                    hoverColor: Color(theme.color['tertiary']).darken(.5).toString(),
                    color: 'white',
                },
                success: {
                    backgroundColor: theme.color['success'],
                    hoverColor: Color(theme.color['success']).darken(.5).toString(),
                    color: 'white',
                },
                warning: {
                    backgroundColor: theme.color['warning'],
                    hoverColor: Color(theme.color['warning']).darken(.5).toString(),
                    color: 'white',
                },
                error: {
                    backgroundColor: theme.color['error'],
                    hoverColor: Color(theme.color['error']).darken(.5).toString(),
                    color: 'white',
                },
                black:{
                    backgroundColor: theme.color['black'],
                    hoverColor: theme.color['darkGray'],
                    color: theme.color['white']
                },
                white:{
                    backgroundColor: theme.color['white'],
                    hoverColor: theme.color['lightGray'],
                    color: theme.color['black']
                },
            },
            sizes:{
                'xs': {
                    fontSize: FontSizes['xs'],
                    paddingHorizontal: 4,
                    paddingVertical: 2
                },
                'sm': {
                    fontSize: FontSizes['sm'],
                    paddingHorizontal: 6,
                    paddingVertical: 2
                },
                'md': {
                    fontSize: FontSizes['md'],
                    paddingHorizontal: 8,
                    paddingVertical: 3
                },
                'lg': {
                    fontSize: FontSizes['lg'],
                    paddingHorizontal: 10,
                    paddingVertical: 3
                },
                'xl': {
                    fontSize: FontSizes['xl'],
                    paddingHorizontal: 12,
                    paddingVertical: 4
                },
                '2xl': {
                    fontSize: FontSizes['2xl'],
                    paddingHorizontal: 14,
                    paddingVertical: 5
                },
            }
        }
    }
})))

export default Button