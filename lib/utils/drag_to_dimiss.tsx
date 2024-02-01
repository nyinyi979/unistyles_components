import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { GenerateSlideBottomAnimation, GenerateSlideLeftAnimation, GenerateSlideRightAnimation, GenerateSlideTopAnimation } from "./slide_animation";
import React, { Dispatch, SetStateAction } from "react";


export function DragTopOrBottomToDimiss(DragProps: DragProps){
    const {setVisible,direction,widthOrHeight} = DragProps;

    const topBottom = direction==='top'? 
        useSharedValue({translateY:-100,opacity:0}) : useSharedValue({translateY:100,opacity:0});

    const drawn = useSharedValue(true);
    const animation = React.useRef(direction ==='top'? 
    GenerateSlideTopAnimation(
        {
            animationDuration:100,
            oneDirectionalAnimation:true,
            animateOpacity:false,
            existing:topBottom,
            translateY:widthOrHeight
        }
    ):
    GenerateSlideBottomAnimation(
        {
            animationDuration:100,
            oneDirectionalAnimation:true,
            animateOpacity:false,
            existing:topBottom,
            translateY:widthOrHeight
        }
    ));
    
    const {animateIntro,animateOutro,animatedStyles} = animation.current;

    const drag = Gesture.Pan()
    .onUpdate((e)=>{
        if(drawn) {
            const translation = e.translationY;
            if(translation < 0 && direction==='top')
                topBottom.value = {translateY:translation,opacity:1}
            else if(translation > 0 && direction==='bottom')
                topBottom.value = {translateY:translation,opacity:1}
        }
    })
    .onEnd(()=>{
        if(topBottom.value.translateY < -40 && direction==='top'){
            setVisible(false)
            drawn.value = false;
        }
        else if(topBottom.value.translateY > 40 && direction==='bottom') {
            setVisible(false);
            drawn.value = false;
        }
        else {
            animateIntro();
        }
    })
    .runOnJS(true)

    return {animateIntro, animateOutro, animatedStyles, drag, drawn}
}

export function DragLeftOrRightToDimiss(DragProps: DragProps){
    const {setVisible,direction,widthOrHeight} = DragProps;

    const leftRight = direction==='left'? 
        useSharedValue({translateX:-100,opacity:0}) : useSharedValue({translateX:100,opacity:0});

    const drawn = useSharedValue(true);
    const animation = React.useRef(direction ==='left'? 
    GenerateSlideLeftAnimation(
        {
            animationDuration:200,
            oneDirectionalAnimation:true,
            animateOpacity:false,
            existing:leftRight,
            translateX:widthOrHeight
        }
    ):
    GenerateSlideRightAnimation(
        {
            animationDuration:200,
            oneDirectionalAnimation:true,
            animateOpacity:false,
            existing:leftRight,
            translateX:widthOrHeight
        }
    ));
    
    const {animateIntro,animateOutro,animatedStyles} = animation.current;

    const drag = Gesture.Pan()
    .onUpdate((e)=>{
        if(drawn) {
            const translation = e.translationX;
            if(translation < 0 && direction==='left')
                leftRight.value = {translateX:translation,opacity:1}
            else if(translation > 0 && direction==='right')
                leftRight.value = {translateX:translation,opacity:1}
        }
    })
    .onEnd(()=>{
        if(leftRight.value.translateX < -40 && direction==='left'){
            setVisible(false)
            drawn.value = false;
        }
        else if(leftRight.value.translateX > 40 && direction==='right') {
            setVisible(false);
            drawn.value = false;
        }
        else {
            animateIntro();
        }
    })
    .runOnJS(true)
  
    return {animateIntro, animateOutro, animatedStyles, drag, drawn}
}

type DragProps = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    direction: 'left'|'right'|'top'|'bottom',
    widthOrHeight: number,
}
