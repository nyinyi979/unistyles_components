import React from "react";
import Animated from "react-native-reanimated";
import Button from "./button";
import { FlatList, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { selectProps, optionProps } from "..";
import { GenerateScaleAnimation } from "../utils/slide_animation";

/**
 * 
 * @param Select
 * - data - an array of data to be displayed in the dropdown
 * - height - height of the flatlist, provide larger value if you don't want it to be a flatlist(scrollbar hidden)
 * - width - width of the dropdown
 * - selectedIndex - default selected index ( starting from 1 )
 * - onChange - will return data: {data: string, label: string} when updated
 * - size - button sizes
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - placeholder - placeholder before anything is selected
 * @returns dropdown react node
 */
export default function Select(props: selectProps){
    const {
        data,
        height,
        width,
        selectedIndex=0,
        setSelectedIndex,
        onChange=()=>{},
        size='md',
        variant='ghost',
        placeholder="Select"
    } = props;

    const {styles:{dropdown,containerView,placeholderStyle,arrowContainer,arrow,mainContainer}} = useStyles(styleSheet,{
        variant: variant
    });
    let timeOut:NodeJS.Timeout;
    const [visible, setVisible] = React.useState(false);
    !visible&&clearInterval(timeOut);
    const {current:{animateIntro,animateOutro,animatedStyles}} = React.useRef(GenerateScaleAnimation({
        animationDuration: 100,
        oneDirectionalAnimation: true,
    }));
    
    const toggle = (vis?:boolean) =>{
        if(vis) {
            setVisible(vis);
            return;
        }
        if(visible) {
            animateOutro();
            timeOut = setTimeout(()=>{
                setVisible(false);
            },100)
        } 
        else {
            setVisible(true);
            animateIntro();
        }
    }
    return(
        <View style={[{width:width},mainContainer]}>
            <Button 
                variant={variant} 
                size={size} 
                onPress={toggle} 
                onBlur={()=>{toggle(false)}}
                block
                // Change the border rounded here
                rounded={true} 
                asChild>
                <View style={{flexDirection:'row',position:'relative'}}>
                    <Text selectable={false} numberOfLines={1} style={[{color:dropdown.color},placeholderStyle]}>
                        {selectedIndex===0? placeholder : data[selectedIndex-1].label}
                    </Text>
                    <View style={arrowContainer}>
                        <Text style={[arrow,{marginBottom:'-40%',color:dropdown.color}]}>&lt;</Text>
                        <Text style={[arrow,{color:dropdown.color}]}>&gt;</Text>
                    </View>
                </View>
            </Button>
            
            <Animated.View style={[
                animatedStyles,containerView,
                {bottom:-height-2,height:height,display: visible? 'flex':'none'}
            ]}>
            <FlatList 
                style={{zIndex:3}}
                data={data}
                renderItem={({item,index})=>(
                    <Option 
                        data={item}
                        index={index+1}
                        onChange={onChange}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        size={size}
                        toggleVisible={toggle}
                        variant={variant}
                        key={index}
                    />
            )}/>

            </Animated.View>
        </View>
    )
}

function Option(props: optionProps){
    const {data,setSelectedIndex,variant,index,selectedIndex,size,onChange,toggleVisible} = props;
    const intendedData = React.useRef(index);
    const setSelectedData = () => {
        onChange(data);
        setSelectedIndex(intendedData.current);
    }
    const {styles} = useStyles(styleSheet,{
        variant
    });
    return(
        <Button 
            variant={variant} 
            onPress={setSelectedData} 
            rounded={false} 
            animateScale={false}
            block 
            size={size}
            title={data.label}
            style={{marginTop:.15}}
        />
    )

}

const styleSheet = createStyleSheet((theme)=>({
    dropdown:{
        variants:{
            variant:{
                primary: {
                    color: theme.color.primaryForeground,
                },
                secondary: {
                    color: theme.color.secondaryForeground,
                },
                tertiary: {
                    color: theme.color.tertiaryForeground,
                },
                success: {
                    color: theme.color.successForeground,
                },
                warning: {
                    color: theme.color.warningForeground,
                },
                error: {
                    color: theme.color.errorForeground,
                },
                ghost:{
                    color: theme.color.black
                }
            }
        }
    },
    mainContainer:{
        position:'relative',
        zIndex:2,
        borderRadius:5,
        alignSelf:'flex-start'
    },
    containerView:{
        position:'absolute',
        left:0,
        width:'100%',
        zIndex:10
    },
    placeholderStyle:{
        justifyContent:'center',
        width:'75%',
        paddingVertical:5,
        marginRight:20,
        fontSize:16
    },
    arrowContainer:{
        position:'absolute',
        zIndex:3,
        right:3,
        top:'6%'
    },
    arrow:{
        transform:[{rotate:'90deg'}],
        fontSize: 12
    }
}))