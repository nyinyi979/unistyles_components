import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SwitchCheckProps } from "..";
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
    const [checked, setChecked] = React.useState<"active" | "notActive" | "disabled">
        (disabled? 'disabled': defaultChecked? 'active' : 'notActive');

    const { styles:{switchBtn,parentView,circle,pressableStyle} } = variant ==='black' ? 
        useStyles(styleSheet, {black:checked, sizes:'xs' }) :
        useStyles(styleSheet, {white:checked, sizes:'xs'})
    
    const translate = useSharedValue(checked==='notActive'?  switchBtn.width/2.1 : 5);
    const translateXAnimatedStyles = useAnimatedStyle(()=>({
        transform: [{translateX: translate.value}]
    }))
    const animateIntro = () =>{
        translate.value = withTiming(switchBtn.width/2.1,{duration: animationDuration});
    }
    const animateOutro = () =>{
        translate.value = withTiming(5,{duration: animationDuration});
    }

    const toggle = () =>{
        const checkedValue = checked==='active'?true:false;
        onChange(!checkedValue);
        setChecked(checkedValue? 'notActive':'active');
    }
    React.useEffect(()=>{
        if(checked==='active') animateIntro();
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
                backgroundColor: circle.backgroundColor,
            }
        }
    },[variant])
    
    return(
        <Animated.View style={parentView}>
            <Pressable 
                disabled={disabled} 
                onPress={toggle} 
                style={pressableStyle}>
                <View style={[sizes.bgSize,{justifyContent:'center',backgroundColor:switchBtn.backgroundColor}]}>
                    <Animated.View style={[sizes.circleStyle,translateXAnimatedStyles]} />
                </View>
                {typeof description === 'string'? <Text selectable={false}>{description}</Text>
                : description}
            </Pressable>
        </Animated.View>
    )
}
const styleSheet = createStyleSheet((theme)=>({
    parentView:{
        alignSelf:'flex-start',
        margin: 3
    },
    pressableStyle:{
        flexDirection:'row',alignItems:'center'
    },
    switchBtn:{
        variants:{
            white:{
                active:{
                    backgroundColor: '#e5e7eb',
                },
                notActive:{
                    backgroundColor: 'gray',
                },
                disabled:{
                    backgroundColor: '#1f2937',
                }
            },
            black:{
                active:{
                    backgroundColor: '#e5e7eb'
                },
                notActive:{
                    backgroundColor: 'black',
                },
                disabled:{
                    backgroundColor: '#e5e7eb',
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
    },
    circle:{
        backgroundColor: '#9ca3af'
    }
}))