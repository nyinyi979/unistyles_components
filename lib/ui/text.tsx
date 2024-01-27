import React from "react"
import { Text } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { Colors, FontSize } from "../../unistyles";
import { TextProp, fontWeight, textAlign } from "../..";

// Add the colors that need to be changed according to light mode and dark mode here
const themeColors = ['primary','secondary','tertiary','success','warning','error','black','white'];

/**
 * 
 * @param - Paragraph just like in web ( but inline, wooo )
 * - size: xxs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | 6xl
 * - color: theme colors : 'primary','secondary','tertiary','success','warning','error','black','white'...
 * - tint: others than theme colors tint should be provided 
 * @returns 
 */
export default function P(TextProp: TextProp){
    const {
        size='md',
        color='black',
        tint=500,
        fontWeight='300',
        textAlign="left"
    } = TextProp;

    const {styles} = useStyles(StyleSheet);
    const fontStyle:{color?:string,fontSize?:number,fontWeight?:fontWeight,textAlign?:textAlign}[] = [];

    React.useMemo(()=>{
        // Set for better optimized searching
        const colorsToCheck = new Set(themeColors);
        
        // pushing the styles
        fontStyle.push({fontSize:FontSize[size]});

        fontStyle.push({fontWeight:fontWeight});

        fontStyle.push({textAlign:textAlign});

        if(colorsToCheck.has(color)) {
            // dark and light mode colors 
            fontStyle.push(styles[color])
        }
        else {
            // simple colors 
            fontStyle.push({color:Colors[color][tint]})
        }
    },[size]);

    return (
        <Text {...TextProp} style={fontStyle}>
            {TextProp.children}
        </Text>
    )
}



/** For dark mode and light mode colors, please extend it from here */
const StyleSheet = createStyleSheet((theme)=>({
    'primary':{
        color: theme.color['primary']
    },
    'secondary':{
        color: theme.color['secondary']
    },
    'tertiary':{
        color: theme.color['tertiary']
    },
    'success':{
        color: theme.color['success']
    },
    'warning':{
        color: theme.color['warning']
    },
    'error':{
        color: theme.color['error']
    },
    'black':{
        color: theme.color['black']
    },
    'white':{
        color: theme.color['white']
    }
}))