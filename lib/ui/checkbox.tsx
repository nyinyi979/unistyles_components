import React from "react";
import { Pressable, Text } from "react-native";
import { Check } from "../utils/svg_comp";
import { CheckboxProps } from "..";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Color from "color";

/**
 * 
 * @param Checkbox
 * - description - description text beside the checkbox
 * - disabled - disabled or not
 * - variant - all available color variant (default - black)
 * - onChange - called when the value is updated
 * - defaultChecked - default value, (default - false)
 * @returns checkbox react node
 */
export default function CheckBox(props: CheckboxProps){
    const {description,variant='ghost',onChange=()=>{},defaultChecked=false,disabled} = props;
    const {styles:{checkBox,parentView,textStyle}} = useStyles(styleSheet,{
        variant:variant
    });
    const [checked, setChecked] = React.useState(defaultChecked);

    const toggleCheck = () =>{
        onChange(!checked);
        setChecked(!checked);
    }
    return(
        <Pressable style={parentView} onPress={toggleCheck} disabled={disabled}>
            <Check color={textStyle.color} disabled={disabled} backgroundColor={checkBox.backgroundColor} checked={checked}/>
            {typeof description === 'string'? 
            <Text style={textStyle}>{description}</Text>
            : description}
        </Pressable>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    parentView:{
        flexDirection:'row',
        alignItems:'center',
        variants:{
            variant:{
                primary: {
                    borderColor: theme.color.primaryForeground
                },
                secondary: {
                    borderColor: theme.color.secondaryForeground
                },
                tertiary: {
                    borderColor: theme.color.tertiaryForeground
                },
                success: {
                    borderColor: theme.color.successForeground
                },
                warning: {
                    borderColor: theme.color.warningForeground
                },
                error: {
                    borderColor:  theme.color.errorForeground
                },
                ghost: {
                    borderColor: theme.color.black
                },
            }
        }
    },
    checkBox:{
        variants:{
            variant:{
                primary: {
                    backgroundColor: theme.color.primary,
                },
                secondary: {
                    backgroundColor: theme.color.secondary,
                },
                tertiary: {
                    backgroundColor: theme.color.tertiary,
                },
                success: {
                    backgroundColor: theme.color.success,
                },
                warning: {
                    backgroundColor: theme.color.warning,
                },
                error: {
                    backgroundColor: theme.color.error,
                },
                ghost: {
                    backgroundColor: theme.color.white,
                },
            }
        }
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
    
}))