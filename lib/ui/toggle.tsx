import { createStyleSheet, useStyles } from "react-native-unistyles"
import { ToggleProps } from ".."
import { Pressable} from "react-native"
import Animated from "react-native-reanimated";
import React from "react";
import Button from "../basic/button";

/**
 * 
 * @param Toggle
 * - description - description string beside the toast
 * - disabled - true or false
 * - defaultToggled - default value
 * - onToggle - called when the value is updated
 * @returns Toggle react node
 */
export default function Toggle(props: ToggleProps){
    const {
        description,
        variant='black',
        disabled=false,
        defaultToggled=false,
        onToggle=()=>{}
    } = props;
    const {styles:{toggleView}} = useStyles(styleSheet);
    const [checked, setChecked] = React.useState(defaultToggled);
    const toggle = () =>{
        onToggle(!checked);
        setChecked(!checked);
    }
    return(
        <Animated.View style={[{alignSelf:'flex-start'},toggleView]}>
            <Pressable onPress={()=>{setChecked(!checked)}}>
                <Button 
                    variant={variant}
                    disabled={disabled? disabled : checked}
                    title={description}
                    onPress={toggle}
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