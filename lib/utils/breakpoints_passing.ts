export type breakPointsProperties<T> = {
    xs?: T,     //this only exists here, it is only used for initial properties
    vs?: T,
    sm?: T,
    md?: T,
    lg?: T,
    vlg?: T,
    xl?: T,
    xxl?: T,
    tv?: T
}
export default function mobileFirstBreakpointsChanging<T>(
    style: breakPointsProperties<T>, 
    defaultStyle: T)
    {
    let newStyle = style? style: {xs: defaultStyle};
    // if the breakpoints exist, we will skip, if it doesn't we will just assign
    let passedStyle = defaultStyle;

    if(!newStyle.vs) newStyle.vs = passedStyle;
    else passedStyle = newStyle.vs;

    if(!newStyle.sm) newStyle.sm = passedStyle;
    else passedStyle = newStyle.sm;

    if(!newStyle.md) newStyle.md = passedStyle;
    else passedStyle = newStyle.md;

    if(!newStyle.lg) newStyle.lg = passedStyle;
    else passedStyle = newStyle.lg;

    if(!newStyle.vlg) newStyle.vlg = passedStyle;
    else passedStyle = newStyle.vlg;

    if(!newStyle.xl) newStyle.xl = passedStyle;
    else passedStyle = newStyle.xl;

    if(!newStyle.xxl) newStyle.xxl = passedStyle;
    else passedStyle = newStyle.xxl;

    if(!newStyle.tv) newStyle.tv = passedStyle;
    else passedStyle = newStyle.tv;

    return newStyle;
}