import { View } from "react-native";
import { DivProps } from "../breakpoints";
import { enableExperimentalMobileFirstStyle } from "../unistyles";
import React from "react";
import mobileFirstBreakpointsChanging from "../utils/breakpoints_passing";
import { useStyles } from "react-native-unistyles";

/**
 * @param
 * - breakpoints which will take any styles :)
 * @returns a view element, which is optimized with breakpoints
 */
export default function Div(props: DivProps){
    const {
        breakpoints=undefined,
        style,
    } = props;

    const {breakpoint} = useStyles();

    //current breakpoints
    const mobileFistBreakpointStyles = React.useRef(
        enableExperimentalMobileFirstStyle? 
        mobileFirstBreakpointsChanging(breakpoints, style):
        {   ...breakpoints,
            xs: style
        }
    )
    // get the breakpoint styles
    const usedStyles = React.useMemo(()=>{
        const stylesAccordingToBreakpoints = mobileFistBreakpointStyles.current[breakpoint];

        return stylesAccordingToBreakpoints? stylesAccordingToBreakpoints : style;
    },[breakpoint])
    return(
        <View {...props} style={usedStyles}>

        </View>
    )
}
