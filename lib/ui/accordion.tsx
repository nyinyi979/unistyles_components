import React from "react";
import { Pressable, Text, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { ChevronArrow, PlusMinus } from "../utils/svg_comp";
import { AccordionElementProps, AccordionProps } from "../";
import { FontSize } from "../unistyles";
import { GenerateSlideBottomAnimation } from "../utils/slide_animation";

/**
 * 
 * @param  Props that must/could be passed more than ViewProps
    - data: array of data to be rendered,
    - headings: array of heading for the data,
    - type?: 'plus', 'arrow', 'none' , right side icon of each accordion element,
    - allowOpeningMoreThanTwo: if you want the user to open more than one element, then enable this: boolean,
 *  - defaultOpenedIndex?: array of indexes to be opened (can be more than one, start from 1)

    Want to adjust more than that? Go inside the file and adjust them:)
 * @returns JSX Element Accordion 
 */
function Accordion(props: AccordionProps){
    const {data,allowOpeningMoreThanTwo=false,defaultOpenedIndex=[0],headings,type="plus"} = props;
    const [opened, setOpened] = React.useState<Set<number>>(new Set([...defaultOpenedIndex]));

    return(
          <View style={{flex:1, marginTop:20}}>
              {data.map((dataString, index)=>(
                  <AccordionElement
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
    const {open, setOpen, data, selectedIndex, heading, rightElementType, allowOpeningMoreThanTwo } = props;

    // boolean value of the index found or not in the set
    const foundOrNot = open.has(selectedIndex);
    const {styles} = useStyles(styleSheet);

    const {animateIntro,animateOutro,animatedStyles} = GenerateSlideBottomAnimation({
        animationDuration: 100,
        oneDirectionalAnimation: false,
        animateOpacity: true,
        translateY: 50
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
                setOpen(afterDeletion);
            }
            else {
                animateIntro();
                setOpen(new Set([...open,selectedIndex]));
            }
        }
        else {
            if(foundOrNot) {
                const afterDeletion = new Set([0]);
                setOpen(afterDeletion);
            }
            else {
                animateIntro();
                setOpen(new Set([selectedIndex]));
            }
        }
    }
    return(
        <View style={styles.View}>

            <Pressable onPress={handleTaps}>

                <View style={{height:20}}>
                    <Text style={styles.headingStyle}>{selectedIndex}. {heading}</Text>
                    <View style={{alignSelf:'flex-end',marginTop:-20,marginRight:20}}>
                        {rightElementType==="none"? '' :
                        rightElementType==="arrow"? 
                        <ChevronArrow activated={foundOrNot} color={styles.headingStyle.color}/> :
                        <PlusMinus activated={foundOrNot} color={styles.headingStyle.color}/>
                        } 
                    </View>
                </View>
                
                <Animated.View style={animatedStyles}>
                   <Text style={styles.font}>{foundOrNot? data: ''}</Text>
                </Animated.View>
                
            </Pressable>

        </View>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    // View style
    View: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: theme.color['white']
    },
    // text displayed in accordion box
    font:{
        marginTop: 4,
        textAlign: 'justify',
        fontSize: FontSize['md'],
        padding: 4,
        backgroundColor: theme.color['white']
    },
    // modify this for your heading style, 
    //icon color is the same as color here!
    headingStyle: {
        color: theme.color['black'],
        textDecorationColor: theme.color['black'],
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        fontSize: FontSize['lg'],
        textAlign: 'left',
    }
}))

export default Accordion 