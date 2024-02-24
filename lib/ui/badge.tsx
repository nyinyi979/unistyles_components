import React from 'react';
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BadgeProps } from '../';
import { FontSizes } from '../unistyles';
import Color from 'color';
/**
 * 
 * @param Badge
 * - title - title of the badge
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - size - xs, sm, md, lg, xl
 * - rounded - the badge will be a bit rounded if true
 * @returns Badge react node
 */
function Badge(props:BadgeProps){
    //Destructuring the properties
    const {
        variant='ghost',
        size='md',
        rounded=true,
        shadow=true
    } = props;

    const {styles:{badge,textStyle}} = useStyles(styleSheet,{
        sizes: size,
        variant: variant,
    });
    return(
        <View style={[badge(rounded),
            shadow&&{
                shadowOffset: { width: 3, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,  
                elevation: 5,
                shadowColor: Color(textStyle.color).lighten(1.4).toString(),
            }
        ]}>
            <Text style={[textStyle,{fontSize:FontSizes[size]}]}>
                {props.title}
            </Text>
        </View>
    )
}

/** All of the available styles for the button
 *  Customization of the buttons' styles can be done here!
 */
const styleSheet = createStyleSheet((theme => ({
    badge: (rounded: boolean)=>({
        alignSelf: 'flex-start',
        borderRadius: rounded? 5 : 0,
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color.primary,
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                },
                success:{
                    backgroundColor: theme.color.success,
                },
                warning: {
                    backgroundColor: theme.color.warning,
                },
                error: {
                    backgroundColor: theme.color.error,
                },
                ghost:{
                    backgroundColor: theme.color.white,
                },
            },
            sizes:{
                'xs': {
                    paddingHorizontal: 4,
                    paddingVertical: 2
                },
                'sm': {
                    paddingHorizontal: 6,
                    paddingVertical: 2
                },
                'md': {
                    paddingHorizontal: 10,
                    paddingVertical: 4
                },
                'lg': {
                    paddingHorizontal: 12,
                    paddingVertical: 4
                },
                'xl': {
                    paddingHorizontal: 16,
                    paddingVertical: 6
                },
                '2xl': {
                    paddingHorizontal: 20,
                    paddingVertical: 8
                },
            }
        }
    }),
    textStyle:{
        textAlign: 'center',
        fontWeight: '700',
        variants:{
            variant:{
                primary:{
                    color: theme.color.primaryForeground,
                },
                secondary:{
                    color: theme.color.secondaryForeground,
                },
                tertiary:{
                    color: theme.color.tertiaryForeground,
                },
                success:{
                    color: theme.color.successForeground,
                },
                warning: {
                    color: theme.color.warningForeground,
                },
                error: {
                    color: theme.color.errorForeground,
                },
                ghost:{
                    color: theme.color.black
                },
            },
        }
    },
})));

export default Badge