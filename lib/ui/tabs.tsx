import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { TabContentsProps, TabHeadingsProps, TabProps } from "..";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { GenerateFadeAnimation } from "../utils/slide_animation";

/**
 * 
 * @param Tab
 * - contents - ReactNode (please optimize it for themes if you are providing others but string) 
 * - headings - array of string
 * - defaultOpenedIndex - number 
 * - variant - black || white
 * - height - height of the contents
 * @returns Tab react node
 */
export default function Tab(props: TabProps){
    const {contents,headings,defaultOpenedIndex=0,variant='black',width='100%',height} = props;
    const [openedIndex, setOpenedIndex] = React.useState(defaultOpenedIndex);

    return(
        <View style={{width:width}}>
            <TabHeadings 
                headings={headings} 
                openedIndex={openedIndex} 
                setOpenedIndex={setOpenedIndex} 
                variant={variant} />
            <TabContents 
                height={height}
                contents={contents} 
                openedIndex={openedIndex} 
                variant={variant} />
        </View>
    )
}
function TabHeadings(props: TabHeadingsProps){
    const {headings,openedIndex,setOpenedIndex,variant} = props;

    const {styles:{tab,headingView,indicatorView,eachHeadingView,headingText}} = useStyles(styleSheet,{
        variant: variant
    });

    const [width,setWidth] = React.useState(0);
    const translateX = useSharedValue(width/5 * openedIndex);

    const animatedStyles = useAnimatedStyle(()=>({
        transform: [{translateX: translateX.value}]
    }));
    
    const toggleTab = (index: number)=>{
        translateX.value = withTiming(width/5 * index ,{duration:200});
        setOpenedIndex(index)
    }

    return(
        <View 
            style={[headingView,{
                backgroundColor:tab.backgroundColor,
                borderColor:indicatorView.backgroundColor,
            }]} 
            onLayout={(e)=>{setWidth(e.nativeEvent.layout.width)}}
        >
            <Animated.View style={[{
                width:`${100/5}%`},
                indicatorView,animatedStyles
                ]} 
            />
            {headings.map((heading,index)=>(
                <Pressable 
                    style={[{width:`${100/5}%`},eachHeadingView]}
                    key={heading}
                    onPress={()=>{toggleTab(index)}}
                    >
                    <Text 
                        numberOfLines={1} 
                        selectable={false} 
                        style={[headingText,{color:tab.color}]}>
                            {heading}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}
function TabContents(props: TabContentsProps){
    const {contents,openedIndex,variant,height} = props;
    const {styles:{tab}} = useStyles(styleSheet,{
        variant: variant
    });

    const {animateIntro,animateOutro,animatedStyles} = GenerateFadeAnimation({animationDuration:200});

    React.useEffect(()=>{
        animateOutro();
        setTimeout(()=>{
            animateIntro();
        },50)
    },[openedIndex])
    return(
        <View style={[{
            padding:5,
            backgroundColor:tab.backgroundColor,
            height
        }]}>
            {contents.map((content,index)=>(
                <Animated.View 
                    key={Math.random()*9999} 
                    style={[
                        animatedStyles,
                        {display:openedIndex===index? 'flex':'none'}
                    ]}>
                        {typeof content === 'string' ? 
                            <Text style={{color:tab.color}}>{content}</Text> :
                            content
                        }
                </Animated.View>
            ))}
        </View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    tab:{
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color.white,
                    color: theme.color.black
                },
                black:{
                    backgroundColor: theme.color.black,
                    color: theme.color.white
                },
            }
        },
    },
    indicatorView:{
        position: 'absolute',
        left: 0,
        top: 0,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius:4,
        height:'100%',
        variants:{
            variant:{
                white:{
                    backgroundColor: theme.color.lightGray
                },
                black:{
                    backgroundColor: theme.color.darkGray
                }
            }
        }
    },
    eachHeadingView:{
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius:4,
        fontSize: 18,
    },
    headingView:{
        flexDirection:'row',
        borderBottomWidth:1,
    },
    headingText:{
        textAlign:'center',
        fontSize:18
    }
}))