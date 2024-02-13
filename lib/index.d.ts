//Type definitions a - z

import React, { Dispatch, SetStateAction } from "react"
import { ViewProps, TextProps, DimensionValue, TextInputProps } from 'react-native'
import { SharedValue } from "react-native-gesture-handler"
import { animationType, direction, variant, Sizes, btnSize, color, fontSizes, tint, fontWeight, textAlign } from "./default"


/////////////////////////////////////////////////////////////////////////////////////////////////
//Accordion props
/** Overriding the ViewProps for custom properties, */
export interface AccordionProps extends ViewProps {
    allowOpeningMoreThanTwo?: boolean,
    data: string[],
    dataFontSize?: fontSizes,
    /** Supply your index from 1 */
    defaultOpenedIndex?: number[]
    headings: string[],
    headingFontSize?: fontSizes,
    type?: 'plus'|'arrow'|'none',
}
// Props of each accordion element
export interface AccordionElementProps {
    allowOpeningMoreThanTwo: boolean,
    data: string,
    dataFontSize: fontSizes,
    heading: string,
    headingFontSize: fontSizes,
    open: Set<number>,
    rightElementType: 'plus'|'arrow'|'none',
    selectedIndex: number,
    setOpen: Dispatch<SetStateAction<Set<number>>>,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Button Props */

/** 
 * Overriding the ViewProps for custom properties
 * You can customize extra props here! 
*/
export interface BtnProps extends ViewProps {
    animateScale?: boolean,
    asChild?: boolean,
    /** Fill the parent view or not */
    block?: boolean,
    children?: React.ReactNode,
    /** Disabled */
    disabled?: boolean,
    italic?: boolean,
    onBlur?: ()=>void,
    onFocus?: ()=>void,
    onHover?: ()=>void,
    onHoverOut?: ()=>void,
    onPress?: ()=>void,
    onPressOut?: ()=>void,
    /** Rounded or not */
    rounded?: boolean,
    /** Size variant - xs, sm, md, lg, xl*/
    size?: btnSize,
    /** The title of the button, provide if asChild is not used */
    title?: string,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
/** Badge props */
export interface BadgeProps extends ViewProps{
    /** Rounded or not */
    rounded?: boolean,
    /** Size variant - xs, sm, md, lg, xl*/
    size?: btnSize,
    /** The title must be provided */
    title: string,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Calendar Props */
interface CalendarProps {
    /** first showing month and year */
    initDate?: {
        month: number,
        year: number
    },
    /** Sun, Mon or Su, Mo */
    numberOfLetters?: 2|3,
    /** return date in string ( for example: 1 January 2023 ) */
    onValueChange?: (dateData: string)=>void,
}
interface CalendarHeadingProps {
    date: DateData,
    NextMonth: ()=>void,
    openMonthView: ()=>void,
    openYearView: ()=>void,
    PreviousMonth: ()=>void,
}
interface DateData{
    date: number,
    month: number,
    year: number
}
interface CurrentMonthProps {
    numberOfLetters: 2|3,
    openDayView: ()=>void,
}
interface DayProp extends DateData{
    onValueChange: (dateData: string)=>void,
}
interface EachDayProps {
    date: number,
    month: number,
    year: number,
    onValueChange: (dateData: string)=>void
    selectedDate: string,
    setSelectedDate: Dispatch<SetStateAction<string>>,
    unselectable: boolean,
}
interface MonthProps {
    selectedMonth: number,
    setSelectedMonth: (month: number)=>void,
    openDayView: ()=>void,
}
interface YearProps {
    openMonthView: ()=>void,
    setYear: (year: string)=>void
    year: number,
}
interface EachMonthProps {
    month: number,
    openDayView: ()=>void,
    selectedMonth: number,
    setSelectedMonth: (month: number)=>void,
    title: string,
}
type Months = 'January'|'February'|'March'|'March'|'April'|'May'|'June'|'July'|'August'|'September'|'October'|'November'|'December'

type Days = 'Sun'|'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Checkbox */
interface CheckboxProps {
    description?: React.ReactNode,
    defaultChecked?: boolean,
    onChange?: (checked: boolean)=>{},
    variant?: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Switch */
export interface SwitchCheckProps  {
    /** Duration in ms */
    animationDuration?: number,
    disabled?: boolean,
    /** Description beside the the switch */
    description?: React.ReactNode,
    defaultChecked?: boolean,
    onChange?: (checked: boolean)=>{},
    /** Variant, only supported for black and white yet */
    variant?: 'black'|'white',
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Dialog props */
export interface DialogProps {
    animationProperties?: animationProperties,
    backdrop?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    /** If clicking on the backdrop would hides the modal */
    backdropPressHidesModal?: boolean,
    /** Body component */
    children?: React.ReactNode,
    /** Header component */
    header?: React.ReactNode,
    footer?: {
        /** inner text of the buttons */
        title: string,
        /** Additional action to perform */
        action?: ()=>void
    },
    /** Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    /** Visible state */
    visible: boolean,
    /** black and white */
    variant: 'black'|'white'
}
export type animationProperties = {
    /** Duration of the animation,  */
    animationDuration: number
    /**Extended properties of Dialog animation */
    animationType: animationType,
    /**If the animation is one directional, left entrance -> left outro (true) : left entrance -> right outro  */
    oneDirectionalAnimation: boolean,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Dropdown */
type data = {
    /** Data that will be returned when it is selected */
    data: string,
    /** Label to be displayed */
    label: string
}
interface DropdownItemProps {
    data: data,
    index: number,
    onChange: (data: data)=>void,
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    toggleVisible: ()=>void,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
interface DropdownProps {
    data: data[],
    /** Height of the flatlist inside the dropdown */
    height: number,
    onChange: (data: data)=>void,
    placeholder?: string,
    /** selected index starting from 1 */
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    /** Only the placeholder button size will be affected by this! */
    size?: btnSize,
    width: number,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Input props */
export interface InputProps extends TextInputProps {
    borderRadius?: number,
    borderWidth?: number,
    /** xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl */
    fontSize?: fontSizes,
    height?: number,
    /** Horizontal padding */
    paddingHorizontal?: number,
    /** Vertical Padding */
    paddingVertical?: number,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
    width?: number,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Slider Props */
export interface SliderProps {
    defaultValue?: number,
    max?: number,
    min?: number,
    onChange?: (value: number)=>void,
    variant?: 'black'|'white',
    width?: number,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Link button props */
export interface LinkBtnProps extends ViewProps {
    disabled?: boolean,
    fontSize?: fontSizes,
    onHover?: ()=>void,
    onPress?: ()=>void,
    /** The title must be provided */
    title: string,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
/** Swipe to dimiss menus */
export interface DrawerProps {
    backdrop?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    /** If clicking on the backdrop would hides the modal */
    backdropPressHidesMenu?: boolean,
    background?: {
        color: string,
        /**must be between 0-1 */
        opacity: number,
    },
    children?: React.ReactNode,
    /** location of the draggable menu */
    direction: direction,
    header?: string,
    /** If the notch is visible or not */
    notchVisible?: boolean,
    /** Set state must be the function from useState */
    setVisible: Dispatch<SetStateAction<boolean>>,
    /** Visible state */
    visible: boolean,
    /** Width for left & right menu. Height for top & bottom menu */
    widthOrHeight: number
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Tab types
export interface TabProps{
    contents: React.ReactNode[],
    /** Opened index starting from 0 */
    defaultOpenedIndex?: number,
    headings: string[],
    height: DimensionValue
    variant?: 'black'|'white',
    width?: DimensionValue,
}
export type TabHeadingsProps = {
    headings: string[],
    openedIndex: number,
    setOpenedIndex: Dispatch<SetStateAction<number>>,
    variant: 'black'|'white',
}
export type TabContentsProps = {
    contents: React.ReactNode[],
    height: DimensionValue,
    openedIndex: number,
    variant: 'black'|'white',
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
// Toggle type
export interface ToggleProps {
    description: string,
    variant?: variants,
    disabled?: boolean,
    defaultToggled?: boolean,
    onToggle?: (toggled: boolean)=>void
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Text types
export interface TextProp extends TextProps{
    color?: color,
    fontSize?: fontSizes,
    fontWeight?: fontWeight,
    textAlign?: textAlign,
    /** 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 */
    tint?: tint,
    variant?: textVariant
}
type textVariant = 'primary'|'primaryForeground'|'secondary'|'secondaryForeground'|'tertiary'|'tertiaryForeground'|
            'success'|'successForeground'|'warning'|'warningForeground'|'error'|'errorForeground'|'black'|'white'
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
//Toast props
export interface toastContext{
    /** animation type */
    animationType?: animationType,
    /** bottom loading bar present or not */
    bottomBar?: boolean,
    closeBtn?: string,
    closeBtnSize?: btnSize,
    /** Setting zero will not hide the toast at all */
    hidesAfterNoInteraction?: number,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
export interface toastElementContext{
	intendedIndex: number,
	selectedIndex: number,
}
export interface ToastProps{
    animatedStyles: any,
    bottomBar: boolean,
    closeBtn: string,
    closeBtnSize: btnSize,
    closeToast: ()=>void,
    duration: number,
    message: string,
    openToast: ()=>void,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
export interface ToastMethod{
    /** Message to display */
    message: string,
    /** Primary, Secondary, Tertiary, Success, Warning, Error, Black, White */
    variant?: variant,
}
/////////////////////////////////////////////////////////////////////////////////////////////////



