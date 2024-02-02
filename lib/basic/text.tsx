import React from "react"
import { Text } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { Colors, FontSize, enableExperimentalMobileFirstStyle } from "../unistyles";
import { TextProp } from "../";
import mobileFirstBreakpointsChanging from "../utils/breakpoints_passing";

// Add the colors that need to be changed according to light mode and dark mode here
const themeColors = ['primary','secondary','tertiary','success','warning','error','black','white'];

/**
 * 
 * @param - Paragraph just like in web ( but inline, use inside a div|view to be a block )
 * - fontSize: xxs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | 6xl
 * - color: theme colors : 'primary','secondary','tertiary','success','warning','error','black','white'...
 * - tint: others than theme colors tint should be provided 
 * - fontWeight: 100 - 900 , boldness of the text
 * - breakpoints: breakpoint styles of the text. currently supported for fontSize, fontWeight and textAlign
 * @returns 
 */
export default function P(TextProp: TextProp){
    const {
        fontSize='md',
        color='black',
        tint=500,
        fontWeight='300',
        textAlign="left",
        breakpoints=undefined
    } = TextProp;

    const {styles,breakpoint} = useStyles(StyleSheet);

    //current breakpoints
    const mobileFistBreakpointStyles = React.useRef(
        enableExperimentalMobileFirstStyle? 
        mobileFirstBreakpointsChanging(breakpoints, {
            fontSize: fontSize,
            textAlign: textAlign,
            fontWeight: fontWeight
        }):
        {   ...breakpoints,
            xs:{
                fontSize: fontSize,
                textAlign: textAlign,
                fontWeight: fontWeight
            }
        }
    )
    const fontStyle = React.useMemo(()=>{
        const arr = [];

        //get the current screen styles
        const stylesAccordingToBreakpoints = mobileFistBreakpointStyles.current[breakpoint];

        // Set for better optimized searching
        const colorsToCheck = new Set(themeColors);
        
        // pushing the styles
        arr.push({fontSize:FontSize[stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.fontSize: fontSize]});

        arr.push({fontWeight:stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.fontWeight: fontWeight});

        arr.push({textAlign:stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.textAlign: textAlign});

        if(colorsToCheck.has(color)) {
            // dark and light mode colors 
            arr.push(styles[color])
        }
        else {
            // simple colors 
            arr.push({color:Colors[color][tint]})
        }
        return arr;
    },[fontSize,breakpoint]);

    return (
        <Text {...TextProp} style={fontStyle}>
            {TextProp.children}
        </Text>
    )
}


/** For dark mode and light mode colors, please extend it from here */
const StyleSheet = createStyleSheet((theme)=>({
    'primary':{
        color: theme.color['primary']
    },
    'secondary':{
        color: theme.color['secondary']
    },
    'tertiary':{
        color: theme.color['tertiary']
    },
    'success':{
        color: theme.color['success']
    },
    'warning':{
        color: theme.color['warning']
    },
    'error':{
        color: theme.color['error']
    },
    'black':{
        color: theme.color['black']
    },
    'white':{
        color: theme.color['white']
    }
}))