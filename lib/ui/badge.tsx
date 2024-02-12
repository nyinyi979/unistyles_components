import React from 'react';
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BadgeProps } from '../';
import { FontSizes } from '../unistyles';
/**
 * 
 * @param Badge
 * - title - title of the badge
 * - variant - primary, secondary, tertiary, success, warning, error, black, white
 * - size - xs, sm, md, lg, xl
 * - rounded - the badge will be a bit rounded if true
 * @returns Badge react node
 */
function Badge(props:BadgeProps){
    //Destructuring the properties
    const {
        variant='primary',
        size='md',
        rounded=true
    } = props;

    const {styles:{badge}} = useStyles(styleSheet,{
        sizes: size,
        variant: variant
    });
    
    const shadowStyles = {
        shadowColor: badge.color,
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    }
    const viewStyle:ViewStyle = {
        alignSelf: 'flex-start',
        backgroundColor: badge.backgroundColor,
        borderRadius: rounded? 5 : 0,
        paddingHorizontal: badge.paddingHorizontal,
        paddingVertical: badge.paddingVertical
    }
    const textStyle:TextStyle = {
        color: variant==='black'? 'white': badge.color,
        textAlign: 'center',
        fontSize: badge.fontSize,
        fontWeight: '700',
    }
    return(
        <View style={[viewStyle,shadowStyles]}>
            <Text style={textStyle}>
                {props.title}
            </Text>
        </View>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    badge:{
        variants:{
            variant:{
                primary: {
                    backgroundColor: theme.color['primary'],
                    color: theme.color['primaryForeground'],
                },
                secondary: {
                    backgroundColor: theme.color['secondary'],
                    color: theme.color['secondaryForeground'],
                },
                tertiary: {
                    backgroundColor: theme.color['tertiary'],
                    color: theme.color['tertiaryForeground'],
                },
                success: {
                    backgroundColor: theme.color['success'],
                    color: theme.color['successForeground'],
                },
                warning: {
                    backgroundColor: theme.color['warning'],
                    color: theme.color['warningForeground'],
                },
                error: {
                    backgroundColor: theme.color['error'],
                    color: theme.color['errorForeground'],
                },
                black: {
                    backgroundColor: theme.color['black'],
                    color: theme.color['darkGray']
                },
                white: {
                    backgroundColor: theme.color['white'],
                    color: theme.color['black']
                }
            },
            sizes:{
                'xs': {
                    fontSize: FontSizes['xs'],
                    paddingHorizontal: 6,
                    paddingVertical: 2
                },
                'sm': {
                    fontSize: FontSizes['sm'],
                    paddingHorizontal: 8,
                    paddingVertical: 2
                },
                'md': {
                    fontSize: FontSizes['md'],
                    paddingHorizontal: 10,
                    paddingVertical: 3
                },
                'lg': {
                    fontSize: FontSizes['lg'],
                    paddingHorizontal: 12,
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
                }
            }
        }
    }
    
    
})))

export default Badge