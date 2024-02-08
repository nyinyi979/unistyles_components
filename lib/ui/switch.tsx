import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SwitchCheckProps } from "..";
import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../unistyles";

/**
 * 
 * @param Switch
 * - variant - black and white
 * - defualtChecked - default checked or not (default - false)
 * - onChange - called when the value is changed
 * - description - description text beside the switch
 * - disabled - true or false
 * - animationDuration - animation duration for the switch to turn on and off (default - 300)
 * @returns 
 */
export default function Switch(props: SwitchCheckProps){
    const {
        variant='black',
        defaultChecked=false,
        onChange=()=>{},
        description,
        animationDuration=300,
        disabled=false
    } = props;
    const [checked, setChecked] = React.useState(defaultChecked);
    const { styles:{switchBtn,parentView} } = useStyles(styleSheet,{
        variant:variant,
        sizes: 'xs'
    });
    
    const sharedValue = useSharedValue({
        backgroundColor: disabled? switchBtn.disabledColor :  
            checked? switchBtn.backgroundColor : switchBtn.unactiveColor,
        translateX: checked?  switchBtn.width/2 : 5
    });
    const bgAnimatedStyles = useAnimatedStyle(()=>({
        backgroundColor: sharedValue.value.backgroundColor,
    }));
    const translateXAnimatedStyles = useAnimatedStyle(()=>({
        transform: [{translateX: sharedValue.value.translateX}]
    }))
    const animateIntro = () =>{
        sharedValue.value = withTiming({
            backgroundColor: switchBtn.backgroundColor,
            translateX: switchBtn.width/2
        }, {duration: animationDuration});
    }
    const animateOutro = () =>{
        sharedValue.value = withTiming({
            backgroundColor: switchBtn.unactiveColor,
            translateX: 5
        }, {duration: animationDuration});
    }

    const toggle = () =>{
        onChange(!checked);
        setChecked(!checked);
    }
    React.useEffect(()=>{
        if(checked) animateIntro();
        else animateOutro();
    },[checked]);

    const sizes = React.useMemo(()=>{
        return {
            bgSize: {
                width:  switchBtn.width,
                height: switchBtn.height,
                borderStartEndRadius: switchBtn.width,
                borderStartStartRadius: switchBtn.width,
                borderEndEndRadius: switchBtn.width,
                borderEndStartRadius: switchBtn.width,
            },
            circleStyle: {
                width: switchBtn.circleSize,
                height: switchBtn.circleSize,
                borderRadius: switchBtn.circleSize,
                backgroundColor: switchBtn.circleColor,
            }
        }
    },[variant])
    
    return(
        <Animated.View style={parentView}>
            <Pressable onPress={toggle} style={{flexDirection:'row',alignItems:'center'}}>
                <Animated.View style={[sizes.bgSize,{justifyContent:'center'},bgAnimatedStyles]}>
                    <Animated.View style={[sizes.circleStyle,translateXAnimatedStyles]} />
                </Animated.View>
                {typeof description === 'string'? <Text selectable={false}>{description}</Text>
                : description}
            </Pressable>
        </Animated.View>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    parentView:{
        alignSelf:'flex-start'
    },
    switchBtn:{
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color['primary'],
                    circleColor: Colors.slate[400],
                    unactiveColor: theme.color['lightGray'],
                    disabledColor: theme.color['darkGray'],
                },
                black:{
                    backgroundColor: theme.color['white'],
                    circleColor: Colors.slate[400],
                    unactiveColor: theme.color['black'],
                    disabledColor: theme.color['lightGray']
                }
            },
            sizes:{
                'xs':{
                    width:  60,
                    height: 30,
                    circleSize: 25,
                }
            }
        }
    }
}))