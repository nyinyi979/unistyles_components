import React from "react";
import { Text, TextStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Colors, FontSizes } from "../unistyles";
import { TextProp } from "..";

/**
 * 
 * @param - Paragraph just like in web ( but inline, use inside a div|view to be a block )
 * - fontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl 
 * - color - all variant colors including foreground ones and tailwind colors
 * - tint - others than variant tint should be provided (default - 500)
 * - fontWeight - 100 - 900 , boldness of the text
 * @returns P react node
 */
function P(TextProp: TextProp){
    const {
        fontSize='md',
        color='black',
        tint=500,
        fontWeight='400',
        textAlign='left',
        variant
    } = TextProp;

    const {styles:{text}} = useStyles(styleSheet,{
        variant: variant
    });
    
    const fontStyle:TextStyle = {
        fontSize: FontSizes[fontSize],
        color: text.color? text.color : Colors[color][tint],
        fontWeight,
        textAlign
    }
    return (
        <Text {...TextProp} style={fontStyle}>
            {TextProp.children}
        </Text>
    )
}


/** For dark mode and light mode colors, please extend it from here */
const styleSheet = createStyleSheet((theme)=>({
    text:{
        variants:{
            variant:{
                primary:{
                    color: theme.color.primary
                },
                primaryForeground:{
                    color: theme.color.primaryForeground
                },
                secondary:{
                    color: theme.color.secondary
                },
                secondaryForeground:{
                    color: theme.color.secondaryForeground
                },
                tertiary:{
                    color: theme.color.tertiary
                },
                tertiaryForeground:{    
                    color: theme.color.tertiaryForeground
                },
                success:{
                    color: theme.color.success
                },
                successForeground:{
                    color: theme.color.successForeground
                },
                warning:{
                    color: theme.color.warning
                },
                warningForeground:{
                    color: theme.color.warningForeground
                },
                error:{
                    color: theme.color.error
                },
                errorForeground:{
                    color: theme.color.errorForeground
                },
                black:{
                    color: theme.color.black
                },
                white:{
                    color: theme.color.white
                },
                lightGray:{
                    color: theme.color.lightGray
                },
                darkGray:{
                    color: theme.color.darkGray
                }
            }
        }
    },
}));

export default P