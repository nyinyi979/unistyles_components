import React from "react";
import Animated from "react-native-reanimated";
import Button from "./button";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { GenerateAnimation } from "../utils/slide_animation";
import { ToastMethod, ToastProps, toastContext } from "../";
import { BottomBar } from "../utils/svg_comp";
import { variant } from "../default";

/**
 * 
 * @param 
 * - animationType - four types of animation available 
 * - hidesAfter - duation for the toast to disappear
 * - closeBtn - string of the close button, optional ( will hides the button if there is no text )
 * - bottom - boolean, animating bottom bar
 * @returns an object containing Toast - a function to display toast message , ToastContextProvider react node
 * which should be initialized in the main component
 */
export default function useToast(props: toastContext){
	const {
        animationType="slideFromBottom",
        hidesAfter=5000,
        closeBtn="",
        closeBtnSize="md",
        bottomBar=true,
    } = props;

    const [variant , setVariant] = React.useState<variant>(props.variant&&props.variant||'ghost');
    const [visible, setVisible] = React.useState(false);
    const {styles} = useStyles(styleSheet);

    // setting toast message when passed from toast function
    const [toast, setToast] = React.useState('');

    const animation = React.useRef(
        GenerateAnimation({
            animationDuration: 200,
            animationType: animationType,
            oneDirectionalAnimation: true,
        })
    );
    const {animateIntro,animateOutro,animatedStyles} = animation.current;

    // close toast animation for button onclick
	const closeToast = () =>{
		animateOutro();
		setTimeout(()=>{
            setVisible(false);
		},200)
	}
    // open toast animation and setting timer
    const openToast = () =>{
        setVisible(true);
        animateIntro();
        setTimeout(()=>{
            closeToast();
            setTimeout(()=>{
                setVisible(false);
            },300)
        },hidesAfter)
    }

    const Toast = (ToastMethod: ToastMethod) =>{
        if(visible) return;

        // setting variant if it was passed from the methods
        ToastMethod.variant&&setVariant(ToastMethod.variant);

        setToast(ToastMethod.message);
        setVisible(true);
    };
    
    React.useEffect(()=>{
        if(visible) openToast();
    },[visible])

    return{
        ToastContextProvider:()=>(
            <View style={[
                styles.toastContainer(visible)
            ]}>
                <ToastBox
                    message={toast}
                    variant={variant}
                    animatedStyles={animatedStyles}
                    closeToast={closeToast}
                    openToast={openToast}
                    closeBtn={closeBtn}
                    closeBtnSize={closeBtnSize}
                    duration={hidesAfter}
                    bottomBar={bottomBar}
                />
            </View>
        ),
        Toast: Toast
    }
}

function ToastBox(props: ToastProps){
    const {
      	message, 
		variant='error', 
        animatedStyles,
        closeToast,
        closeBtn,
        closeBtnSize,
        duration,
        bottomBar
	} = props;

    const {styles:{toast,basicToast,toastMessageContainer,toastText,textStyle}} = useStyles(styleSheet,{
        variant: variant
    });
    
    return(
        <Animated.View style={[
                basicToast,
                animatedStyles,
                toast
            ]}>
          	<View style={toastMessageContainer}>

          		<Text style={[
                    toastText,
                    textStyle
                ]}>{message}</Text>
                
          		{closeBtn===''? <Text>''</Text>:
                    <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                        <Button size={closeBtnSize} title={closeBtn} onPress={closeToast} variant={variant}/>
                    </View>
                }
          	</View>
            {bottomBar? 
                <BottomBar foreground={textStyle.color} duration={duration} reversed /> : 
            ''}
        </Animated.View>
    )
}


const styleSheet = createStyleSheet((theme=>({
    toast:{
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
                warning:{
                    backgroundColor: theme.color.warning,
                },
                error:{
                    backgroundColor: theme.color.error,
                },
                ghost:{
                    backgroundColor: theme.color.white,
                }
            }
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
    toastContainer:(visible: boolean)=>({
        flex: 1,
        display: visible? 'flex' : 'none',
        width: '95%',
        height: 70,
        bottom: 20,
        left: '2.5%',
        position: 'absolute',
        zIndex:5
    }),
    toastMessageContainer:{
        flex:1,
        flexDirection:'row',
        marginVertical:'auto',
        justifyContent:'center'
    },
    basicToast:{
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        padding: 10,
        position: 'relative',
        borderRadius: 5
    },
    toastText:{
        verticalAlign:'middle',
        alignSelf:'flex-start',
        marginTop:5,
        marginRight:'auto',
    },
    pressable:{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%'
    },
})))

