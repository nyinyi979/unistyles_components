import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { Text, View, StyleSheet, Pressable, Dimensions, Platform, BackHandler } from "react-native";
import Color from "color";
import { GenerateFadeAnimation } from "../utils/slide_animation";
import { MenuProps } from "../";
import { animationType } from "../default";
import { DragLeftOrRightToDimiss, DragTopOrBottomToDimiss } from "../utils/drag_to_dimiss";

/**
 * 
 * @param MenuProps 
 * - background: { color: background color of the menu , opacity: opacity of the background color }, no need to pass
 * hsla 
 * - backdrop: { color: backdrop color of the menu , opacity: opacity of the backdrop color }, no need to pass hsla
 * - visible: boolean state value 
 * - setVisible: dispatch method of React.useState(boolean)
 * - header: header of the menu , it is not necessary, you can just put the children inside the menu
 * - children: pass into children={} props or just pass between JSX tags
 * - backdropPressHidesMenu: clicking on backdrop will hides the menu or not?
 * - notchVisible: whether the notch will be available or not
 * - location: where the menu will be attached to, top|right|bottom|left
 * - widthOrHeight: width for left, right menu . height for top, bottom menu
 * @returns 
 */
export default function Menu(props: MenuProps){
    // DEINING DEFAULT PARAMETERS
    const {
        backdrop={color:'black',opacity:.5},
        background={color:'white',opacity:1},
        backdropPressHidesMenu=true,
        notchVisible=true,direction="top",widthOrHeight=100,
        setVisible,visible,children,header} = props;
    
    // Display to toggle before intro and after outro
    const [display, setDisplay] = React.useState<'flex'|'none'>('flex');
    
    // Getting the drag for the gesutre
    const dragStyles = React.useRef(
        direction==='left'||direction==='right'? 
        DragLeftOrRightToDimiss({direction,setVisible,visible,widthOrHeight}): 
        DragTopOrBottomToDimiss({direction,setVisible,visible,widthOrHeight})
    )
    // object destructuring, iykyk
    const {animateIntro,animateOutro,animatedStyles,drag,drawn} = dragStyles.current;
    
    // backdrop opacity to pass to the animation generator:)
    const backdropOpacity = useSharedValue(0);
    const backdropAnimation = 
    React.useRef(GenerateFadeAnimation({
        animationDuration:200,
        existing: backdropOpacity,
        opacityToAnimate: backdrop.opacity
    }));

    // animate the modal intro
    const enterModal = () =>{
        setDisplay('flex');
        animateIntro();
        backdropAnimation.current.animateIntro();
        drawn.value = true;
    }
    // animate the modal outro
    const exitModal = () =>{
        animateOutro();
        backdropAnimation.current.animateOutro();
        setVisible(false);
        setTimeout(()=>{
            setDisplay('none');
        },300)
    }
    
    // listening to backhanlder event, since it is implemented on View not Modal:)
    React.useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',()=>{
            exitModal();
            return true;
        })
    },[])
    // if the visible props changes, it will animates again, 
    // can be done with a button click with a stage
    React.useEffect(()=>{
        if(visible) enterModal()
        else exitModal();
    },[visible])

    return(
        <GestureDetector gesture={drag}>
            <View style={[styles.parentView,
                {display:display},
                {height:Platform.OS !=='web'? Dimensions.get('screen').height: '100vh'}]}>
                
                <Animated.View style={[
                    styles.backdrop,backdropAnimation.current.animatedStyles,
                    {backgroundColor:backdrop.color}
                ]}>
                    <Pressable 
                        onPress={exitModal}
                        style={{flex:1}}
                        disabled={!backdropPressHidesMenu}
                        /> 
                </Animated.View>
                
                <Animated.View style={[animatedStyles,
                    direction==='top'?      [styles.topModalContainer,{height:widthOrHeight}] : 
                    direction==='right'?    [styles.rightModalContainer,{width:widthOrHeight}] :
                    direction==='bottom'?   [styles.bottomModalContainer,{height:widthOrHeight}] : 
                        [styles.leftModalContainer,{width:widthOrHeight}],
                    {backgroundColor: Color(background.color).alpha(background.opacity).toString(),
                    }
                ]}>
                        {direction==='bottom'&&notchVisible&&<Notch animationType="slideFromTop"/>}
                        <Text style={styles.modalText}>{header}</Text>
                        {children}
                        {direction==='top'&&notchVisible&&<Notch animationType="slideFromBottom"/> }
                        {direction==='left'&&notchVisible&&<Notch animationType="slideFromLeft" />}
                        {direction==='right'&&notchVisible&&<Notch animationType="slideFromRight" />}
                </Animated.View>
            </View>
        </GestureDetector>
    )
}

function Notch(props: {animationType: animationType}){
    const {animationType} = props;
    if(animationType==='slideFromTop'||animationType==='slideFromBottom'){
        return(
            <View style={{backgroundColor:'gray',width:50,height:5,alignSelf:'center',marginVertical:5,justifyContent:'center'}}></View>
        )
    }
    else if(animationType==='slideFromLeft'){
        return(
            <View style={{backgroundColor:'gray',width:5,position:'absolute',right:15,top:'25%',height:'50%'}} />
        )
    }
    else {
        return(
            <View style={{backgroundColor:'gray',width:5,position:'absolute',left:15,top:'25%',height:'50%'}} />
        )
    }
}

const styles = StyleSheet.create({
    // parent of the modal(the whole screen)
    parentView:{
        position: 'absolute',
        width: '100%',
        left:0,
        top:0,
        zIndex:3
    },
    // you must change this to align just the modal box, background of the whole screen
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // this is to align the inner elements and texts... , and backgroundColor of just the modal
    insideModalContainer:{
        alignItems: 'center'
    },
    backdrop:{
        position:'absolute',
        flex:1,
        zIndex:2,
        width:'100%',
        height:'100%',
        top: 0,
        right:0,
    },
    leftModalContainer:{
        flex:1,
        position: 'relative',
        left:0,
        top:0,
        height: '100%',
        padding:10,
        elevation: 3,
        zIndex:3,
    },
    rightModalContainer: {
        flex:1,
        position: 'absolute',
        right:0,
        top:0,
        height: '100%',
        padding:10,
        elevation: 3,
        zIndex:3,
    },
    topModalContainer:{
        flex:1,
        position: 'absolute',
        left:0,
        top:0,
        width: '100%',
        padding:10,
        elevation: 3,
        zIndex:3,
    },
    bottomModalContainer:{
        flex:1,
        position: 'absolute',
        left:0,
        bottom:0,
        width: '100%',
        padding:10,
        elevation: 3,
        zIndex:3,
    },
    modalText: {
      marginBottom: 18,
      fontWeight:'500',
      textAlign: 'center',
      color: 'black'
    }
})

