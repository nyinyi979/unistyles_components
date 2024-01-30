import Button from './lib/ui/button';
import Typography from './lib/basic/text';
import { View } from 'react-native';
import useToast from './lib/ui/toast';
import React from 'react';
import Div from './lib/basic/div';
import { Colors } from './lib/unistyles';
export default function App() {
  const {Toast,ToastContextProvider} = useToast({
    animationType:'scale',
    bottomBar: true,
    closeBtn: 'DONE',
    hidesAfterNoInteraction:10000,
    variant: 'black'
  });
  React.useEffect(()=>{
    Toast({
      message: 'HELLO',
      variant: 'success',
    })
  },[])
  const [visible , setVisible] = React.useState(false);
  return (
    <View style={{flex:1}}>
      <Typography 
        fontSize='sm' 
        color={'black'} 
        tint={500} 
        fontWeight='700' 
        textAlign='right'
        breakpoints={{
          md:{
            fontSize:'4xl',
            fontWeight:'800',
            textAlign:'right'
          }
        }}
        >Show Dialog</Typography>
      <Button 
        title='HELLO' 
        block={false} 
        variant='primary' 
        outlined 
        size='sm' 
        onPress={()=>{
          setVisible(!visible)
        }}
        breakpoints={{
          md:{
            size:'lg'
          }
        }}
      />
      <ToastContextProvider />
        <Div 
          breakpoints={{
            sm:{
              width: 500,
              height: 500,
              backgroundColor: Colors.amber['500']
            }
          }}
        >

        </Div>
    </View>
  );
};


