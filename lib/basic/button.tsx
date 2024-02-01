import Color from 'color';
import React from 'react';
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps } from '..';
import { Colors, FontSize, enableExperimentalMobileFirstStyle } from '../unistyles';
import mobileFirstBreakpointsChanging from '../utils/breakpoints_passing';
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
 * - breakpoints? for all screen types, you can provide sizes( will support more later )
 * @returns JSX Element Button
 */
function Button(props:BtnProps){
    const {styles,breakpoint} = useStyles(styleSheet);

    //Destructuring the properties
    const {
        variant='primary',
        block=false,
        size='md',
        rounded=true,
        onPress=()=>{},
        onHover=()=>{},
        onHoverOut=()=>{},
        onPressOut=()=>{},
        breakpoints=undefined
    } = props;

    //current breakpoints
    const mobileFistBreakpointStyles = React.useRef(
        enableExperimentalMobileFirstStyle? 
        mobileFirstBreakpointsChanging(breakpoints, {
            size: size
        }):
        {   ...breakpoints,
            xs: {size: size}
        }
    )

    // style values according to breakpoints 
    const usedStyle = React.useMemo(()=>{
        //get the current screen sizes
        const stylesAccordingToBreakpoints = mobileFistBreakpointStyles.current[breakpoint];

        //returning the new styles, as the breakpoint changes
        return [styles[variant],styles[stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.size : size]]
    },[breakpoint])

    // destructring the button and size variants
    const btnVariant = usedStyle[0];
    const sizeVariant = usedStyle[1];

    const scale = useSharedValue(1);
    const backgroundColor = useSharedValue(
        btnVariant.backgroundColor
    );
    const animatedStyles = useAnimatedStyle(()=>({
        backgroundColor: backgroundColor.value,
        transform: [{scale: scale.value}],
    }));
    
    const originalState = () =>{
        backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:150});
    }

    const hoverState = () =>{
        backgroundColor.value = withTiming(btnVariant.hoverColor,{duration:150});
        onHover();
    }

    const pressState = () =>{
        scale.value = withTiming(1.02, {duration:100});
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
                {position:'relative'},
                animatedStyles,
                block? 
                    {alignItems:'center',justifyContent:'flex-start'}: 
                    {alignSelf:'flex-start'},
                rounded&& {
                    borderRadius: 5
                },
                ,sizeVariant
            ]}>
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onHoverOut={hoverOutState}
                onPressOut={pressOutState}
                style={[{width:'100%',height:'100%'},sizeVariant]}
                >
                <Text 
                    style={{
                        color:btnVariant.color,
                        textAlign: 'center',
                        fontSize: sizeVariant.fontSize,
                        pointerEvents: 'box-none'
                        }
                        }>
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
        color: 'white',
    },
    'secondary': {
        backgroundColor: theme.color.secondary,
        hoverColor: Color(theme.color.secondary).darken(.5).toString(),
        color: 'white',
    },
    'tertiary': {
        backgroundColor: theme.color.tertiary,
        hoverColor: Color(theme.color.tertiary).darken(.5).toString(),
        color: 'white',
    },
    'success': {
        backgroundColor: theme.color.success,
        hoverColor: Color(theme.color.success).darken(.5).toString(),
        color: 'white',
    },
    'warning': {
        backgroundColor: theme.color.warning,
        hoverColor: Color(theme.color.warning).darken(.5).toString(),
        color: 'white',
    },
    'error': {
        backgroundColor: theme.color.error,
        hoverColor: Color(theme.color.error).darken(.5).toString(),
        color: 'white',
    },
    'black': {
        backgroundColor: theme.color['black'],
        hoverColor: theme.color['darkGray'],
        color: theme.color['lightGray'],
    },
    'white': {
        backgroundColor: theme.color['white'],
        hoverColor: theme.color['lightGray'],
        color: theme.color['darkGray'],
    },
    'xs': {
        fontSize: FontSize.xs,
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    'sm': {
        fontSize: FontSize.sm,
        paddingHorizontal: 6,
        paddingVertical: 2
    },
    'md': {
        fontSize: FontSize.md,
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    'lg': {
        fontSize: FontSize.lg,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    'xl': {
        fontSize: FontSize.xl,
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    '2xl': {
        fontSize: FontSize.xl,
        paddingHorizontal: 14,
        paddingVertical: 5
    },
})))

export default Button