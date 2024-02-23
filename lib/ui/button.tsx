import React from 'react';
import Color from 'color';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable, Text } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps } from '..';
import { FontSizes } from '../unistyles';
/**
 * 
 * @param Button You can provide more params than ViewProps
 * - title - title of the button
 * - variant - primary, secondary, tertiary, success, warning, error, black, white 
 * - block - will display as a block (no floating)
 * - asChild - will not get the theme optimization just as in title but you can provide more details
 * - size - xs, sm, md, lg, xl (default to xs when asChild is true)
 * - rounded - border rounded or not
 * - disabled - will display hover color as default
 * - animateScale - will or not animate the scale effect on press 
 * - italic - italic the title 
 * - onPress, onHover, onPressOut, onPressOut, onBlur, onFocus can be provided 
 * - children - provide this when asChild is true 
 * @returns Button react node
 */
function Button(props:BtnProps){
    //Destructuring the properties
    const {
        block=false,
        asChild=false,
        rounded=true,
        disabled=false,
        variant='primary',
        size='md',
        animateScale=!disabled,
        italic=false,
        onPress=()=>{},
        onHover=()=>{},
        onHoverOut=()=>{},
        onPressOut=()=>{},
        onBlur=()=>{},
        onFocus=()=>{},
        children
    } = props;

    const [hover,setHover] = React.useState(disabled? true: false);
    const {styles:{button,textStyle}} = useStyles(styleSheet,{variant:variant,sizes:size});

    const hoverColor = React.useRef(variant==='black'? 
        '#1f2937':
        Color(button.backgroundColor).darken(.3).toString());

    const scale = useSharedValue(1);
    
    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{scale: scale.value}],
    }));
    
    const originalState = () =>{
        if(disabled) setHover(true);
        else setHover(false);
    }

    const hoverState = () =>{
        setHover(true);
        onHover();
    }

    const pressState = () =>{
        setHover(true);
        onPress();
    }
    const pressInState = () =>{
        if(animateScale) scale.value = withTiming(0.95, {duration:50});
    }
    const hoverOutState = () =>{
        originalState();
        onHoverOut();
    }
    const pressOutState = ()=>{
        if(animateScale) scale.value = withTiming(1, {duration:100});
        originalState();
        onPressOut();
    }
    return(
        <Animated.View {...props}
            style={[props.style,
                animatedStyles,
                {position:'relative'},
                block? 
                    {alignItems:'center'}: 
                    {alignSelf:'flex-start'},
                {backgroundColor: hover? hoverColor.current : button.backgroundColor}, 
            ]}
        >
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onPressIn={pressInState}
                onPressOut={pressOutState}
                onFocus={onFocus}
                onHoverOut={hoverOutState}
                onBlur={onBlur}
                disabled={disabled}
                style={[ 
                    rounded&& {borderRadius: 5},
                    {
                        paddingHorizontal: button.paddingHorizontal,
                        paddingVertical: button.paddingVertical,
                    },
                    block&&{
                        width:'100%',
                        height:'100%'
                    }

                ]}
                >
                {asChild? children :
                <Text selectable={false} style={[textStyle,{
                    textAlign: 'center',
                    fontSize: FontSizes[size],
                    fontStyle: italic? 'italic' : 'normal',
                }]}>
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
                black:{
                    backgroundColor: theme.color.black,
                },
                white:{
                    backgroundColor: theme.color.white,
                },
            },
            sizes:{
                'xs': {
                    paddingHorizontal: 4,
                    paddingVertical: 2
                },
                'sm': {
                    paddingHorizontal: 6,
                    paddingVertical: 2
                },
                'md': {
                    paddingHorizontal: 10,
                    paddingVertical: 4
                },
                'lg': {
                    paddingHorizontal: 12,
                    paddingVertical: 4
                },
                'xl': {
                    paddingHorizontal: 16,
                    paddingVertical: 6
                },
                '2xl': {
                    paddingHorizontal: 20,
                    paddingVertical: 8
                },
            }
        },
    },
    textStyle:{
        variants:{
            variant:{
                primary:{
                    color: theme.color.primaryForeground,
                },
                secondary:{
                    color: theme.color.secondaryForeground,
                },
                tertiary:{
                    color: theme.color.tertiaryForeground,
                },
                success:{
                    color: theme.color.successForeground,
                },
                warning: {
                    color: theme.color.warningForeground,
                },
                error: {
                    color: theme.color.errorForeground,
                },
                black:{
                    color: theme.color.white
                },
                white:{
                    color: theme.color.black
                },
            },
        }
    },
})));

export default Button