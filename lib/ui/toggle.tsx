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
    const [hover,setHover] = React.useState(disabled? true: false);
    const [checked,setChecked] = React.useState<'normal'|'toggle'>
        (disabled? 'toggle': defaultToggled? 'toggle' : 'normal');
        
    const {styles:{toggleView}} = 
    variant==='primary'? useStyles(styleSheet,{primary:checked}) :
    variant==='secondary'? useStyles(styleSheet,{secondary:checked}) :
    variant==='tertiary'? useStyles(styleSheet,{tertiary:checked}) :
    variant==='success'? useStyles(styleSheet,{success:checked}) :
    variant==='warning'? useStyles(styleSheet,{warning:checked}) :
    variant==='error'? useStyles(styleSheet,{error:checked}) :
    variant==='black'? useStyles(styleSheet,{black:checked}) :
    useStyles(styleSheet,{white:checked});

    const toggle = () =>{
        if(checked==='normal') {
            onToggle(true);
            setChecked('toggle');
        }
        else {
            onToggle(false);
            setChecked('normal')
        }
    }
    return(
        <Animated.View style={[{alignSelf:'flex-start'}]}>
            <Pressable
                onHoverIn={()=>{setHover(true)}}
                onHoverOut={()=>{setHover(false)}}
                onPress={toggle}
                style={[toggleView,hover&&{
                    shadowColor: toggleView.backgroundColor,
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,  
                    elevation: 5,
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
    toggleView:{  
        paddingHorizontal: 10,
        borderRadius:5,
        paddingVertical: 5,
        variants:{
            primary:{
                normal:{
                    backgroundColor: theme.color['primary'],
                    color: 'black',
                },
                toggle:{
                    backgroundColor: Color(theme.color['primary']).darken(.5).toString(),
                    color: 'black',
                }
            },
            secondary:{
                normal:{
                    backgroundColor: theme.color['secondary'],
                    color: 'white',
                },
                toggle:{
                    backgroundColor: Color(theme.color['secondary']).darken(.5).toString(),
                    color: 'white',
                }
            },
            tertiary:{
                normal:{
                    backgroundColor: theme.color['tertiary'],
                    color: 'black',
                },
                toggle:{
                    backgroundColor: Color(theme.color['tertiary']).darken(.5).toString(),
                    color: 'black'
                },
            },
            success:{
                normal:{
                    backgroundColor: theme.color['success'],
                    color: 'black',
                },
                toggle:{
                    backgroundColor: Color(theme.color['success']).darken(.5).toString(),
                    color: 'black'
                },
            },
            warning: {
                normal:{
                    backgroundColor: theme.color['warning'],
                    color: 'black',
                },
                toggle:{
                    backgroundColor: Color(theme.color['warning']).darken(.5).toString(),
                    color: 'black'
                }
            },
            error: {
                normal:{
                    backgroundColor: theme.color['error'],
                    color: 'white',
                },
                toggle:{
                    backgroundColor: Color(theme.color['error']).darken(.5).toString(),
                    color: 'white'
                }
            },
            black:{
                normal:{
                    backgroundColor: theme.color['black'],
                    color: theme.color['white']
                },
                toggle:{
                    backgroundColor: theme.color['darkGray'],
                    color: theme.color['white']
                }
            },
            white:{
                normal:{
                    backgroundColor: theme.color['white'],
                    color: theme.color['black']
                },
                toggle:{
                    backgroundColor: theme.color['lightGray'],
                    color: theme.color['black']
                }
            },
        }
    }
}))