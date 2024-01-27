import Color from 'color';
import React from 'react';
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps, BtnTypeArray } from '../..';

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
        onPress=()=>{},
        onHover=()=>{},
        onHoverOut=()=>{},
        onPressOut=()=>{}
    } = props;

    const usedStyle = React.useRef<BtnTypeArray>([styles.primaryBtn,styles.mediumBtn]);

    // destructring the button and size variants
    const btnVariant = usedStyle.current[0];
    const sizeVariant = usedStyle.current[1];

    // overriding the button color, if it is provided
    if(props.color) btnVariant.color = props.color;

    const backgroundColor = useSharedValue(btnVariant.backgroundColor);
    const backgroundColorStyle = useAnimatedStyle(()=>({
        backgroundColor: backgroundColor.value,
    }))

    // Type and size checking will only be performed once in this block scope ,
    // you can definitely do it in one line, change to the way that you would prefer
    React.useEffect(()=>{
        if(variant==='primary') usedStyle.current[0] = styles.primaryBtn;
        else if(variant==='secondary') usedStyle.current[0] = styles.secondaryBtn;
        else if(variant==='tertiary') usedStyle.current[0] = styles.tertiaryBtn;
        else if(variant==='outlined') usedStyle.current[0] = styles.outlinedBtn;
        else if(variant==='success') usedStyle.current[0]= styles.successBtn;
        else if(variant==='warning') usedStyle.current[0] = styles.warningBtn;
        else usedStyle.current[0] = styles.errorBtn;

        if(size==='sm') usedStyle.current[1] = styles.smallBtn;
        else if(size==='md') usedStyle.current[1] = styles.mediumBtn;
        else if(size==='lg') usedStyle.current[1] = styles.largeBtn;
        else usedStyle.current[1] = styles.extraLargeBtn;
    },[])

    const originalState = () =>{
        backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:100});
    }

    const hoverState = () =>{
       backgroundColor.value = withTiming(btnVariant.hoverColor,{duration:100});
       onHover();
    }
    const pressState = () =>{
        backgroundColor.value = withTiming(btnVariant.pressedColor,{duration:100});
        onPress();
        setTimeout(()=>{
          hoverState();
        },200)
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
            focusable
            style={[
                backgroundColorStyle,
                block? 
                    {alignItems:'center',justifyContent:'flex-start'}: 
                    {alignSelf:'flex-start'},
                variant==='outlined'? 
                {
                    borderWidth:btnVariant.borderWidth,
                    borderColor: btnVariant.borderColor,
                    borderStyle: 'solid'
                } : {}
                ,{...sizeVariant}
            ]}>
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onHoverOut={hoverOutState}
                onPressOut={pressOutState}
                >
                <Text 
                    style={{
                        color:btnVariant.color,
                        textAlign: 'center',
                        fontSize: sizeVariant.fontSize
                        }}>
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
    primaryBtn: {
        backgroundColor: theme.color.primary,
        hoverColor: Color(theme.color.primary).darken(.5).toString(),
        pressedColor: Color(theme.color.primary).darken(.7).toString(),
        color: 'white',
    },
    secondaryBtn: {
        backgroundColor: theme.color.secondary,
        hoverColor: Color(theme.color.secondary).darken(.5).toString(),
        pressedColor: Color(theme.color.secondary).darken(.7).toString(),
        color: 'white',
    },
    tertiaryBtn: {
        backgroundColor: theme.color.tertiary,
        hoverColor: Color(theme.color.tertiary).darken(.5).toString(),
        pressedColor: Color(theme.color.tertiary).darken(.7).toString(),
        color: 'white',
    },
    successBtn: {
        backgroundColor: theme.color.success,
        hoverColor: Color(theme.color.success).darken(.5).toString(),
        pressedColor: Color(theme.color.success).darken(.7).toString(),
        color: 'white',
    },
    warningBtn: {
        backgroundColor: theme.color.warning,
        hoverColor: Color(theme.color.warning).darken(.5).toString(),
        pressedColor: Color(theme.color.warning).darken(.7).toString(),
        color: 'white',
    },
    errorBtn: {
        backgroundColor: theme.color.error,
        hoverColor: Color(theme.color.error).darken(.5).toString(),
        pressedColor: Color(theme.color.error).darken(.7).toString(),
        color: 'white',
    },
    outlinedBtn: {
        backgroundColor: theme.color.slate[100],
        pressedColor: theme.color.slate[300],
        hoverColor: theme.color.slate[200],
        color: 'black',
        borderColor: theme.color.slate[400],
        borderWidth: theme.size[0.5]
    },
    smallBtn: {
        fontSize: theme.fontSize.sm,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    mediumBtn: {
        fontSize: theme.fontSize.md,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    largeBtn: {
        fontSize: theme.fontSize.lg,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    extraLargeBtn: {
        fontSize: theme.fontSize.xl,
        paddingHorizontal: 25,
        paddingVertical: 30
    },
})))
