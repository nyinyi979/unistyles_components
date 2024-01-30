import { btnSize, fontSizes, fontWeight, textAlign } from "./default"

export type breakpoints = 'vs'|'sm'|'md'|'lg'|'vlg'|'xl'|'xxl'|'tv'

export type breakPointsProperties<T> = {
    vs?: T,
    sm?: T,
    md?: T,
    lg?: T,
    vlg?: T,
    xl?: T,
    xxl?: T,
    tv?: T
}

export type buttonBreakpointStyle = {
    size?: btnSize,
}
export type textBreakpointStyle = {
    fontSize?: fontSizes,
    textAlign?: textAlign,
    fontWeight?: fontWeight
}