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
                        borderWidth:0,
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
                    borderColor: Color(theme.color['primary']).darken(.5).toString(),
                    color: 'black',
                },
                focus:{
                    backgroundColor: theme.color['primary'],
                    borderColor: Color(theme.color['primary']).darken(.4).toString(),
                    color: 'black',
                }
            },
            secondary: {
                normal:{
                    backgroundColor: theme.color['secondary'],
                    borderColor: Color(theme.color['secondary']).darken(.2).toString(),
                    color: 'white',
                },
                focus:{
                    backgroundColor: theme.color['secondary'],
                    borderColor: Color(theme.color['secondary']).darken(.4).toString(),
                    color: 'white',
                }
            },
            tertiary: {
                normal:{
                    backgroundColor: theme.color['tertiary'],
                    borderColor: Color(theme.color['tertiary']).darken(.2).toString(),
                    color: 'black',
                },
                focus:{
                    backgroundColor: theme.color['tertiary'],
                    borderColor: Color(theme.color['tertiary']).darken(.4).toString(),
                    color: 'black',
                }
            },
            success: {
                normal:{
                    backgroundColor: theme.color['success'],
                    borderColor: Color(theme.color['success']).darken(.2).toString(),
                    color: 'black',
                },
                focus:{
                    backgroundColor: theme.color['success'],
                    borderColor: Color(theme.color['success']).darken(.4).toString(),
                    color: 'black',
                },
            },
            warning: {
                normal:{
                    backgroundColor: theme.color['warning'],
                    borderColor: Color(theme.color['warning']).darken(.2).toString(),
                    color: 'black'
                },
                focus:{
                    backgroundColor: theme.color['warning'],
                    borderColor: Color(theme.color['warning']).darken(.4).toString(),
                    color: 'black'
                },
            },
            error: {
                normal:{
                    backgroundColor: theme.color.error,
                    borderColor: Color(theme.color['error']).lighten(.4).toString(),
                    color: 'white'
                },
                focus:{
                    backgroundColor: theme.color.error,
                    borderColor: Color(theme.color['error']).lighten(.7).toString(),
                    color: 'white'
                },
            },
            black:{
                normal:{
                    backgroundColor: theme.color['black'],
                    borderColor: theme.color['darkGray'],
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