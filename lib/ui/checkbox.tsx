import React from "react";
import { Pressable, Text, View } from "react-native";
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
                'primary': {
                    color: 'white',
                    backgroundColor: theme.color['primary']
                },
                'secondary': {
                    color: 'white',
                    backgroundColor: theme.color['secondary']
                },
                'tertiary': {
                    color: 'white',
                    backgroundColor: theme.color['tertiary']
                },
                'success': {
                    color: 'white',
                    backgroundColor: theme.color['success']
                },
                'warning': {
                    color: 'white',
                    backgroundColor: theme.color['warning']
                },
                'error': {
                    color: 'white',
                    backgroundColor: theme.color['error']
                },
                'black': {
                    color: theme.color['white'],
                    backgroundColor: theme.color['black'],
                },
                'white': {
                    color: theme.color['black'],
                    backgroundColor: theme.color['lightGray'],
                },
            }
        }
    },
    
}))