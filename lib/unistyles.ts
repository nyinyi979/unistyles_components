import { UnistylesRegistry } from "react-native-unistyles";
import { DefaultBreakPoints } from "./default_values/default_breakpoints";
import { DefaultColors } from "./default_values/default_colors";
import { DefaultDarkPlatelette, DefaultLightPlatelette } from "./default_values/default_themes";
import { DefaultSizes, DefaultFontSizes } from "./default_values/default_sizes";

type breakPoint = { 
    xxs?: number,
    xs: number,
    vs?: number,
    sm: number,
    md: number,
    lg: number,
    vlg?:  number,
    xl: number,
    vxl?: number,
    tv: number
}

// Make sure the property name of color matches as in DarkTheme
export const LightTheme = {
    breakPoint:DefaultBreakPoints,     //CTRL + Click on this breakpoints to modify the existing breakpoints
    color:{
        ...DefaultLightPlatelette,
        // 'your_color_name' : 'your_color_hex_code'
    },
}

// Make sure the property name of color matches as in LightTheme
export const DarkTheme = {
    breakPoint:DefaultBreakPoints,     //CTRL + Click on this breakpoints to modify the existing breakpoints
    color:{
        ...DefaultDarkPlatelette,
        // 'your_color_name' : 'your_color_hex_code'
    }
}

type AppThemes = { 
    light: typeof LightTheme
    dark: typeof DarkTheme
    // your_theme_name : typeof theme_name
}
// OVER-RIDING THE DEFAULT VALUES
declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends breakPoint{}
    export interface UnistylesThemes extends AppThemes{}
}

// ADDING TO UNISTYLE REGISTRY
UnistylesRegistry
.addBreakpoints(DefaultBreakPoints)
.addThemes({
    light: LightTheme,
    dark: DarkTheme
    // add new themes according to your AppThemes type
})
.addConfig({
    // initial theme to be utilized in your project
    initialTheme: 'light',
    // allow switching theme based on system JUST FOR light and dark
    adaptiveThemes: true,
})

/**
 * Font sizes values, 
 * -  xxs =  10,
 * -  xs  = 12,
 * -  sm  = 14,
 * -  md  = 16,
 * -  lg  = 18,
 * -  xl  = 20,
 * -  2xl =  24,
 * -  3xl =  32,
 * -  4xl =  40,
 * -  5xl =  52,
 * -  6xl =  60
 */
export const FontSizes = DefaultFontSizes
/** Sizes are default pixels, which you can use in margin, padding, width and height etc */
export const Sizes = DefaultSizes
export const Colors = DefaultColors

/** Enable this to allow styles to pass to bigger screen width */
export const enableExperimentalMobileFirstStyle = true