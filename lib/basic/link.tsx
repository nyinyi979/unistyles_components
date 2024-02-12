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
        disabled=false
    } = props;
    
    const [hover,setHover] = React.useState<'normal'|'hover'>(disabled? 'hover':'normal');
    const {styles:{link}} = 
    variant==='primary'? useStyles(styleSheet,{primary:hover}) :
    variant==='secondary'? useStyles(styleSheet,{secondary:hover}) :
    variant==='tertiary'? useStyles(styleSheet,{tertiary:hover}) :
    variant==='success'? useStyles(styleSheet,{success:hover}) :
    variant==='warning'? useStyles(styleSheet,{warning:hover}) :
    variant==='error'? useStyles(styleSheet,{error:hover}) :
    variant==='black'? useStyles(styleSheet,{black:hover}) :
    useStyles(styleSheet,{white:hover});


    const originalState = () =>{    
        setHover('normal');
    }
    const hoverState = () =>{
        setHover('hover');
        onHover();
    }
    const pressState = () =>{
        hoverState();
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
            <Animated.Text style={[{
                fontSize: FontSizes[fontSize],
                color: link.color
            }]}>
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
            primary: {
                normal:{
                    color: theme.color['primary'],
                },          
                hover:{
                    color: Color(theme.color['primary']).darken(.2).toString(),
                }
            },
            secondary: {
                normal:{
                    color: theme.color['secondary']
                },
                hover:{
                    color: Color(theme.color['secondary']).darken(.2).toString()
                }
            },
            tertiary: {
                normal:{
                    color: theme.color['tertiary']
                },
                hover:{
                    color: Color(theme.color['tertiary']).darken(.2).toString()
                }
            },
            success: {
                normal:{
                    color: theme.color['success']
                },
                hover:{
                    color: Color(theme.color['success']).darken(.2).toString()
                }
            },
            warning: {
                normal:{
                    color: theme.color['warning']
                },
                hover:{
                    color: Color(theme.color['warning']).darken(.2).toString()
                }
            },
            error: {
                normal:{
                    color: theme.color['error']
                },
                hover:{
                    color: Color(theme.color['error']).darken(.2).toString()
                }
            },
            black: {
                normal:{
                    color: theme.color['black']
                },
                hover:{
                    color: theme.color['darkGray']
                }
            },
            white: {
                normal:{
                    color: theme.color['white']
                },
                hover:{
                    color: theme.color['lightGray']
                }
            }
            
        }
    }
})));

export default LinkBtn