import React from "react";
import Animated from "react-native-reanimated";
import Button from "../basic/button";
import Color from "color";
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
 * - hidesAfterNoInteraction - time in ms to hide the modal if it is not pressed ( button press will still dimiss it)
 * - closeBtn - string of the close button, optional ( will hides the button if there is no text )
 * - bottom - boolean, animating bottom bar
 * @returns an object containing Toast - a function to display toast message , ToastContextProvider react node
 * which should be initialized in the main component
 */
export default function useToast(props: toastContext){
	const {
        animationType="slideFromBottom",
        hidesAfterNoInteraction=5000,
        closeBtn="",
        closeBtnSize="sm",
        bottomBar=true,
    } = props;

    const [variant , setVariant] = React.useState<variant>(props.variant);
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
        },hidesAfterNoInteraction)
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
                styles.toastContainer,
                {display: visible? 'flex':'none'}
            ]}>
                <ToastBox
                    message={toast}
                    variant={variant}
                    animatedStyles={animatedStyles}
                    closeToast={closeToast}
                    openToast={openToast}
                    closeBtn={closeBtn}
                    closeBtnSize={closeBtnSize}
                    duration={hidesAfterNoInteraction}
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

    const {styles:{toast,basicToast,toastMessageContainer,toastText}} = useStyles(styleSheet,{
        variant: variant
    });
    
    return(
        <Animated.View style={[
                basicToast,
                animatedStyles,
                {backgroundColor:toast.backgroundColor}
            ]}>
          	<View style={toastMessageContainer}>

          		<Text style={[
                    toastText,
                    {color:toast.color}
                ]}>{message}</Text>
                
          		{closeBtn===''? <Text>''</Text>:
                    <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                        <Button size={closeBtnSize} title={closeBtn} onPress={closeToast} variant={variant}/>
                    </View>
                }
          	</View>
            {bottomBar? 
                <BottomBar foreground={toast.color} duration={duration} reversed /> : 
            ''}
        </Animated.View>
    )
}


const styleSheet = createStyleSheet((theme=>({
    toast:{
        variants:{
            variant:{
                primary:{
                    backgroundColor: theme.color['primary'],
                    color: Color(theme.color['primary']).darken(.6).toString()
                },
                secondary:{
                    backgroundColor: theme.color['secondary'],
                    color: Color(theme.color['secondary']).darken(.6).toString()
                },
                tertiary:{
                    backgroundColor: theme.color['tertiary'],
                    color: Color(theme.color['tertiary']).darken(.6).toString()
                },
                success:{
                    backgroundColor: theme.color['success'],
                    color: Color(theme.color['success']).darken(.6).toString()
                },
                warning:{
                    backgroundColor: theme.color['warning'],
                    color: 'black'
                },
                error:{
                    backgroundColor: theme.color['error'],
                    color: 'white'
                },
                black:{
                    backgroundColor: theme.color['black'],
                    color: theme.color['white']
                },
                white:{
                    backgroundColor: theme.color['white'],
                    color: theme.color['black']
                }
            }
        }
    },
    toastContainer:{
        flex: 1,
        width: '95%',
        height: 70,
        bottom: 20,
        left: '2.5%',
        position: 'absolute',
        zIndex:5
    },
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

