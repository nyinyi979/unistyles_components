import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SwitchCheckProps } from "..";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../unistyles";
import Color from "color";

/**
 * 
 * @param Switch
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - defualtChecked - default checked or not (default - false)
 * - onChange - called when the value is changed
 * - description - description text beside the switch
 * - disabled - true or false
 * - animationDuration - animation duration for the switch to turn on and off (default - 300)
 * @returns 
 */
export default function Switch(props: SwitchCheckProps){
    const {
        variant='ghost',
        defaultChecked=false,
        onChange=()=>{},
        description,
        animationDuration=300,
        disabled=false
    } = props;
    const [checked, setChecked] = React.useState<"active" | "notActive" | "disabled">
        (disabled? 'disabled': defaultChecked? 'active' : 'notActive');

    const { styles:{switchBtn,switchBtnVariant,parentView,circle,pressableStyle} } = useStyles(styleSheet, {variant: variant})
    
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
    
    return(
        <Animated.View style={parentView}>
            <Pressable 
                disabled={disabled} 
                onPress={toggle} 
                style={pressableStyle}>
                <View style={[switchBtn,switchBtnVariant(checked)]}>
                    <Animated.View style={[translateXAnimatedStyles,circle]} />
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
    switchBtnVariant:(state: "active" | "notActive" | "disabled")=>({
        variants:{
            variant:{
                primary:{
                    backgroundColor: state==='active'? 
                        Color(theme.color.primary).lighten(.3).toString() :
                    state==='notActive'? theme.color.primary : 
                        Color(theme.color.primary).darken(.5).toString(),
                },
                secondary:{
                    backgroundColor: state==='active'? 
                        Color(theme.color.secondary).lighten(.3).toString() :
                    state==='notActive'? theme.color.secondary : 
                        Color(theme.color.secondary).darken(.5).toString(),
                },
                tertiary:{
                    backgroundColor: state==='active'? 
                        Color(theme.color.tertiary).lighten(.3).toString() :
                    state==='notActive'? theme.color.tertiary : 
                        Color(theme.color.tertiary).darken(.5).toString(),
                },
                success:{
                    backgroundColor: state==='active'? 
                        Color(theme.color.success).lighten(.3).toString() :
                    state==='notActive'? theme.color.success : 
                        Color(theme.color.success).darken(.5).toString(),
                },
                warning: {
                    backgroundColor: state==='active'? 
                        Color(theme.color.warning).lighten(.3).toString() :
                    state==='notActive'? theme.color.warning : 
                        Color(theme.color.warning).darken(.5).toString(),
                },
                error: {
                    backgroundColor: state==='active'? 
                        Color(theme.color.error).lighten(.3).toString() :
                    state==='notActive'? theme.color.error : 
                        Color(theme.color.error).darken(.5).toString(),
                },
                ghost:{
                    backgroundColor: state==='active'? 
                        Color(theme.color.white).lighten(.3).toString() :
                    state==='notActive'? theme.color.white : 
                        Color(theme.color.white).darken(.5).toString(),
                },
            },
        }
    }),
    switchBtn:{
        width:  60,
        height: 30,
        justifyContent:'center',
        borderRadius: 50,   
    },
    circle:{
        width: 25,
        height: 25,
        borderRadius: 25,
        variants:{
            variant:{
                primary:{
                    backgroundColor: Color(theme.color.primary).darken(.5).toString(),
                },
                secondary:{
                    backgroundColor: Color(theme.color.secondary).darken(.5).toString(),
                },
                tertiary:{
                    backgroundColor: Color(theme.color.tertiary).darken(.5).toString(),
                },
                success:{
                    backgroundColor: Color(theme.color.success).darken(.5).toString(),
                },
                warning: {
                    backgroundColor: Color(theme.color.warning).darken(.5).toString(),
                },
                error: {
                    backgroundColor: Color(theme.color.error).darken(.5).toString(),
                },
                ghost:{
                    backgroundColor: Color(theme.color.white).darken(.5).toString(),
                },
            }
        }
    }
}))