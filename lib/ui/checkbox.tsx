import React from "react";
import { Pressable, Text } from "react-native";
import { Check } from "../utils/svg_comp";
import { CheckboxProps } from "..";
import { createStyleSheet, useStyles } from "react-native-unistyles";

/**
 * 
 * @param Checkbox
 * - Description - description text beside the checkbox
 * - variant - all available color variant (default - black)
 * - onChange - called when the value is updated
 * - defaultChecked - default value, (default - false)
 * @returns checkbox react node
 */
export default function CheckBox(props: CheckboxProps){
    const {description,variant='black',onChange=()=>{},defaultChecked=false} = props;
    const {styles:{checkBox,parentView}} = useStyles(styleSheet,{
        variant:variant
    });
    const [checked, setChecked] = React.useState(defaultChecked);

    const toggleCheck = () =>{
        onChange(!checked);
        setChecked(!checked);
    }
    return(
        <Pressable style={parentView} onPress={toggleCheck}>
            <Check {...checkBox} checked={checked}/>
            {typeof description === 'string'? 
            <Text>{description}</Text>
            : description}
        </Pressable>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    parentView:{
        flexDirection:'row',
        alignItems:'center'
    },
    checkBox:{
        variants:{
            variant:{
                primary: {
                    backgroundColor: theme.color['primary'],
                    color: theme.color['primaryForeground']
                },
                secondary: {
                    backgroundColor: theme.color['secondary'],
                    color: theme.color['secondaryForeground']
                },
                tertiary: {
                    backgroundColor: theme.color['tertiary'],
                    color: theme.color['tertiaryForeground']
                },
                success: {
                    backgroundColor: theme.color['success'],
                    color: theme.color['successForeground']
                },
                warning: {
                    backgroundColor: theme.color['warning'],
                    color: theme.color['warningForeground']
                },
                error: {
                    backgroundColor: theme.color['error'],
                    color: theme.color['errorForeground']
                },
                black: {
                    backgroundColor: theme.color['black'],
                    color: theme.color['white']
                },
                white: {
                    backgroundColor: theme.color['white'],
                    color: theme.color['black']
                },
            }
        }
    },
    
}))