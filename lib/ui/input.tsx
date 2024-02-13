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

    const [focus, setFocus] = React.useState<'normal'|'focus'>('normal');
    const {styles:{inputBox}} = 
    variant==='primary'? useStyles(styleSheet,{primary:focus}) :
    variant==='secondary'? useStyles(styleSheet,{secondary:focus}) :
    variant==='tertiary'? useStyles(styleSheet,{tertiary:focus}) :
    variant==='success'? useStyles(styleSheet,{success:focus}) :
    variant==='warning'? useStyles(styleSheet,{warning:focus}) :
    variant==='error'? useStyles(styleSheet,{error:focus}) :
    variant==='black'? useStyles(styleSheet,{black:focus}) :
    useStyles(styleSheet,{white:focus});

    return(
        <View style={[inputBox,{alignSelf:'flex-start',width,borderWidth,borderRadius}]}>
            <TextInput 
                {...props} placeholderTextColor={inputBox.borderColor}
                style={[,
                    {   
                        color: inputBox.color,
                        outlineStyle:'none',
                        paddingHorizontal,paddingVertical,
                        fontSize: FontSizes[fontSize]
                    }
                ]} onFocus={()=>{setFocus('focus')}} onBlur={()=>{setFocus('normal')}}
                />
        </View>
    )
}

const styleSheet = createStyleSheet((theme => ({
    inputBox:{
        variants:{
            primary:{
                normal:{
                    backgroundColor: theme.color['primary'],
                    borderColor: Color(theme.color['primary']).darken(.3).toString(),
                    color: theme.color['primaryForeground'],
                },
                focus:{
                    backgroundColor: theme.color['primary'],
                    borderColor: theme.color['primaryForeground'],
                    color: theme.color['primaryForeground'],
                }
            },
            secondary: {
                normal:{
                    backgroundColor: theme.color['secondary'],
                    borderColor: Color(theme.color['secondary']).darken(.3).toString(),
                    color: theme.color['secondaryForeground'],
                },
                focus:{
                    backgroundColor: theme.color['secondary'],
                    borderColor: theme.color['secondaryForeground'],
                    color: theme.color['secondaryForeground'],
                }
            },
            tertiary: {
                normal:{
                    backgroundColor: theme.color['tertiary'],
                    borderColor: Color(theme.color['tertiary']).darken(.3).toString(),
                    color: theme.color['tertiaryForeground'],
                },
                focus:{
                    backgroundColor: theme.color['tertiary'],
                    borderColor: theme.color['tertiaryForeground'],
                    color: theme.color['tertiaryForeground'],
                }
            },
            success: {
                normal:{
                    backgroundColor: theme.color['success'],
                    borderColor: Color(theme.color['success']).darken(.3).toString(),
                    color: theme.color['successForeground'],
                },
                focus:{
                    backgroundColor: theme.color['success'],
                    borderColor: theme.color['successForeground'],
                    color: theme.color['successForeground'],
                },
            },
            warning: {
                normal:{
                    backgroundColor: theme.color['warning'],
                    borderColor: Color(theme.color['warning']).darken(.3).toString(),
                    color: theme.color['successForeground']
                },
                focus:{
                    backgroundColor: theme.color['warning'],
                    borderColor: theme.color['warningForeground'],
                    color: theme.color['warningForeground']
                },
            },
            error: {
                normal:{
                    backgroundColor: theme.color.error,
                    borderColor: Color(theme.color['error']).lighten(.4).toString(),
                    color: theme.color['errorForeground']
                },
                focus:{
                    backgroundColor: theme.color.error,
                    borderColor: theme.color['errorForeground'],
                    color: theme.color['errorForeground']
                },
            },
            black:{
                normal:{
                    backgroundColor: theme.color['black'],
                    borderColor: 'gray',
                    color: theme.color['lightGray'],
                },
                focus:{
                    backgroundColor: theme.color['black'],
                    borderColor: 'gray' ,
                    color: 'white'
                },
            },
            white:{
                normal:{
                    backgroundColor: theme.color['white'],
                    borderColor: theme.color['lightGray'],
                    color: theme.color['darkGray'],
                },
                focus:{
                    backgroundColor: theme.color['white'],
                    borderColor: 'gray',
                    color: theme.color['darkGray'],
                },
            },
            
        }
    }
})));

export default Input