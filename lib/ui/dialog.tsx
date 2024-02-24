import React from "react";
import { BackHandler, Pressable, Text, View } from "react-native"
import Animated, { useSharedValue } from "react-native-reanimated";
import { GenerateAnimation, GenerateFadeAnimation } from "../utils/slide_animation";
import Button from "./button";
import { DialogProps } from "..";
import { createStyleSheet, useStyles } from "react-native-unistyles";
/** 
 * The children inside it will be passed directly. 
 * - PROVIDE FOOTER IF YOU ARE NOT USING A FULLSCREEN DIALOG
 * - FULLSCREEN DIALOG WIDTH/HEIGHT ADJUSTABLE VIA INITIALWIDTHHEIGHT,MAXWIDTHHEIGHT
 * *****************************
 * @param
 * - animationProperties - {animationType: type of animation to be used(fade), 
 * animationDuration - duration of the animation(500), 
 * oneDirectionalAnimation - see the details hovering it:)}
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - backdrop - color for the backdrop and opacity for the opacity of it-_-
 * - header - header string
 * - footer - { 
 *      title - title of the button
 *      actions - other actions for the buttons other than closeBtnIndex 
 *   },
 * - children - you can just provide children and footer (or backdropPressHidesModal), header is not that necessary
 * - visible - state to pass
 * - setVisible - state dispatch action to set the state 
 * @returns Dialog react node
*/

function Dialog(DialogProps: DialogProps){
    // default value assigning
    const {
        children,setVisible,visible,header,
        backdropPressHidesModal=false,
        footer=undefined,
        variant='ghost',
        backdrop={
            color:'black',
            opacity:.8
        },
        animationProperties={
            animationDuration:100,
            animationType:'slideFromBottom',
            oneDirectionalAnimation:true}
    } = DialogProps;

    let timeOut:NodeJS.Timeout;
    !visible&&clearInterval(timeOut);
    // backdrop animation and shared value
    const backdropOpacity = useSharedValue(0);
    const backdropAnimation = React.useRef(GenerateFadeAnimation(
        {
            animationDuration:animationProperties.animationDuration,
            existing:backdropOpacity,
            opacityToAnimate:backdrop.opacity
        })
    )
    // animation for the modal itself
    const animation = React.useRef(GenerateAnimation(animationProperties));

    const {animateIntro,animateOutro,animatedStyles} = animation.current;
    const {styles} = useStyles(styleSheet,{variant:variant});
    const {backdropView,childrenContainer,insideModalContainer,modalContainer,modalText,modalHeader,parentView} = styles;

    const closeDialog = () =>{
        backdropAnimation.current.animateOutro();
        animateOutro();
        timeOut = setTimeout(()=>{
            setVisible(false);
        },animationProperties.animationDuration)
    };

    const openDialog = () =>{
        backdropAnimation.current.animateIntro();
        animateIntro();
    }
    
    // listening to backhanlder event, since it is implemented on View not Modal:)
    React.useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',()=>{
            closeDialog();
            return true;
        });
    },[])

    React.useEffect(()=>{
        if(visible) openDialog();
        else closeDialog();
    },[visible])
    
    return(
        <View style={parentView(visible)}>
            <View style={modalContainer}>

                <Animated.View style={[
                    backdropView,backdropAnimation.current.animatedStyles,
                    {backgroundColor:backdrop.color}
                ]}>
                    <Pressable 
                        style={backdropView}
                        onPress={closeDialog}
                        disabled={!backdropPressHidesModal}
                    />
                </Animated.View>

                <Animated.View style={[
                    insideModalContainer,animatedStyles,styles[variant]
                ]}>
                    {header&&<Text style={[modalText,modalHeader]}>{header}</Text>}
                    <View style={childrenContainer}>
                        {typeof children==='string'? 
                        <Text style={modalText}>{children}</Text>: children}
                    </View>
                    {footer&&<View style={{flex:1}}>
                        <Button 
                            title={footer.title} 
                            onPress={closeDialog} 
                            variant={variant}
                            />
                    </View>}
                </Animated.View>
            </View>
        </View>
    )
}


const styleSheet = createStyleSheet((theme)=>({
    // parent of the modal(the whole screen)
    parentView: (displayed: boolean)=>({
        position: 'absolute',
        width: '100%',
        height:'100%',
        left:0,
        top:0,
        zIndex:10,
        display: displayed? 'flex' : 'none'
    }),
    // you must change this to align just the modal box, background of the whole screen
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
        height:'105%'
    },
    backdropView:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'110%',
        top: 0,
        right:0,
        zIndex:1
    },
    // this is to align the inner elements and texts... , and backgroundColor of just the modal
    insideModalContainer:{
        alignItems: 'center',
        justifyContent:'center',
        zIndex:5,
        paddingHorizontal:10,
        paddingVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color.primary,
                    borderColor: theme.color.primaryForeground,
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                    borderColor: theme.color.secondaryForeground,
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                    borderColor: theme.color.tertiaryForeground,
                },
                success:{
                    backgroundColor: theme.color.success,
                    borderColor: theme.color.successForeground,
                },
                warning: {
                    backgroundColor: theme.color.warning,
                    borderColor: theme.color.warningForeground,
                },
                error: {
                    backgroundColor: theme.color.error,
                    borderColor: theme.color.errorForeground,
                },
                ghost:{
                    backgroundColor: theme.color.white,
                    borderColor: '#e5e7eb',
                },
            }
        }
    },
    modalHeader: {
        fontWeight:'500',
        textAlign: 'center',
        fontSize: 18
    },
    modalText:{
        
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
    childrenContainer: {
        flex: 1,
        marginVertical: 5
    },
}))
export default Dialog