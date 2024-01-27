//Type definitions a - z

import { Dispatch, SetStateAction } from "react"

/////////////////////////////////////////////////////////////////////////////////////////////////
//Accordion props
/** Overriding the ViewProps for custom properties, */
export interface AccordionProps extends ViewProps {
    data: string[],
    headings: string[],
    type?: 'plus'|'arrow'|'none',
    allowOpeningMoreThanTwo: boolean,
    /** Supply your index from 1 */
    defaultOpenedIndex?: number[]
}
// Props of each accordion element
export interface AccordionElementProps {
    selectedIndex: number,
    open: Set<number>,
    allowOpeningMoreThanTwo: boolean,
    setOpen: Dispatch<SetStateAction<Set<number>>>,
    data: string,
    heading: string,
    rightElementType: 'plus'|'arrow'|'none'
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Button Props */

/** 
 * Overriding the ViewProps for custom properties
 * You can customize extra props here! 
*/
export interface BtnProps extends ViewProps {
    /**The title must be provided */
    title: string,
    /**Variant of the button. Custom buttons can be made! */
    variant?: variant,
    /**Size variant */
    size?: 'sm'|'md'|'lg'|'xl',
    /**Align the heading */
    block?: boolean,
    /**Color of the heading */
    color?: 'string',
    onPress?: ()=>void,
    onHover?: ()=>void,
    onHoverOut?: ()=>void,
    onPressOut?: ()=>void
}
/** Type - array of style data
 *  for destructuring the value which will be used in the component itself */ 
export type BtnTypeArray = [
    {
        backgroundColor: string,
        pressedColor: string,
        hoverColor: string,
        color: string,
        borderWidth?: number,
        borderColor?: string,
    },
    {
        paddingHorizontal: number,
        paddingVertical: number,
        fontSize: number,
    }
]
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Dialog props */
export interface DialogProps {
    animationProperties?: animationProperties,
    /**Visible state */
    visible: boolean,
    /**Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    footer?: {
    /** inner text of the buttons */
        title: string,
        action?: ()=>void
    },
    /** Provides a number between 1-100, no range check is done so just check this value if something is wrong */
    background?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    backdrop?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    /**Header component */
    header?: React.ReactNode,
    /**Body component */
    children?: React.ReactNode,
    /**If clicking on the backdrop would hides the modal */
    backdropPressHidesModal?: boolean,
}
export type animationProperties = {
    /**Extended properties of Dialog animation */
    animationType: animationType,
    /**If the animation is one directional, left entrance -> left outro (true) : left entrance -> right outro  */
    oneDirectionalAnimation: boolean,
    /** Duration of the animation,  */
    animationDuration: number
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/**Swipe to dimiss menus */
export interface MenuProps {
    background?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    backdrop?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    /**Visible state */
    visible: boolean,
    /**Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    /**Header component */
    header?: string,
    children?: React.ReactNode,
    /**If clicking on the backdrop would hides the modal */
    backdropPressHidesMenu?: boolean,
    /**If the notch is visible or not */
    notchVisible?: boolean,
    /**Direction of the  */
    direction: 'left'|'right'|'top'|'bottom',
    widthOrHeight: number
}
export interface leftRightTopBottomMenuProps {
    direction: 'top'|'right'|'bottom'|'left',
    size: number,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}
export interface MenuPropsPassed extends MenuProps { 
    direction: 'top'|'bottom'|'left'|'right',
    animatedStyles: any,
    drag: any,
    animateIntro: ()=>void,
    animateOutro: ()=>void,
    drawn: SharedValue<boolean>,
    width?: number,
    height?:number,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Toast props
export interface toastContext{
    closeBtn?: string,
    /**Setting zero will not hide the toast at all */
    hidesAfterNoInteraction?: number,
    /**outro animation when clicked closeBtn */
    animationType?: 'slideFromTop'|'slideFromRight'|'slideFromBottom'|'slideFromLeft',
    message?: string
}
export interface toastElementContext{
	intendedIndex: number,
	selectedIndex: number,
}
export interface ToastProps{
    message: string,
    variant: variant,
    openToast: ()=>void,
    closeToast: ()=>void,
    animatedStyles: any,
    closeBtn: string
}
export interface ToastMethod{
    message: string,
    variant: variant
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export type animationType = 'slideFromLeft'|'slideFromRight'|'slideFromBottom'|'slideFromTop'|'scale'|'fade'
export type variant = 'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'|'outlined'
/////////////////////////////////////////////////////////////////////////////////////////////////

