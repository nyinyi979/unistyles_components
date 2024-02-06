import { Text, View } from 'react-native';
import React from 'react';
import Button from './lib/basic/button';
import { variant } from './lib/default';
import Input from './lib/basic/input';
import LinkBtn from './lib/basic/link';
import P from './lib/basic/text';
import Badge from './lib/ui/badge';
import CheckBox from './lib/ui/checkbox';
import useToast from './lib/ui/toast';
import DatePicker from './lib/ui/calendar';
import Dropdown from './lib/ui/dropdown';
import Menu from './lib/ui/slide_menus';
import Dialog from './lib/ui/modal';

export default function App() {
    const variants:variant[] = ['primary','secondary','tertiary','black','white','success','warning','error'];
    const {Toast,ToastContextProvider} = useToast({
        animationType:'fade'
    })
    React.useEffect(()=>{
        Toast({
        message: "HELLO",
        variant: 'primary'
    })
  },[])
  const [visible,setVisible] = React.useState(false);
  const [visible2,setVisible2] = React.useState(false);
  return (
    <View style={{flex:1}}>
        <Text>Button</Text>

        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant,index)=>(
            <View style={{margin:2}}>
            <Button key={variant} title={`Open ${index%2==0? 'Slide Menu': 'Modal'}`} variant={variant} 
            onPress={()=>{index%2==0? setVisible(!visible) : setVisible2(!visible)}}/>
            </View>
        ))}
        </View>

        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant)=>(
            <View style={{margin:2}}>
            <Input key={variant} placeholder='Hello world' variant={variant} width={150}/>
            </View>
        ))}
        </View>

        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant)=>(
            <View style={{margin:2}}>
            <LinkBtn key={variant} title='Hello world' variant={variant} />
            </View>
        ))}
        </View>
        
        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant)=>(
            <View style={{margin:2}}>
            <P key={variant} children='Hello world' variant={variant} fontSize='2xl' color='gray' tint={200}/>
            </View>
        ))}
        </View>
        
        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant)=>(
            <View style={{margin:2}}>
            <Badge key={variant} title='Hello world' variant={variant} size='md' rounded={false}/>
            </View>
        ))}
        </View>

        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
        {variants.map((variant)=>(
            <View style={{margin:2}}>
            <CheckBox description={<Text selectable={false}>This is a checkbox!</Text>} key={variant} variant={variant} defaultChecked />
            </View>
        ))}
        </View>
        {/* TOAST CONTEXT PROVIDER IS TRIGGERING SOME PROBLEM :) , see console for more details */}
        <ToastContextProvider />
        <DatePicker numberOfLetters={2}/>

        <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap',marginBottom:200}}>
        {variants.map((variant)=>(
            <Dropdown 
                data={[{data:'Data 1',label: 'Label'},{data:'Data 1',label: 'Label'},{data:'Data 1',label: 'Label'}]} 
                width={150} 
                height={50}
                variant={variant}
                placeholder='Please select something'
                onChange={(data)=>{console.log(data.data)}}
                />
        ))}
        </View>

        <Menu direction='bottom' setVisible={setVisible} visible={visible} widthOrHeight={200} backdropPressHidesMenu />
        <Dialog setVisible={setVisible2} visible={visible2} variant='black' backdropPressHidesModal>
            <View><P color='cyan' tint={950}>HELLO WORLD</P></View>
            <Button title='HELLO' variant='black'/>
        </Dialog>
    </View>
  );
};


