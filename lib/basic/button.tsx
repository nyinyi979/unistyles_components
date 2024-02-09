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
 * - variant - primary, secondary, tertiary, success, warning, error, black, white ( accessed by dot signature )
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
        size=asChild? 'xs':'md',
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

    const [hover,setHover] = React.useState<'normal'|'hover'>(disabled? 'hover':'normal');
    const {styles:{button}} = 
    variant==='primary'? useStyles(styleSheet,{primary:hover,sizes:size}) :
    variant==='secondary'? useStyles(styleSheet,{secondary:hover,sizes:size}) :
    variant==='tertiary'? useStyles(styleSheet,{tertiary:hover,sizes:size}) :
    variant==='success'? useStyles(styleSheet,{success:hover,sizes:size}) :
    variant==='warning'? useStyles(styleSheet,{warning:hover,sizes:size}) :
    variant==='error'? useStyles(styleSheet,{error:hover,sizes:size}) :
    variant==='black'? useStyles(styleSheet,{black:hover,sizes:size}) :
    useStyles(styleSheet,{white:hover,sizes:size});

    const color = button.color;
    const fontSize = button.fontSize;
    const padding = {
        paddingHorizontal: button.paddingHorizontal,
        paddingVertical: button.paddingVertical
    }

    const scale = useSharedValue(1);
    
    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{scale: scale.value}],
    }));
    
    const originalState = () =>{
        setHover('normal');
    }

    const hoverState = () =>{
        setHover('hover');
        onHover();
    }

    const pressState = () =>{
        if(animateScale) scale.value = withTiming(0.92, {duration:100});
        setHover('hover');
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
                padding,button
            ]}
        >
            <Pressable
                onHoverIn={hoverState}
                onPress={pressState}
                onFocus={onFocus}
                onHoverOut={hoverOutState}
                onPressOut={pressOutState}
                onBlur={onBlur}
                style={[{width:'100%',height:'100%'},padding]}
                disabled={disabled}
            >
                {asChild? children :
                <Text selectable={false} style={{
                    color:color,
                    textAlign: 'center',
                    fontSize: fontSize,
                    fontStyle: italic? 'italic' : 'normal'
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
            primary:{
                normal:{
                    backgroundColor: theme.color['primary'],
                    color: 'black',
                },
                hover:{
                    backgroundColor: Color(theme.color['primary']).darken(.5).toString(),
                    color: 'black',
                }
            },
            secondary:{
                normal:{
                    backgroundColor: theme.color['secondary'],
                    color: 'white',
                },
                hover:{
                    backgroundColor: Color(theme.color['secondary']).darken(.5).toString(),
                    color: 'white',
                }
            },
            tertiary:{
                normal:{
                    backgroundColor: theme.color['tertiary'],
                    color: 'black',
                },
                hover:{
                    backgroundColor: Color(theme.color['tertiary']).darken(.5).toString(),
                    color: 'black'
                },
            },
            success:{
                normal:{
                    backgroundColor: theme.color['success'],
                    color: 'black',
                },
                hover:{
                    backgroundColor: Color(theme.color['success']).darken(.5).toString(),
                    color: 'black'
                },
            },
            warning: {
                normal:{
                    backgroundColor: theme.color['warning'],
                    color: 'black',
                },
                hover:{
                    backgroundColor: Color(theme.color['warning']).darken(.5).toString(),
                    color: 'black'
                }
            },
            error: {
                normal:{
                    backgroundColor: theme.color['error'],
                    color: 'white',
                },
                hover:{
                    backgroundColor: Color(theme.color['error']).darken(.5).toString(),
                    color: 'white'
                }
            },
            black:{
                normal:{
                    backgroundColor: theme.color['black'],
                    color: theme.color['white']
                },
                hover:{
                    backgroundColor: theme.color['darkGray'],
                    color: theme.color['white']
                }
            },
            white:{
                normal:{
                    backgroundColor: theme.color['white'],
                    color: theme.color['black']
                },
                hover:{
                    backgroundColor: theme.color['lightGray'],
                    color: theme.color['black']
                }
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
})));

export default Button