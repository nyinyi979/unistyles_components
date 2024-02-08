import Color from "color"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { ToggleProps } from ".."
import { Pressable, Text, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React from "react";
import Button from "../basic/button";

export default function Toggle(props: ToggleProps){
    const {
        description,
        variant='black',
        disabled=false,
        defaultToggled=false,
        onToggle=(t)=>{console.log(t)}
    } = props;
    const {styles:{toggleView}} = useStyles(styleSheet);
    const [checked, setChecked] = React.useState(defaultToggled);

    return(
        <Animated.View style={[{alignSelf:'flex-start'},toggleView]}>
            <Pressable onPress={()=>{setChecked(!checked)}}>
                <Button 
                    variant={variant}
                    disabled={checked}
                    title={description}
                    onPress={()=>{setChecked(!checked)}}
                    italic
                />
            </Pressable>
        </Animated.View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    toggleView:{  
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 3
    }
}))