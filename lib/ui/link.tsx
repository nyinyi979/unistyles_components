import React from "react";
import Animated from "react-native-reanimated";
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
                    color: theme.color['primaryForeground']
                }
            },
            secondary: {
                normal:{
                    color: theme.color['secondary']
                },
                hover:{
                    color: theme.color['secondaryForeground']
                }
            },
            tertiary: {
                normal:{
                    color: theme.color['tertiary']
                },
                hover:{
                    color: theme.color['tertiaryForeground']
                }
            },
            success: {
                normal:{
                    color: theme.color['success']
                },
                hover:{
                    color: theme.color['successForeground']
                }
            },
            warning: {
                normal:{
                    color: theme.color['warning']
                },
                hover:{
                    color: theme.color['warningForeground']
                }
            },
            error: {
                normal:{
                    color: theme.color['error']
                },
                hover:{
                    color: theme.color['errorForeground']
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