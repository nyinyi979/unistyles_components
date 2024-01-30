import { useAnimatedStyle, useSharedValue, withTiming, SharedValue } from "react-native-reanimated";
import React from 'react';
import { animationType } from "../default";
/** This function is mostlly used for normal modal animation
 * - Take access to more function by importing GenerateSlideLeftAnimation ... where you can provide 
 * - oneDirectionalAnimation: whether the left modal will go to left again (USEFUL WITH DragModals)
 * - animationDuration: duration of the total animation
 * - existing?: Existing shared value in your component to extend the animation on other states, normally 
 * it would take SharedValue<{translateX|tranlsateY:number,opacity:number}> 
 * ***
 * THE EXISTING VALUE ARE AVAILABLE FOR ANIMATION TYPES BUT FADE:(
 */
export function GenerateAnimation(animation: animationProperties){
    switch(animation.animationType){
        case 'scale':
            return GenerateScaleAnimation(animation);
        case 'fade':
            return GenerateFadeAnimation(animation);
        case 'slideFromTop':
            return GenerateSlideTopAnimation(animation);
        case 'slideFromLeft':
            return GenerateSlideLeftAnimation(animation);
        case 'slideFromBottom':
            return GenerateSlideBottomAnimation(animation);
        case 'slideFromRight':
            return GenerateSlideRightAnimation(animation);
    }
}

/**
 * Generate slide left animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - oneDirectionalAnimation: true -> left intro - left outro , false -> left intro - right outro
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - animateScale: animate the scale to smaller, bigger or keep it at given scale
 * - animateOpacity: true - animate the opacity to 1 
 *  false - animate the opacity to a give existing value ( must provide existing )
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateScaleAnimation(animation: FadeAnimation){
    const {
        animationDuration,
        oneDirectionalAnimation,
        existing
    } = animation;

    const fade = existing? existing : useSharedValue({opacity:0,scale:0.8})

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{scale:fade.value.scale}],
        opacity: fade.value.opacity
    }))
    
    const animateIntro = () =>{
        fade.value = withTiming({opacity:1,scale:1},
            {duration:animationDuration});
    }
    const animateOutro = () =>{
        if(oneDirectionalAnimation) 
            fade.value = withTiming({opacity:0,scale:0.8},{duration:animationDuration})
        else
            fade.value = withTiming({opacity:0,scale:1.2},{duration:animationDuration})

        setTimeout(()=>{
            fade.value = {opacity:0,scale:0.8}
        },animationDuration)
    }
    return {animateIntro,animateOutro,animatedStyles}
}

/**
 * Generate slide left animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - existing: You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - opacityToAnimate: 0-1
 *  false - animate the opacity to a give existing value ( must provide existing )
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateFadeAnimation(animation: OpacityAnimation){
    const {existing,animationDuration,opacityToAnimate=1} = animation;
    
    const opacity = existing? existing : useSharedValue(0)

    const animatedStyles = useAnimatedStyle(()=>({
        opacity: opacity.value
    }))
    
    const animateIntro = () =>{
        opacity.value = withTiming(opacityToAnimate,{duration:animationDuration});
    }
    const animateOutro = () =>{
        opacity.value = withTiming(0, {duration:animationDuration})
    }
    return {animateIntro,animateOutro,animatedStyles}
}

/**
 * Generate slide left animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - oneDirectionalAnimation: true -> left intro - left outro , false -> left intro - right outro
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - animateOpacity whether the opacity will be animated or not
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateSlideLeftAnimation(animation: LeftRightAnimation){
    const {
        animationDuration,
        oneDirectionalAnimation,
        animateOpacity=true,
        existing,
        translateX=100
    } = animation;

    const initialOpacity = React.useRef(animateOpacity? 0 : 1);
    const left = existing? existing: useSharedValue({translateX:-(translateX),opacity:initialOpacity.current});

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{translateX:left.value.translateX}],
        opacity: left.value.opacity
    }))


    const animateIntro = () =>{
        left.value = withTiming({translateX:0,opacity:1},{duration:animationDuration});
    }
    const animateOutro = () =>{
        if(oneDirectionalAnimation)
            left.value = withTiming({translateX:-(translateX),opacity:initialOpacity.current},{duration:animationDuration})
        else
            left.value = withTiming({translateX:(translateX),opacity:initialOpacity.current},{duration:animationDuration})
        setTimeout(()=>{
            left.value = {translateX:-(translateX),opacity:initialOpacity.current}
        },animationDuration)
    }
    return {animateIntro,animateOutro,animatedStyles}
}

/**
 * Generate slide right animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - oneDirectionalAnimation: true -> right intro - right outro , false -> right intro - left outro
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - animateOpacity whether the opacity will be animated or not
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateSlideRightAnimation(animation: LeftRightAnimation){
    const {
        animationDuration,
        oneDirectionalAnimation,
        animateOpacity=true,
        existing,
        translateX=100
    } = animation;
    
    const initialOpacity = React.useRef(animateOpacity? 0 : 1);
    let right = existing? existing: useSharedValue({translateX:(translateX),opacity:initialOpacity.current});

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{translateX:right.value.translateX}],
        opacity: right.value.opacity
    }))

    const animateIntro = () =>{
        right.value = withTiming({translateX:0,opacity:1},{duration:animationDuration});
    }
    const animateOutro = () =>{
        if(oneDirectionalAnimation)
            right.value = withTiming({translateX:(translateX),opacity:initialOpacity.current},{duration:animationDuration})
        else
            right.value = withTiming({translateX:-(translateX),opacity:initialOpacity.current},{duration:animationDuration})
        setTimeout(()=>{
            right.value = {translateX:(translateX),opacity:initialOpacity.current}
        },animationDuration)
    }
    return {animateIntro,animateOutro,animatedStyles}
}

/**
 * Generate slide top animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - oneDirectionalAnimation: true -> top intro - bottom outro, false -> top intro - top outro
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - animateOpacity whether the opacity will be animated or not, sometimes you would just want one value
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateSlideTopAnimation(animation: TopBottomAnimation){
    const {
        animationDuration,
        oneDirectionalAnimation, 
        animateOpacity=true,
        existing,
        translateY=100
    } = animation;

    const initialOpacity = React.useRef(animateOpacity? 0 : 1);
    let top = existing? existing: useSharedValue({translateY:-(translateY),opacity:initialOpacity.current});

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{translateY:top.value.translateY}],
        opacity: top.value.opacity
    }))
    
    const animateIntro = () =>{
        top.value = withTiming({translateY:0,opacity:1}),{duration: animationDuration};
    }

    const animateOutro = () =>{
        if(oneDirectionalAnimation) 
            top.value = withTiming({translateY:-(translateY),opacity:initialOpacity.current},{duration:animationDuration});
        else
            top.value = withTiming({translateY:(translateY),opacity:initialOpacity.current},{duration:animationDuration});
        setTimeout(()=>{
            top.value = {translateY:-(translateY),opacity:initialOpacity.current};
        },animationDuration)
    }
    return {animateIntro,animateOutro,animatedStyles}
}

/**
 * Generate slide bottom animation intro and outro and animatedStyles to use it in your component,
 * @param
 * - oneDirectionalAnimation: true -> bottom intro - top outro, false -> bottom intro - bottom outro
 * - animationDuration: to animate to the exact duration, fewer is better!!
 * - You can provide existing value SharedValue<{translateX:number,opacity:number}>
 * - animateOpacity whether the opacity will be animated or not, sometimes you would just want one value
 * @returns animateIntro and animateOutro function and animatedStyles values
 */
export function GenerateSlideBottomAnimation(animation: TopBottomAnimation){
    const {
        animationDuration,
        oneDirectionalAnimation,
        animateOpacity=true,
        existing,
        translateY=100
    } = animation;

    const initialOpacity = React.useRef(animateOpacity? 0 : 1);
    let bottom = existing? existing: useSharedValue({translateY:(translateY),opacity:initialOpacity.current});

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{translateY:bottom.value.translateY}],
        opacity: bottom.value.opacity
    }))
    
    const animateIntro = () =>{
        bottom.value = withTiming({translateY:0,opacity:1}),{duration: animationDuration};
    }
    const animateOutro = () =>{
        if(oneDirectionalAnimation) 
            bottom.value = withTiming({translateY:(translateY),opacity:initialOpacity.current},{duration:animationDuration})
        else
            bottom.value = withTiming({translateY:-(translateY),opacity:initialOpacity.current},{duration:animationDuration})
        setTimeout(()=>{
            bottom.value = {translateY:(translateY),opacity:initialOpacity.current};
        },animationDuration)
    }
    return {animateIntro,animateOutro,animatedStyles}
}

type animationProperties = {
    /**Extended properties of Dialog animation */
    animationType: animationType,
    /**If the animation is one directional, left entrance -> left outro (true) : left entrance -> right outro 
     * only available for slideFromLeft and slideFromRight, 
     * 
     * will be removed if it is not used that much:)
    */
    oneDirectionalAnimation: boolean,
    /** Duration of the animation,  */
    animationDuration: number,
    existingValue?: SharedValue<{translateX:number,opacity:number}>|SharedValue<{translateY:number,opacity:number}>,
}

type FadeAnimation = {
    oneDirectionalAnimation:boolean,
    animationDuration: number, 
    existing?: SharedValue<{opacity:number,scale:number}>,
}
type LeftRightAnimation = {
    oneDirectionalAnimation:boolean,
    animationDuration: number, 
    existing?: SharedValue<{translateX:number,opacity:number}>,
    animateOpacity?: boolean,
    translateX?: number,
}
type TopBottomAnimation = {
    oneDirectionalAnimation:boolean,
    animationDuration: number, 
    existing?: SharedValue<{translateY:number,opacity:number}>,
    animateOpacity?: boolean,
    translateY?: number,
}
type OpacityAnimation = {
    existing?: SharedValue<number>,
    animationDuration: number, 
    opacityToAnimate?: number
}