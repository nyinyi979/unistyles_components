/**
 * @size is used for margin/border radius/font size
 * @theme theme name
 * @spacing is used for width & height primarily 
 */
export type Themes = {
    [theme:string]: {
        color:color
        size:size[],
        breakPoint:breakPoint[]
    }
}
type size = {
    [size:string]: number
}
type breakPoint = { 
    [BreakPoint:string]: number
}
type color = {
    'primary': string,
    'primaryForeground': string,
    'secondary': string,
    'secondaryForeground': string,
    'tertiary': string,
    'tertiaryForeground': string,
    'warning': string,
    'warningForeground': string,
    'error': string,
    'errorForeground': string,
    [color:string]: string|undefined
}
