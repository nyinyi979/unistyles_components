import Color from 'color';
import React from 'react';
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps, BtnTypeArray } from '../..';
import { Colors, FontSize } from '../../unistyles';
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
 * @returns JSX Element Button
 */
export default function Button(props:BtnProps){
    const {styles} = useStyles(styleSheet);

    //Destructuring the properties
    const {
        variant='primary',
        block=false,
        size='md',
        outlined,
        rounded=true,
        onPress=()=>{},
        onHover=()=>{},
        onHoverOut=()=>{},
        onPressOut=()=>{}
    } = props;

    // default values 
    const usedStyle = React.useRef<BtnTypeArray>([styles[variant],styles[size]]);

    // destructring the button and size variants
    const btnVariant = usedStyle.current[0];
    const sizeVariant = usedStyle.current[1];

    // overriding the button color, if it is provided
    if(props.color) btnVariant.color = props.color;

    const backgroundColor = useSharedValue(btnVariant.backgroundColor);
    const scale = useSharedValue(1);
    const animatedStyles = useAnimatedStyle(()=>({
        backgroundColor: backgroundColor.value,
        transform: [{scale: scale.value}]
    }));
    const originalState = () =>{
        // when outlined background color would be white
        if(outlined) backgroundColor.value = withTiming(styles['white'].backgroundColor,{duration:100});
        else backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:100});
    }

    const hoverState = () =>{
        // when outlined hover, background color would be variant normal color ?
        if(outlined) backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:100});
        else backgroundColor.value = withTiming(btnVariant.hoverColor,{duration:100});
        onHover();
    }
    const pressState = () =>{
        scale.value = withTiming(1.02, {duration:100});
        setTimeout(()=>{
            scale.value = withTiming(1, {duration:50});
            hoverState();
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
                {position:'relative'},
                animatedStyles,
                block? 
                    {alignItems:'center',justifyContent:'flex-start'}: 
                    {alignSelf:'flex-start'},
                outlined&& {
                    borderWidth: 2,
                    borderColor: btnVariant.hoverColor,
                    borderStyle: 'solid',
                    },
                rounded&& {
                    borderRadius: 5
                },
                ,sizeVariant
            ]}>
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onFocus={pressState}
                onHoverOut={hoverOutState}
                onPressOut={pressOutState}
                style={[{width:'100%',height:'100%',paddingHorizontal:sizeVariant.paddingHorizontal}]}
                >
                <Text 
                    style={[{
                        color:btnVariant.color,
                        textAlign: 'center',
                        fontSize: sizeVariant.fontSize
                        },
                        outlined&&{
                            color: btnVariant.pressedColor
                        }
                        ]}>
                    {props.title}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    'primary': {
        backgroundColor: theme.color.primary,
        hoverColor: Color(theme.color.primary).darken(.5).toString(),
        pressedColor: Color(theme.color.primary).darken(.7).toString(),
        color: 'white',
    },
    'secondary': {
        backgroundColor: theme.color.secondary,
        hoverColor: Color(theme.color.secondary).darken(.5).toString(),
        pressedColor: Color(theme.color.secondary).darken(.7).toString(),
        color: 'white',
    },
    'tertiary': {
        backgroundColor: theme.color.tertiary,
        hoverColor: Color(theme.color.tertiary).darken(.5).toString(),
        pressedColor: Color(theme.color.tertiary).darken(.7).toString(),
        color: 'white',
    },
    'success': {
        backgroundColor: theme.color.success,
        hoverColor: Color(theme.color.success).darken(.5).toString(),
        pressedColor: Color(theme.color.success).darken(.7).toString(),
        color: 'white',
    },
    'warning': {
        backgroundColor: theme.color.warning,
        hoverColor: Color(theme.color.warning).darken(.5).toString(),
        pressedColor: Color(theme.color.warning).darken(.7).toString(),
        color: 'white',
    },
    'error': {
        backgroundColor: theme.color.error,
        hoverColor: Color(theme.color.error).darken(.5).toString(),
        pressedColor: Color(theme.color.error).darken(.2).toString(),
        color: 'white',
    },
    'outlined': {
        backgroundColor: Colors.slate[100],
        pressedColor: Colors.slate[300],
        hoverColor: Colors.slate[200],
        color: 'black',
        borderColor: Colors.slate[400],
        borderWidth: 2
    },
    'black': {
        backgroundColor: theme.color['black'],
        hoverColor: Colors.slate[800],
        pressedColor: Colors.slate[700],
        color: 'white',
    },
    'white': {
        backgroundColor: theme.color['white'],
        hoverColor: Colors.slate[200],
        pressedColor: Colors.slate[300],
        color: 'black',
    },
    'sm': {
        fontSize: FontSize.sm,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    'md': {
        fontSize: FontSize.md,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    'lg': {
        fontSize: FontSize.lg,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    '2xl': {
        fontSize: FontSize.xl,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
})))
