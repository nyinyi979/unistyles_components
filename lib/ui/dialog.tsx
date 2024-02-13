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
 * - variant - black and white is currently supported, default white ( work on both light and dark mode )
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
        variant='white',
        backdrop={
            color:'black',
            opacity:.8
        },
        animationProperties={
            animationDuration:100,
            animationType:'slideFromBottom',
            oneDirectionalAnimation:true}
        } = DialogProps;

    // backdrop animation and shared value
    const backdropOpacity = useSharedValue(0);
    const backdropAnimation = React.useRef(GenerateFadeAnimation(
        {
            animationDuration:200,
            existing:backdropOpacity,
            opacityToAnimate:backdrop.opacity
        })
    )
    // animation for the modal itself
    const animation = React.useRef(GenerateAnimation(animationProperties));

    const {animateIntro,animateOutro,animatedStyles} = animation.current;
    const {styles} = useStyles(styleSheet);
    const {backdropView,childrenContainer,insideModalContainer,modalContainer,modalText,parentView} = styles;

    const closeDialog = () =>{
      backdropAnimation.current.animateOutro();
      animateOutro();
      setTimeout(()=>{
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
        })
    },[])

    React.useEffect(()=>{
        if(visible) openDialog();
        else closeDialog();
    },[visible])
    
    return(
        <View style={[parentView,{
            display:visible? 'flex':'none',
            }]}>
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
                    <Text style={modalText}>{header}</Text> 
                    <View style={childrenContainer}>
                        {children}
                    </View>
                    <View style={{flex:1}}>
                        {footer? 
                        <Button 
                            title={footer.title} 
                            onPress={closeDialog} 
                            variant={variant}
                            />
                        : <Text></Text>}
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}


const styleSheet = createStyleSheet((theme)=>({
    // parent of the modal(the whole screen)
    parentView:{
        position: 'absolute',
        width: '100%',
        height:'100%',
        left:0,
        top:0,
        zIndex:10
    },
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
    },
    modalText: {
        fontWeight:'500',
        textAlign: 'center',
    },
    childrenContainer: {
        flex: 1,
        marginVertical: 5
    },
    white:{
        backgroundColor: theme.color['white']
    },
    black:{
        backgroundColor: theme.color['black']
    },
}))
export default Dialog