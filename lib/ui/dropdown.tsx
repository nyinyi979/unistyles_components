import React from "react";
import Animated from "react-native-reanimated";
import Button from "../basic/button";
import { FlatList, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { DropdownItemProps, DropdownProps } from "..";
import { GenerateScaleAnimation } from "../utils/slide_animation";

/**
 * 
 * @param Dropdown
 * - data - an array of data to be displayed in the dropdown
 * - height - height of the flatlist, provide larger value if you don't want it to be a flatlist(scrollbar hidden)
 * - width - width of the dropdown
 * - selectedIndex - default selected index ( starting from 1 )
 * - onChange - will return data: {data: string, label: string} when updated
 * - size - button sizes
 * - variant - variants
 * - placeholder - placeholder before anything is selected
 * @returns dropdown react node
 */
export default function Dropdown(props: DropdownProps){
    const {
        data,
        height,
        width,
        selectedIndex=0,
        setSelectedIndex,
        onChange=()=>{},
        size='xs',
        variant='white',
        placeholder="Select"
    } = props;

    const {styles:{dropdown,containerView,placeholderStyle,arrowContainer,arrow,mainContainer}} = useStyles(styleSheet,{
        variant: variant
    });
    const [visible, setVisible] = React.useState(false);
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
        <View style={[{width:width},mainContainer]}>
            <Button 
                variant={variant} 
                size={size} 
                onPress={toggle} 
                onBlur={()=>{toggle(false)}}
                block
                // Change the border rounded here
                rounded={true} 
                animateScale={false} 
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
                    <List 
                        data={item}
                        index={index+1}
                        onChange={onChange}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        toggleVisible={toggle}
                        variant={variant}
                        key={index}
                    />
            )}/>

            </Animated.View>
        </View>
    )
}

function List(props: DropdownItemProps){
    const {data,setSelectedIndex,variant,index,selectedIndex,onChange,toggleVisible} = props;
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
            asChild
        >
            <Text numberOfLines={1} style={{color:styles.dropdown.color}}>{data.label}</Text>
        </Button>
    )

}

const styleSheet = createStyleSheet((theme)=>({
    dropdown:{
        variants:{
            variant:{
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
                    color: 'black',
                },
                'warning': {
                    color: 'black',
                },
                'error': {
                    color: 'white',
                }
            }
        }
    },
    mainContainer:{
        position:'relative',
        zIndex:2,
        borderRadius:5
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