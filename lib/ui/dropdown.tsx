import React from "react";
import { FlatList, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Button from "../basic/button";
import { DropdownItemProps, DropdownProps } from "..";
import { ChevronArrow } from "../utils/svg_comp";
import { GenerateScaleAnimation } from "../utils/slide_animation";
import Animated from "react-native-reanimated";

export default function Dropdown(props: DropdownProps){
    const {
        data,
        height,
        width,
        selectedIndex=0,
        onChange=()=>{},
        size='xs',
        variant='white',
        placeholder="Select"
    } = props;

    const {styles} = useStyles(styleSheet);
    const [visible, setVisible] = React.useState(false);
    const [currentData, setSelectedData] = React.useState(selectedIndex);

    const {current:{animateIntro,animateOutro,animatedStyles}} = React.useRef(GenerateScaleAnimation({
        animationDuration: 100,
        oneDirectionalAnimation: true,
    }));
    
    const toggle = () =>{
        if(visible) {
            animateOutro();
            setTimeout(()=>{
                setVisible(false);
            },100)
        } 
        else {
            setVisible(true);
            animateIntro();
        }
    }
    return(
        <View style={{width:width,position:'relative'}}>
            <Button 
                variant={variant} 
                size={size} 
                onPress={toggle} 
                block 
                rounded={false} 
                animateScale={false} 
                asChild>
                <View style={{flexDirection:'row'}}>
                    <Text numberOfLines={1} style={[styles[variant],styles.placeholder]}>
                        {currentData==0? placeholder : data[currentData-1].label}
                    </Text>
                    <View style={{alignItems:'center',marginTop:-2}}>
                        <ChevronArrow activated={visible} color={styles[variant].color}/>
                    </View>
                </View>
            </Button>
            <Animated.View style={[
                animatedStyles,styles.container,
                {bottom:-height-2,height:height,display: visible? 'flex':'none'}
            ]}>
                {data.map((d,index)=>(
                    <List 
                    key={index}
                    size={size} 
                    variant={variant} 
                    data={d} 
                    active={index+1===currentData}
                    index={index+1}
                    setData={setSelectedData}
                    onChange={onChange}
                    />
                ))}
            </Animated.View>
        </View>
    )
}

function List(props: DropdownItemProps){
    const {data,setData,variant,index,active,onChange} = props;
    const intendedData = React.useRef(index);
    const setSelectedData = () => {
        onChange(data);
        setData(intendedData.current);
    }
    const {styles} = useStyles(styleSheet);
    return(
        <Button 
            size={'md'} 
            variant={variant} 
            onPress={setSelectedData} 
            active={active}
            rounded={false} 
            animateScale={false}
            block 
            asChild
        >
            <Text numberOfLines={1} style={styles[variant]}>{data.label}</Text>
        </Button>
    )

}

const styleSheet = createStyleSheet((theme)=>({
    'black':{
        color: theme.color['white']
    },
    'white':{
        color: theme.color['black']
    },
    'primary': {
        color: 'black',
    },
    'secondary': {
        color: 'white',
    },
    'tertiary': {
        color: 'black',
    },
    'success': {
        color: 'white',
    },
    'warning': {
        color: 'white',
    },
    'error': {
        color: 'white',
    },
    container:{
        position:'absolute',
        left:0,
        width:'100%',
    },
    placeholder:{
        justifyContent:'center',
        width:'80%',
        paddingVertical:5,
        fontSize:16
    }
}))