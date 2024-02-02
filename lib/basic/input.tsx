import Color from "color";
import React from "react";
import mobileFirstBreakpointsChanging from "../utils/breakpoints_passing";
import { TextInput, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { InputProps } from "..";
import { enableExperimentalMobileFirstStyle } from "../unistyles";

export default function Input(props: InputProps){
    const {
        variant='white',
        width=100,
        paddingHorizontal=10,
        paddingVertical=5,
        borderRadius=3,
        borderWidth=2,
        breakpoints=undefined
    } = props;

    const {styles,breakpoint} = useStyles(styleSheet);
    
    //current breakpoints
    const mobileFistBreakpointStyles = React.useRef(
        enableExperimentalMobileFirstStyle? 
        mobileFirstBreakpointsChanging(breakpoints, {
            width: width,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            borderWidth: borderWidth
        }):
        {   ...breakpoints,
            xs: {
                width: width,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical
            }
        }
    )
    const [focus, setFocus] = React.useState(false);

    // style values according to breakpoints 
    const usedStyles = React.useMemo(()=>{
        //get the current screen sizes
        const stylesAccordingToBreakpoints = mobileFistBreakpointStyles.current[breakpoint];
        const inputBoxStyles = {
            ...styles[variant],
            borderWidth: stylesAccordingToBreakpoints.borderWidth,
            outline: 'none',
            paddingHorizontal: stylesAccordingToBreakpoints.paddingHorizontal,
            paddingVertical: stylesAccordingToBreakpoints.paddingVertical,
            borderRadius: borderRadius,
        }
        const viewStyles = {
            width: stylesAccordingToBreakpoints.width,
        }
        return {
            inputBoxStyles: inputBoxStyles,
            viewStyles: viewStyles
        }
        //returning the new styles, as the breakpoint changes
    },[breakpoint])
    const {inputBoxStyles,viewStyles} = usedStyles;

    return(
        <View style={[viewStyles,{alignSelf:'flex-start'}]}>
            <TextInput 
                {...props} placeholderTextColor={inputBoxStyles.borderColor}
                style={[inputBoxStyles,
                    {borderColor: focus? inputBoxStyles.focusColor : inputBoxStyles.borderColor}
                ]} onFocus={()=>{setFocus(true)}} onBlur={()=>{setFocus(false)}}
                />
        </View>
    )
}

const styleSheet = createStyleSheet((theme => ({
    'primary': {
        backgroundColor: theme.color['primary'],
        borderColor: Color(theme.color['primary']).darken(.2).toString(),
        focusColor: Color(theme.color['primary']).darken(.4).toString(),
        color: 'white',
    },
    'secondary': {
        backgroundColor: theme.color['secondary'],
        borderColor: Color(theme.color['secondary']).darken(.2).toString(),
        focusColor: Color(theme.color['secondary']).darken(.4).toString(),
        color: 'white',
    },
    'tertiary': {
        backgroundColor: theme.color['tertiary'],
        borderColor: Color(theme.color['tertiary']).darken(.2).toString(),
        focusColor: Color(theme.color['tertiary']).darken(.4).toString(),
        color: 'white',
    },
    'success': {
        backgroundColor: theme.color['success'],
        borderColor: Color(theme.color['success']).darken(.2).toString(),
        focusColor: Color(theme.color['success']).darken(.4).toString(),
        color: 'white',
    },
    'warning': {
        backgroundColor: theme.color['warning'],
        borderColor: Color(theme.color['warning']).darken(.2).toString(),
        focusColor: Color(theme.color['warning']).darken(.4).toString(),
        color: 'white'
    },
    'error': {
        backgroundColor: theme.color.error,
        borderColor: Color(theme.color['error']).darken(.2).toString(),
        focusColor: Color(theme.color['error']).darken(.4).toString(),
        color: 'white'
    },
    'black': {
        backgroundColor: theme.color['black'],
        borderColor: 'gray',
        color: theme.color['lightGray'],
        focusColor: theme.color['darkGray'] 
    },
    'white': {
        backgroundColor: theme.color['white'],
        borderColor: theme.color['lightGray'],
        focusColor: theme.color['darkGray'],
        color: theme.color['darkGray'],
    }
})))