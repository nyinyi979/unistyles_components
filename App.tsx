import Button from './lib/ui/button';
import Typography from './lib/ui/text';
import { Modal, View } from 'react-native';
import useToast from './lib/ui/toast';
import React from 'react';
import Dialog from './lib/ui/modal';
import { Colors } from './unistyles';
import Menu from './lib/ui/Slide_menus';
export default function App() {
  const {Toast,ToastContextProvider} = useToast({
    animationType:'slideFromBottom',
    bottomBar: true,
    closeBtn: 'DONE',
    hidesAfterNoInteraction:100000,
    variant: 'black'
  });
  React.useEffect(()=>{
    Toast({
      message: 'HELLO',
      variant: 'error',
    })
  },[])
  const [visible , setVisible] = React.useState(false);
  const [visible2 , setVisible2] = React.useState(false);
  return (
    <View style={{flex:1}}>
      <Typography size='xs' color={'black'} tint={500} fontWeight='700' textAlign='right'>Show Dialog</Typography>
      <Button title='HELLO' block={false} variant='primary' outlined size='md' onPress={()=>{setVisible(!visible)}}
      />
      <ToastContextProvider />
      <Dialog 
        visible={visible}
        setVisible={setVisible}
        backdrop={{
          color: 'black',
          opacity:.5
        }}
        header="HELLO WORLD"
        animationProperties={{
          animationDuration:200,
          animationType:'slideFromBottom',
          oneDirectionalAnimation:false
        }}
        footer={{
          title:"Cancel",
          variant:'white'
        }}
        background={{
          color: Colors.cyan['500'],
          opacity: 1
        }}
        backdropPressHidesModal
        >
      <Typography>HELLOOOOOOOOOOOOOO</Typography></Dialog>
      <Menu 
        visible={visible2}
        setVisible={setVisible2}
        direction='bottom'
        widthOrHeight={300}
      />
      <Button title='Show Dialog 2' onPress={()=>{setVisible2(!visible2)}}/>
    </View>
  );
};


