import React from "react";
import Color from "color";
import Animated from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { ToggleProps } from ".."
import { Pressable, Text} from "react-native"

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

    const [toggled,setToggle] = React.useState(disabled? true: defaultToggled);
    const [hover,setHover] = React.useState(false);
    const {styles:{toggleView,container}} = useStyles(styleSheet,{variant:variant});

    const hoverColor = React.useRef(variant==='black'? 
        Color(toggleView.backgroundColor).lighten(.3).toString():
        Color(toggleView.backgroundColor).darken(.3).toString());


    const toggle = () =>{
        if(!toggled) {
            onToggle(true);
            setToggle(true);
        }
        else {
            onToggle(false);
            setToggle(false);
        }
    }
    return(
        <Animated.View style={container}>
            <Pressable
                onHoverIn={()=>{setHover(true)}}
                onHoverOut={()=>{setHover(false)}}
                onPress={toggle}
                style={[toggleView,hover&&{
                    shadowColor: variant==='white'? toggleView.color : toggleView.backgroundColor,
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,  
                    elevation: 5,
                },{
                    backgroundColor: toggled? hoverColor.current : toggleView.backgroundColor
                }]}
                disabled={disabled}
            >
                <Text selectable={false} style={{
                    color:toggleView.color,
                    textAlign: 'center',
                }}>
                    {description}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    container: {alignSelf:'flex-start'},
    toggleView:{  
        paddingHorizontal: 10,
        borderRadius:5,
        paddingVertical: 5,
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color.primary,
                    color: theme.color.primaryForeground
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                    color: theme.color.secondaryForeground
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                    color: theme.color.primaryForeground
                },
                success:{
                    backgroundColor: theme.color.success,
                    color: theme.color.successForeground
                },
                warning: {
                    backgroundColor: theme.color.warning,
                    color: theme.color.warningForeground
                },
                error: {
                    backgroundColor: theme.color.error,
                    color: theme.color.errorForeground
                },
                black:{
                    backgroundColor: theme.color.black,
                    color: theme.color.white
                },
                white:{
                    backgroundColor: theme.color.white,
                    color: theme.color.black
                },
            },
        }
    }
}))