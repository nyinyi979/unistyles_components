import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { TabContentsProps, TabHeadingsProps, TabProps } from "..";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { GenerateFadeAnimation } from "../utils/slide_animation";
import Color from "color";

/**
 * 
 * @param Tab
 * - contents - ReactNode (please optimize it for themes if you are providing others but string) 
 * - headings - array of string
 * - defaultOpenedIndex - number 
 * - variant - primary, secondary, tertiary, success, warning, error, ghost
 * - height - height of the contents
 * @returns Tab react node
 */
export default function Tab(props: TabProps){
    const {contents,headings,defaultOpenedIndex=0,variant='ghost',width='100%',height} = props;
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

    const {styles:{bg,headingView,indicatorView,eachHeadingView,headingText,textStyle}} = useStyles(styleSheet,{
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
            style={[headingView,bg]} 
            onLayout={(e)=>{setWidth(e.nativeEvent.layout.width)}}
        >
            <Animated.View style={[{
                width:`${100/5}%`,
                backgroundColor: Color(bg.backgroundColor).darken(.3).toString()
            },
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
                        style={[headingText,textStyle]}>
                            {heading}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}
function TabContents(props: TabContentsProps){
    const {contents,openedIndex,variant,height} = props;
    const {styles:{bg,textStyle}} = useStyles(styleSheet,{
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
        <View style={[bg,{
            height,
        }]}>
            {contents.map((content,index)=>(
                <Animated.View 
                    key={Math.random()*9999} 
                    style={[
                        animatedStyles,
                        {display:openedIndex===index? 'flex':'none'}
                    ]}>
                        {typeof content === 'string' ? 
                            <Text style={textStyle}>{content}</Text> :
                            content
                        }
                </Animated.View>
            ))}
        </View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    bg:{
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color.primary,
                },
                secondary:{
                    backgroundColor: theme.color.secondary,
                },
                tertiary:{
                    backgroundColor: theme.color.tertiary,
                },
                success:{
                    backgroundColor: theme.color.success,
                },
                warning: {
                    backgroundColor: theme.color.warning,
                },
                error: {
                    backgroundColor: theme.color.error,
                },
                ghost:{
                    backgroundColor: theme.color.white,
                },
            },
        }
    },
    border:{
        borderWidth: 1,
        variants:{
            variant:{
                primary:{
                    borderColor: theme.color.primaryForeground,
                },
                secondary:{
                    borderColor: theme.color.secondaryForeground,
                },
                tertiary:{
                    borderColor: theme.color.tertiaryForeground,
                },
                success:{
                    borderColor: theme.color.successForeground,
                },
                warning: {
                    borderColor: theme.color.warningForeground,
                },
                error: {
                    borderColor: theme.color.errorForeground,
                },
                ghost:{
                    borderColor: theme.color.black,
                },
            },
        }
    },
    textStyle:{
        variants:{
            variant:{
                primary:{
                    color: theme.color.primaryForeground,
                },
                secondary:{
                    color: theme.color.secondaryForeground,
                },
                tertiary:{
                    color: theme.color.tertiaryForeground,
                },
                success:{
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
                },
            },
        }
    },
    indicatorView:{
        position: 'absolute',
        left: 0,
        top: 0,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius:4,
        height:'100%',
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