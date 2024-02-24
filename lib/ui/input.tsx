import Color from "color";
import React from "react";
import { TextInput, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { InputProps } from "..";
import { FontSizes } from "../unistyles";

/**
 * 
 * @param Input
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - width - width of the input box
 * - paddingHorizontal - padding interior (default - 10)
 * - paddingVertical - padding interior (default - 5)
 * - borderRadius - (default - 5)
 * - borderWidth - (default - 2)
 * - fontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl 
 * - disabled - boolean
 * @returns Input react node
 */
function Input(props: InputProps){
    const {
        variant='ghost',
        width=100,
        paddingHorizontal=10,
        paddingVertical=5,
        borderRadius=3,
        borderWidth=2,
        fontSize='md',
        disabled=false
    } = props;

    const [focus,setFocus] = React.useState(disabled? true: false);
    const {styles:{inputBox,textStyle}} = useStyles(styleSheet,{variant:variant});

    const borderColor = React.useRef(Color(inputBox.borderColor).darken(.3).toString());
    const usedBorder = focus? borderColor.current : inputBox.borderColor;

    return(
        <View style={[inputBox,{alignSelf:'flex-start',width,borderWidth,borderRadius,borderColor:usedBorder}]}>
            <TextInput 
                {...props} placeholderTextColor={usedBorder}
                style={[inputBox,textStyle,
                    {   
                        outlineStyle:'none',
                        paddingHorizontal,paddingVertical,
                        fontSize: FontSizes[fontSize]
                    }
                ]} onFocus={()=>{setFocus(true)}} onBlur={()=>{setFocus(false)}}
                />
        </View>
    )
}

const styleSheet = createStyleSheet((theme => ({
    inputBox:{
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color.primary,
                    borderColor: Color(theme.color.primary).darken(.2).toString(),
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                    borderColor: Color(theme.color.secondary).darken(.2).toString(),
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                    borderColor: Color(theme.color.tertiary).darken(.2).toString(),
                },
                success:{
                    backgroundColor: theme.color.success,
                    borderColor: Color(theme.color.success).darken(.2).toString(),
                },
                warning: {
                    backgroundColor: theme.color.warning,
                    borderColor: Color(theme.color.warning).darken(.2).toString(),
                },
                error: {
                    backgroundColor: theme.color.error,
                    borderColor: Color(theme.color.error).darken(.2).toString(),
                },
                ghost:{
                    backgroundColor: theme.color.white,
                    borderColor: '#6b7280',
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
        },
    },
    textStyle:{
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

export default Input