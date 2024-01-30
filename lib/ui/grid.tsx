import React from "react"
import { DimensionValue, View } from "react-native"
import { GridColProps, GridContext, GridProps, GridRowContext, GridRowProps } from "../.."

const GridContexts = React.createContext<GridContext>({
    cols: 6,
    rows: 6,
    height: 300,
    width: 100,
    gap: '2'
});
const RowContext = React.createContext<GridRowContext>({
    rowSpan: 1,
});

function Grid(props: GridProps){
    const {
        height,
        width='100%',
        cols=6,
        rows=6,
        children
    } = props;
    
    const size:{width:number|'100%',height:number,overflow:'hidden'} = React.useMemo(()=>{
        return {
            width: width,
            height: height,
            overflow: "hidden",
        }
    },[width,height])
    return (
        <GridContexts.Provider value={{width:width,height:height,rows:rows,cols:cols}}>
            <View style={size}>
                {children}
            </View>
        </GridContexts.Provider>
    )
}

function GridRow(props: GridRowProps){
    const {
        rowSpan=1,
        children
    } = props;
    const {height,width,rows} = React.useContext(GridContexts);
    const calculatedSize = React.useMemo(()=>{
        return {
            height: height/rows,
            width: width,
            flex:1,
            backgroundColor:'black',
            margin: 1
        };
    },[rowSpan])
    return(
        <View style={calculatedSize}>
            <RowContext.Provider value={{
                rowSpan:1,
                height:calculatedSize.height
                }} {...props}>
                <View style={{flex:1,flexDirection:'row'}}>
                    {children}
                </View>
            </RowContext.Provider>
        </View>
    )
}

function GridCol(props: GridColProps){
    const {
        colSpan=1,
    } = props;
    const {height} = React.useContext(RowContext);
    const {width,cols} = React.useContext(GridContexts);
    const children = React.Children.toArray(props.children);
    const calculatedSize:{
        width: DimensionValue,
        height: number,
        flex: 1,
    } = {
        width: width==='100%'? `${(Number(width.split('%')[0])*cols)}%` : width/cols,
        height: height,
        flex: 1,
    };
    return(
        <View style={{flex:1}}>
            <View style={calculatedSize}>
                
            </View>
        </View>
    )
}
Grid.Row = GridRow
Grid.Col = GridCol
export default Grid
