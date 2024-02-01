//Type definitions a - z

import React, { Dispatch, SetStateAction } from "react"
import { ViewProps, TextProps, DimensionValue } from 'react-native'
import { SharedValue } from "react-native-gesture-handler"
import { breakPointsProperties, buttonBreakpointStyle, textBreakpointStyle } from "./breakpoints"
import { animationType, direction, variant, Sizes, btnSize, color, fontSizes, tint, fontWeight, textAlign } from "./default"


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
    size?: btnSize,
    /** Fill the view or not */
    block?: boolean,
    /** Rounded or not */
    rounded?: boolean,
    onPress?: ()=>void,
    onHover?: ()=>void,
    onHoverOut?: ()=>void,
    onPressOut?: ()=>void,
    /** Breakpoints */
    breakpoints?: breakPointsProperties<buttonBreakpointStyle>
}

/** Badge props */
export interface BadgeProps extends ViewProps{
    /** The title must be provided */
    title: string,
    /** Variant of the button. Custom buttons can be made! */
    variant?: variant,
    /** Size variant */
    size?: btnSize,
    /** Outlined buttom */
    outlined?: boolean,
    /** Rounded or not */
    rounded?: boolean,
    /** Breakpoints */
    breakpoints?: breakPointsProperties<buttonBreakpointStyle>
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Calendar Props */
interface CalendarProps {
    /** Sun, Mon or Su, Mo */
    numberOfLetters?: 2|3,
    /** return date in string ( for example: 1 January 2023 ) */
    onValueChange?: (dateData: string)=>void,
    /** first showing month and year */
    initDate?: {
        month: number,
        year: number
    }
}
interface CalendarHeadingProps {
    numberOfLetters: 2|3,
    date: DateData,
    NextMonth: ()=>void,
    PreviousMonth: ()=>void
}
interface DateData{
    date: number,
    month: number,
    year: number
}
interface DayProp extends DateData{
    onValueChange: (dateData: string)=>void
}
interface EachDayProp {
    date: number,
    month: number,
    year: number,
    unselectable: boolean,
    selectedDate: string,
    setSelectedDate: Dispatch<SetStateAction<string>>,
    onValueChange: (dateData: string)=>void
}
type Months = 'January'|'February'|'March'|'March'|'April'|'May'|'June'|'July'|'August'|'September'|'October'|'November'|'December'

type Days = 'Sun'|'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'
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
/** Grid */
export interface GridContext {
    /** Amount of cols? */
    cols: cols,
    /** Amount of rows? */
    rows?: rows,
    /** Width of the parent in number, it is required */
    width: number|'100%',
    /** Height of the parent, it is required */
    height: number,
    /** Gap, can be provided with Sizes['...'] */
    gap?: number|Sizes
}
export interface GridRowContext {
    rowSpan?: rows,
    height?: number,
    children?: React.ReactNode
}
export interface GridColContext {
    colSpan?: cols,
    children?: React.ReactNode
}
export interface GridProps extends ViewProps,GridContext{
    children?: React.ReactNode
}
export interface GridRowProps extends GridRowContext,ViewProps{
    children?: React.ReactNode
}
export interface GridColProps extends GridColContext,ViewProps{
    children?: React.ReactNode
}
/////////////////////////////////////////////////////////////////////////////////////////////////
type cols = 1|2|3|4|5|6|7|8|9|10|11|12
type rows = 1|2|3|4|5|6
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
    direction: direction,
    /** Width for left & right menu. Height for top & bottom menu */
    widthOrHeight: number
}
export interface leftRightTopBottomMenuProps {
    direction: direction,
    size: number,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}
export interface MenuPropsPassed extends MenuProps { 
    direction: direction,
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
    fontSize?: fontSizes,
    color?: color,
    /** 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 */
    tint?: tint,
    fontWeight?: fontWeight,
    textAlign?: textAlign,
    breakpoints?: breakPointsProperties<textBreakpointStyle>
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Toast props
export interface toastContext{
    closeBtn?: string,
    /** Setting zero will not hide the toast at all */
    hidesAfterNoInteraction?: number,
    /** outro animation when clicked closeBtn */
    animationType?: animationType,
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

/////////////////////////////////////////////////////////////////////////////////////////////////


