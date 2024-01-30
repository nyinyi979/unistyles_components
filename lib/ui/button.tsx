import Color from 'color';
import React from 'react';
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BtnProps } from '../..';
import { Colors, FontSize, enableExperimentalMobileFirstStyle } from '../../unistyles';
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
        outlined,
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

    // default values 
    const usedStyle = React.useMemo(()=>{
        //get the current screen sizes
        const currentSize = mobileFistBreakpointStyles.current[breakpoint];

        //returning the new styles, as the breakpoint changes
        return [styles[variant],styles[currentSize? currentSize.size : size]]
    },[breakpoint])

    // destructring the button and size variants
    const btnVariant = usedStyle[0];
    const sizeVariant = usedStyle[1];

    const scale = useSharedValue(1);
    const backgroundColor = useSharedValue(
        outlined? styles['white'].backgroundColor : btnVariant.backgroundColor
    );
    const animatedStyles = useAnimatedStyle(()=>({
        backgroundColor: backgroundColor.value,
        transform: [{scale: scale.value}],
    }));
    
    const originalState = () =>{
        // when outlined background color would be white
        if(outlined) 
            backgroundColor.value = withTiming(styles['white'].backgroundColor,{duration:100});
        else 
            backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:100});
    }

    const hoverState = () =>{
        // when outlined hover, background color would be variant normal color ?
        if(outlined) 
            backgroundColor.value = withTiming(btnVariant.backgroundColor,{duration:100});
        else 
            backgroundColor.value = withTiming(btnVariant.hoverColor,{duration:100});
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
                style={[{width:'100%',height:'100%'},sizeVariant]}
                >
                <Text 
                    style={[{
                        color:btnVariant.color,
                        textAlign: 'center',
                        fontSize: sizeVariant.fontSize,
                        pointerEvents: 'box-none'
                        },
                        outlined&&{
                            color: btnVariant.pressedColor
                        },
                        
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
    'xs': {
        fontSize: FontSize.xs,
        paddingHorizontal: 6,
        paddingVertical: 2
    },
    'sm': {
        fontSize: FontSize.sm,
        paddingHorizontal: 8,
        paddingVertical: 2
    },
    'md': {
        fontSize: FontSize.md,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    'lg': {
        fontSize: FontSize.lg,
        paddingHorizontal: 12,
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