import React from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Button from "./button";
import { GenerateSlideBottomAnimation, GenerateSlideLeftAnimation, 
    GenerateSlideRightAnimation, GenerateSlideTopAnimation } from "../utils/slide_animation";
import Animated from "react-native-reanimated";
import { ToastMethod, ToastProps, toastContext } from "../..";

/**
 * 
 * @param 
 * - animationType: four types of animation available 
 * - hidesAfterNoInteraction: time in ms to hide the modal if it is not pressed ( button press will still dimiss it)
 * - closeBtn string
 * @returns 
 */
export default function useToastContextProvider(props: toastContext){
	const {
        animationType="slideFromBottom",
        hidesAfterNoInteraction=5000,
        closeBtn="DONE",
    } = props;

    const [visible, setVisible] = React.useState(false);
    const {styles} = useStyles(styleSheet);

    const [toast, setToast] = React.useState('');

    const animation = React.useRef(
        GenerateAnimationForToast(animationType)
    );
    const {animateIntro,animateOutro,animatedStyles} = animation.current;
	const closeToast = () =>{
		animateOutro();
		setTimeout(()=>{
            setVisible(false);
		},200)
	}
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
                        variant="primary"
                        animatedStyles={animatedStyles}
                        closeToast={closeToast}
                        openToast={openToast}
                        closeBtn={closeBtn}
                    />
            </View>
        ),
        Toast: Toast
    }
}

export function ToastBox(props: ToastProps){
    const {styles} = useStyles(styleSheet);
    const {
      	message, 
		variant='primary', 
        animatedStyles,
        closeToast,
        closeBtn
	} = props;


    return(
        <Animated.View 
			style={[styles.basicToast,animatedStyles]} 
			>
          	<View style={styles.eachToastContainer}>
          		<Text style={styles.toastTextColor}>{message}</Text>
          		<View style={{alignItems:'flex-end'}}>
              		<Button title={closeBtn} onPress={closeToast}/>
          		</View>
          	</View>
        </Animated.View>
    )
}

function GenerateAnimationForToast(animationType:'slideFromTop'|'slideFromRight'|'slideFromBottom'|'slideFromLeft'){
    const props = {
        animationDuration: 200,
        oneDirectionalAnimation: true,
        translate: 50,
        animateOpacity: true
    }
    switch(animationType){
        case 'slideFromTop':
            return GenerateSlideTopAnimation(props);
        case 'slideFromRight':
            return GenerateSlideRightAnimation(props);
        case 'slideFromBottom':
            return GenerateSlideBottomAnimation(props);
        case 'slideFromLeft':
            return GenerateSlideLeftAnimation(props);
    }
}


const styleSheet = createStyleSheet((theme=>({
    toastContainer:{
        flex: 1,
        width: '95%',
        height: 70,
        bottom: 20,
        left: '2.5%',
        position: 'absolute',
        zIndex:10
    },
    eachToastContainer:{
        flex:1,
        flexDirection:'row',
        marginVertical:'auto',
        justifyContent:'center'
    },
    basicToast:{
        width: '100%',
        height: 50,
        backgroundColor: theme.color['black'],
        padding: 10
    },
    toastTextColor:{
        textAlignVertical:'center',
        alignSelf:'flex-start',
        marginTop:5,
        marginRight:'auto',
        color:theme.color['white']
    },
    pressable:{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%'
    }
})))

