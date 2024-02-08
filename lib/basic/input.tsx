import Color from "color";
import React from "react";
import { TextInput, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { InputProps } from "..";
import { FontSizes } from "../unistyles";

/**
 * 
 * @param Input
 * - variant - primary, secondary, tertiary, success, warning, error, black, white
 * - width - width of the input box
 * - paddingHorizontal - padding interior (default - 10)
 * - paddingVertical - padding interior (default - 5)
 * - borderRadius - (default - 5)
 * - borderWidth - (default - 2)
 * - fontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl 
 * @returns Input react node
 */
function Input(props: InputProps){
    const {
        variant='white',
        width=100,
        paddingHorizontal=10,
        paddingVertical=5,
        borderRadius=3,
        borderWidth=2,
        fontSize='md'
    } = props;

    const {styles:{inputBox}} = useStyles(styleSheet,{
        variant: variant
    });

    const [focus, setFocus] = React.useState(false);

    return(
        <View style={{alignSelf:'flex-start',width}}>
            <TextInput 
                {...props} placeholderTextColor={inputBox.borderColor}
                style={[inputBox,
                    { borderColor: focus? inputBox.focusColor : inputBox.borderColor,
                        paddingHorizontal,paddingVertical,borderWidth,borderRadius,
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
                primary: {
                    backgroundColor: theme.color['primary'],
                    borderColor: Color(theme.color['primary']).darken(.5).toString(),
                    focusColor: Color(theme.color['primary']).darken(.4).toString(),
                    color: 'black',
                },
                secondary: {
                    backgroundColor: theme.color['secondary'],
                    borderColor: Color(theme.color['secondary']).darken(.2).toString(),
                    focusColor: Color(theme.color['secondary']).darken(.4).toString(),
                    color: 'white',
                },
                tertiary: {
                    backgroundColor: theme.color['tertiary'],
                    borderColor: Color(theme.color['tertiary']).darken(.2).toString(),
                    focusColor: Color(theme.color['tertiary']).darken(.4).toString(),
                    color: 'black',
                },
                success: {
                    backgroundColor: theme.color['success'],
                    borderColor: Color(theme.color['success']).darken(.2).toString(),
                    focusColor: Color(theme.color['success']).darken(.4).toString(),
                    color: 'black',
                },
                warning: {
                    backgroundColor: theme.color['warning'],
                    borderColor: Color(theme.color['warning']).darken(.2).toString(),
                    focusColor: Color(theme.color['warning']).darken(.4).toString(),
                    color: 'black'
                },
                error: {
                    backgroundColor: theme.color.error,
                    borderColor: Color(theme.color['error']).lighten(.4).toString(),
                    focusColor: Color(theme.color['error']).darken(.4).toString(),
                    color: 'white'
                },
                black:{
                    backgroundColor: theme.color['black'],
                    borderColor: 'gray',
                    color: theme.color['lightGray'],
                    focusColor: theme.color['darkGray'] 
                },
                white:{
                    backgroundColor: theme.color['white'],
                    borderColor: theme.color['lightGray'],
                    focusColor: theme.color['darkGray'],
                    color: theme.color['darkGray'],
                },
            }
        }
    }
})));

export default Input