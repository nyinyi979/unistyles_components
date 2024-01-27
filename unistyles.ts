import { UnistylesRegistry } from "react-native-unistyles";
import { DefaultBreakPoints } from "./lib/default_values/default_breakpoints";
import { DefaultColors } from "./lib/default_values/default_colors";
import { DefaultLightPlatelette } from "./lib/default_values/default_light";
import { DefaultDarkPlatelette } from "./lib/default_values/default_dark";
import { Defaultsizes, DefaultFontSizes } from "./lib/default_values/default_sizes";

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

export const LightTheme = {
    breakPoint:DefaultBreakPoints,     //CTRL + Click on this breakpoints to modify the existing breakpoints
    color:{
        ...DefaultLightPlatelette,
        ...DefaultColors
        // 'your_color_name' : 'your_color_hex_code'
    },
    size: {
        ...Defaultsizes,
        // 'your_size_number' : 'your_size_in_px' -_-
    },
    fontSize: {
        ...DefaultFontSizes
        // 'your_size_string' : 'your_size_in_px' :)
    }
}

export const DarkTheme = {
    breakPoint:DefaultBreakPoints,     //CTRL + Click on this breakpoints to modify the existing breakpoints
    color:{
        ...DefaultDarkPlatelette,
        ...DefaultColors
        // 'your_color_name' : 'your_color_hex_code'
    },
    size: {
        ...Defaultsizes,
        // 'your_size_number' : 'your_size_in_px' -_-
    },
    fontSize: {
        ...DefaultFontSizes
        // 'your_size_string' : 'your_size_in_px' :)
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