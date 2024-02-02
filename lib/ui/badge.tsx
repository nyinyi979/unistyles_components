import Color from 'color';
import React from 'react';
import mobileFirstBreakpointsChanging from '../utils/breakpoints_passing';
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BadgeProps } from '../';
import { Colors, FontSize, enableExperimentalMobileFirstStyle } from '../unistyles';
/**
 * 
 * @param ButtonProps You can provide more params than ViewProps
 * - title: value that you want to display,
 * - variant?: 'error', 'warning', 'success', 'tertiary', 'secondary', 'primary', 'outlined',
 * - size?: 'sm', 'md', 'lg', 'xl',
 * - breakpoints? for all screen types, you can provide sizes( will support more later )
 * @returns JSX Element Button
 */
function Badge(props:BadgeProps){
    const {styles,breakpoint} = useStyles(styleSheet);

    //Destructuring the properties
    const {
        variant='primary',
        size='md',
        breakpoints=undefined,
        rounded=true
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
        return {
            btnVariant: styles[variant],
            sizeVariant: styles[stylesAccordingToBreakpoints? stylesAccordingToBreakpoints.size : size]
        }
    },[breakpoint])

    // destructring the button and size variants
    const {btnVariant,sizeVariant} = usedStyle;
    
    const shadowStyles = {
        shadowColor: btnVariant.color,
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    }
    return(
        <View style={[{
            alignSelf:'flex-start',
            backgroundColor:btnVariant.backgroundColor,
            borderRadius:rounded? 5 : 0,},sizeVariant,shadowStyles]}>
            <Text style={{
                    color: btnVariant.color,
                    textAlign: 'center',
                    fontSize: sizeVariant.fontSize,
                    fontWeight: '700',
                }}>
                {props.title}
            </Text>
        </View>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    'primary': {
        backgroundColor: theme.color['primary'],
        color: Color(theme.color['primary']).darken(.7).toString(),
    },
    'secondary': {
        backgroundColor: theme.color['secondary'],
        color: Color(theme.color['secondary']).darken(.7).toString()
    },
    'tertiary': {
        backgroundColor: theme.color['tertiary'],
        color: Color(theme.color['tertiary']).darken(.7).toString()
    },
    'success': {
        backgroundColor: theme.color['success'],
        color: Color(theme.color['success']).darken(.7).toString()
    },
    'warning': {
        backgroundColor: theme.color['warning'],
        color: Color(theme.color['warning']).darken(.6).toString()
    },
    'error': {
        backgroundColor: theme.color['error'],
        color: Color(theme.color['error']).lighten(.8).toString()
    },
    'black': {
        backgroundColor: theme.color['black'],
        color: Colors.slate[200]
    },
    'white': {
        backgroundColor: theme.color['white'],
        color: Colors.slate[800]
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

export default Badge