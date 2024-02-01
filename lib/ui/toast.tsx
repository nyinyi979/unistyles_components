import React from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Button from "../basic/button";
import { GenerateAnimation } from "../utils/slide_animation";
import Animated from "react-native-reanimated";
import { ToastMethod, ToastProps, toastContext } from "../";
import { BottomBar } from "../utils/svg_comp";
import { Colors } from "../unistyles";
import { variant } from "../default";

/**
 * 
 * @param 
 * - animationType: four types of animation available 
 * - hidesAfterNoInteraction: time in ms to hide the modal if it is not pressed ( button press will still dimiss it)
 * - closeBtn string of the close button, optional ( will hides the button if there is no text )
 * - bottom boolean, animating bottom bar
 * @returns 
 */
export default function useToast(props: toastContext){
	const {
        animationType="slideFromBottom",
        hidesAfterNoInteraction=5000,
        closeBtn="",
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
                        duration={hidesAfterNoInteraction}
                        bottomBar={bottomBar}
                    />
            </View>
        ),
        Toast: Toast
    }
}

function ToastBox(props: ToastProps){
    const {styles} = useStyles(styleSheet);
    const {
      	message, 
		variant='error', 
        animatedStyles,
        closeToast,
        closeBtn,
        duration,
        bottomBar
	} = props;

    let toastVariant = {
        backgroundColor: 'black',
        color: 'white'
    };

    const getStyle = React.useMemo(()=>{
        toastVariant = styles[variant];
    },[variant])
    
    return(
        <Animated.View style={[
                styles.basicToast,
                animatedStyles,
                {backgroundColor:toastVariant.backgroundColor}
            ]}>
          	<View style={styles.toastMessageContainer}>

          		<Text style={[
                    styles.toastText,
                    {color:toastVariant.color}
                ]}>{message}</Text>
          		{closeBtn===''? '':
                    <View style={{alignItems:'flex-end'}}>
                        <Button size="sm" title={closeBtn} onPress={closeToast} variant={'white'}/>
                    </View>
                }
          	</View>
            {bottomBar? 
            <BottomBar foreground={toastVariant.color} duration={duration} reversed /> : ''}
        </Animated.View>
    )
}


const styleSheet = createStyleSheet((theme=>({
    toastContainer:{
        flex: 1,
        width: '95%',
        height: 70,
        bottom: 20,
        left: '2.5%',
        position: 'absolute',
        zIndex:3
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
    'primary':{
        backgroundColor: theme.color['primary'],
        color: Colors.blue['50']
    },
    'secondary':{
        backgroundColor: theme.color['secondary'],
        color: Colors.blue['50']
    },
    'tertiary':{
        backgroundColor: theme.color['tertiary'],
        color: Colors.blue['50']
    },
    'success':{
        backgroundColor: theme.color['success'],
        color: Colors.blue['50']
    },
    'warning':{
        backgroundColor: theme.color['warning'],
        color: Colors.blue['50']
    },
    'error':{
        backgroundColor: theme.color['error'],
        color: Colors.blue['50']
    },
    'black':{
        backgroundColor: theme.color['black'],
        color: theme.color['white']
    },
    'white':{
        backgroundColor: theme.color['white'],
        color: theme.color['black']
    }
})))

