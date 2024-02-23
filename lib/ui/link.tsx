import React from "react";
import Animated from "react-native-reanimated";
import { LinkBtnProps } from "..";
import { Pressable} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { FontSizes } from "../unistyles";
import Color from "color";

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
    
    let timeOut:NodeJS.Timeout;
    const [hover,setHover] = React.useState(disabled? true: false);
    const {styles:{link}} = useStyles(styleSheet,{variant:variant});

    const hoverColor = React.useRef(variant==='black'? 
        Color(link.color).lighten(.3).toString():
        Color(link.color).darken(.3).toString());

    const originalState = () =>{    
        setHover(false);
        clearInterval(timeOut);
    }
    const hoverState = () =>{
        setHover(true);
        onHover();
    }
    const pressState = () =>{
        hoverState();
        onPress();
        timeOut = setTimeout(()=>{
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
                color: hover? hoverColor.current : link.color
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
            variant:{
                primary: {
                    color: theme.color.primary,
                },
                primaryForeground: {
                    color: theme.color.primaryForeground,
                },
                secondary: {
                    color: theme.color.secondary
                },
                secondaryForeground: {
                    color: theme.color.secondaryForeground,
                },
                tertiary: {
                    color: theme.color.tertiary
                },
                tertiaryForeground: {
                    color: theme.color.tertiaryForeground,
                },
                success: {
                    color: theme.color.success
                },
                successForeground: {
                    color: theme.color.successForeground,
                },
                warning: {
                    color: theme.color.warning
                },
                warningForeground: {
                    color: theme.color.warningForeground,
                },
                error: {
                    color: theme.color.error
                },
                errorForeground: {
                    color: theme.color.errorForeground,
                },
                black: {
                    color: theme.color.black
                },
                white: {
                    color: theme.color.white
                },
                darkGray: {
                    color: theme.color.darkGray
                },
                lightGray: {
                    color: theme.color.lightGray
                }
            }
        }
    }
})));

export default LinkBtn