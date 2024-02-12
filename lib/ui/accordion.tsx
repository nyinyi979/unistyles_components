import React from "react";
import Animated from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ChevronArrow, PlusMinus } from "../utils/svg_comp";
import { AccordionElementProps, AccordionProps } from "../";
import { FontSizes } from "../unistyles";
import { GenerateSlideTopAnimation } from "../utils/slide_animation";

/**
 * 
 * @param  Accordion
 * - data, headings - array of string to be rendered
 * - allowOpeningMoreThanTwo - will allow the user to open more than one accordion
 * - defaultOpenedIndex - starting from 1
 * - type - plus, arrow, none
 * - headingFontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl (default - lg)
 * - dataFontSize - xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl (default - md)
 * @returns Accordion react node
 */
function Accordion(props: AccordionProps){
    const {
        data,headings,
        allowOpeningMoreThanTwo=true,
        defaultOpenedIndex=[0],
        type="plus",
        headingFontSize='lg',
        dataFontSize='md'
    } = props;
    const [opened, setOpened] = React.useState<Set<number>>(new Set([...defaultOpenedIndex]));

    return(
          <View>
                {data.map((dataString, index)=>(
                    <AccordionElement
                        headingFontSize={headingFontSize}
                        dataFontSize={dataFontSize}
                        key={index}
                        selectedIndex={index+1}
                        open={opened} 
                        heading={headings[index]}
                        data={dataString} 
                        setOpen={setOpened} 
                        allowOpeningMoreThanTwo={allowOpeningMoreThanTwo}
                        rightElementType={type}
                    />
                ))}
          </View>
    )
}
function AccordionElement(props: AccordionElementProps){
    const {
        open, setOpen, data, selectedIndex, 
        heading, rightElementType, allowOpeningMoreThanTwo, 
        dataFontSize, headingFontSize 
    } = props;

    // boolean value of the index found or not in the set
    const foundOrNot = open.has(selectedIndex);
    const {styles} = useStyles(styleSheet);

    const {animateIntro,animateOutro,animatedStyles} = GenerateSlideTopAnimation({
        animationDuration: 100,
        oneDirectionalAnimation: true,
        animateOpacity: true,
        translateY: 10
    })
    
    // this is for when default index is supplied
    React.useEffect(()=>{
        if(foundOrNot) {
            animateIntro();
        }
        else {
            animateOutro();
        }
    },[])

    const handleTaps = () =>{
        const foundOrNot = open.has(selectedIndex);
        if(allowOpeningMoreThanTwo){
            if(foundOrNot) {
                animateOutro();
                const afterDeletion = new Set([...open]);
                afterDeletion.delete(selectedIndex);
                // putting a delay for animation
                setTimeout(()=>{
                    setOpen(afterDeletion);
                },50)
            }
            else {
                animateIntro();
                setOpen(new Set([...open,selectedIndex]));
            }
        }
        else {
            if(foundOrNot) {
                const afterDeletion = new Set([0]);
                animateOutro();
                // putting a delay for animation
                setTimeout(()=>{
                    setOpen(afterDeletion);
                },50)
            }
            else {
                animateIntro();
                setOpen(new Set([selectedIndex]));
            }
        }
    }
    return(
        <View style={styles.parnetView}>

            <Pressable onPress={handleTaps}>

                <View style={styles.headingView}>

                    <Text style={[
                        styles.headingText,
                        {fontSize:FontSizes[headingFontSize]}
                        ]}>
                            {selectedIndex}. {heading}
                    </Text>

                    <View style={styles.actionView}>
                        {
                            rightElementType==="none"? <Text /> :
                            rightElementType==="arrow"? 
                            <ChevronArrow activated={foundOrNot} color={styles.headingText.color}/> :
                            <PlusMinus activated={foundOrNot} color={styles.headingText.color}/>
                        } 
                    </View>
                </View>
                
                <Animated.View style={animatedStyles}>
                   <Text style={[
                    styles.font,{fontSize:FontSizes[dataFontSize]}
                    ]}>
                        {foundOrNot? data: ''}
                    </Text>
                </Animated.View>
                
            </Pressable>

        </View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    // View style
    parnetView: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: theme.color['white']
    },
    // text displayed in accordion box
    font:{
        marginTop: 4,
        textAlign: 'justify',
        padding: 4,
        backgroundColor: theme.color['white']
    },
    // modify this for your heading style, 
    //icon color is the same as color here!
    headingText: {
        color: theme.color['black'],
        textDecorationColor: theme.color['black'],
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textAlign: 'left',
    },
    headingView: {
        minHeight:40,
        paddingVertical:10
    },
    actionView:{
        alignSelf:'flex-end',
        marginTop:-25,
        marginRight:20
    }
}))

export default Accordion 