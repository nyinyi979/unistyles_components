//Type definitions a - z

import { Dispatch, SetStateAction } from "react"
import { ViewProps, TextProps } from 'react-native'
import { SharedValue } from "react-native-gesture-handler"
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
    /** The title must be provided */
    title: string,
    /** Variant of the button. Custom buttons can be made! */
    variant?: variant,
    /** Size variant */
    size?: 'sm'|'md'|'lg'|'xl',
    /** Fill the view or not */
    block?: boolean,
    /** Color of the heading */
    color?: 'string',
    /** Outlined buttom */
    outlined?: boolean,
    /** Rounded or not */
    rounded?: boolean,
    onPress?: ()=>void,
    onHover?: ()=>void,
    onHoverOut?: ()=>void,
    onPressOut?: ()=>void,
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
    /** Visible state */
    visible: boolean,
    /** Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    footer?: {
        /** inner text of the buttons */
        title: string,
        /** Additional action to perform */
        action?: ()=>void,
        /** Variant of the footer, only supported on unistyles buttons:) */
        variant?: variant
    },
    /** Provides a number between 1-100, no range check is done so just check this value if something is wrong */
    background?: {
        color: string,
        /** must be between 0-1 */
        opacity?: number,
    },
    backdrop?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    /** Header component */
    header?: React.ReactNode,
    /** Body component */
    children?: React.ReactNode,
    /** If clicking on the backdrop would hides the modal */
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
/** Swipe to dimiss menus */
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
    /** Visible state */
    visible: boolean,
    /** Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    /** Header component */
    header?: string,
    children?: React.ReactNode,
    /** If clicking on the backdrop would hides the modal */
    backdropPressHidesMenu?: boolean,
    /** If the notch is visible or not */
    notchVisible?: boolean,
    /** Direction of the draggable menu */
    direction: 'left'|'right'|'top'|'bottom',
    /** Width for left & right menu. Height for top & bottom menu */
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
//Text types
export interface TextProp extends TextProps{
    size?: 'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'
    color?: color,
    /** 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 */
    tint?: tint,
    fontWeight?: fontWeight,
    textAlign?: textAlign
}
export type size = 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'
export type color = 'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'|'black'|'white'|
'slate'|'gray'|'zinc'|'neutral'|'stone'|'red'|'orange'|'amber'|'yellow'|'lime'|'green'|
'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose'
export type tint = 50|100|200|300|400|500|600|700|800|900|950
export type fontWeight = '100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'
export type textAlign = 'center'|'justify'|'left'|'right'
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Toast props
export interface toastContext{
    closeBtn?: string,
    /** Setting zero will not hide the toast at all */
    hidesAfterNoInteraction?: number,
    /** outro animation when clicked closeBtn */
    animationType?: 'slideFromTop'|'slideFromRight'|'slideFromBottom'|'slideFromLeft',
    /** bottom loading bar present or not */
    bottomBar?: boolean,
    /** default variant, if you don't want to set it in toast message */
    variant?: variant
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
    closeBtn: string,
    duration: number,
    bottomBar: boolean,
}
export interface ToastMethod{
    /** Message to display */
    message: string,
    /** Variant of the message box, you can change it on each toast method... woo */
    variant: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export type animationType = 'slideFromLeft'|'slideFromRight'|'slideFromBottom'|'slideFromTop'|'scale'|'fade'
export type variant = 'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'|'black'|'white'
/////////////////////////////////////////////////////////////////////////////////////////////////

