import Color from "color";
import React from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import mobileFirstBreakpointsChanging from "../utils/breakpoints_passing";
import { LinkBtnProps } from "..";
import { Pressable} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { FontSizes, enableExperimentalMobileFirstStyle } from "../unistyles";

/** It is not named Link because there are a lot of libraries out there using Link. */
function LinkBtn(props: LinkBtnProps){
    const {
        variant='primary',
        onPress=()=>{},
        onHover=()=>{},
        fontSize='md',
        breakpoints=undefined
    } = props;
    
    const {styles,breakpoint} = useStyles(styleSheet);

    //current breakpoints
    const mobileFistBreakpointStyles = React.useRef(
        enableExperimentalMobileFirstStyle? 
        mobileFirstBreakpointsChanging(breakpoints, {
            fontSize: fontSize
        }):
        {   ...breakpoints,
            xs: {fontSize: fontSize}
        }
    )

    // style values according to breakpoints 
    const usedStyles = React.useMemo(()=>{
        //get the current screen sizes
        const stylesAccordingToBreakpoints = mobileFistBreakpointStyles.current[breakpoint];

        //returning the new styles, as the breakpoint changes
        return {
            linkVariant: styles[variant],
            fontVariant: styles[stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.fontSize : fontSize]}
    },[breakpoint]);

    const {fontVariant,linkVariant} = usedStyles;
    const usedColor = useSharedValue(linkVariant.color);

    const originalState = () =>{
        usedColor.value = withTiming(linkVariant.color,{duration:50});
    }
    const hoverState = () =>{
        usedColor.value = withTiming(linkVariant.hoverColor,{duration:50});
        onHover();
    }
    const pressState = () =>{
        usedColor.value = withTiming(linkVariant.hoverColor,{duration:50});
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
            <Animated.Text style={{
                    color:usedColor,
                    textAlign: 'center',
                    fontSize: FontSizes[fontVariant],
                    pointerEvents: 'box-none'
                    }}
                >
                {props.title}
            </Animated.Text>
        </Pressable>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    'primary': {
        hoverColor: Color(theme.color['primary']).lighten(.2).toString(),
        color: theme.color['primary'],
    },
    'secondary': {
        hoverColor: Color(theme.color['secondary']).lighten(.2).toString(),
        color: theme.color['secondary'],
    },
    'tertiary': {
        hoverColor: Color(theme.color['tertiary']).lighten(.2).toString(),
        color: theme.color['tertiary'],
    },
    'success': {
        hoverColor: Color(theme.color['success']).lighten(.2).toString(),
        color: theme.color['success'],
    },
    'warning': {
        hoverColor: Color(theme.color['warning']).lighten(.2).toString(),
        color: theme.color['warning'],
    },
    'error': {
        hoverColor: Color(theme.color['error']).lighten(.2).toString(),
        color: theme.color['error'],
    },
    'black': {
        hoverColor: theme.color['darkGray'],
        color: theme.color['black'],
    },
    'white': {
        hoverColor: theme.color['lightGray'],
        color: theme.color['white'],
    }
})))

export default LinkBtn