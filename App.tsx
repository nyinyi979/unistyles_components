import { Text, View } from 'react-native';
import React from 'react';
import Button from './lib/ui/button';
import { variant } from './lib/default';
import Input from './lib/ui/input';
import LinkBtn from './lib/ui/link';
import P from './lib/ui/text';
import Badge from './lib/ui/badge';
import CheckBox from './lib/ui/checkbox';
import useToast from './lib/ui/toast';
import DatePicker from './lib/ui/calendar';
import Drawer from './lib/ui/drawer';
import Dialog from './lib/ui/dialog';
import Switch from './lib/ui/switch';
import Tab from './lib/ui/tabs';
import Toggle from './lib/ui/toggle';
import Select from './lib/ui/select';
import Skeleton from './lib/ui/skeleton';
export default function App() {
    const variants:variant[] = ['primary','secondary','tertiary','black','white','success','warning','error'];
    const {Toast,ToastContextProvider} = useToast({
        animationType:'slideFromBottom',
        closeBtn:'Close',
        closeBtnSize:'lg'
    })
    const toastfn = () =>{
        Toast({
            message: "HELLO",
            variant: 'black'
        })
    }
    const [selectedIndex,  setSelectedIndex] = React.useState(0);
    const [visible,setVisible] = React.useState(false);
    const [visible2,setVisible2] = React.useState(false);
    return (
        <View style={{flex:1}}>
            <Skeleton backgroundColor={'red'} style={{width:200,height:200,flex:1,borderRadius:5}}/>
            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant,index)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <Button key={variant} title={`Open ${index%2==0? 'Slide Menu': 'Modal'}`} variant={variant} 
                    onPress={()=>{index%2==0? setVisible(!visible) : setVisible2(!visible)}}/>
                </View>
            ))}
            </View>

            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <Input key={variant} placeholder='Hello world' variant={variant} width={150}/>
                </View>
            ))}
            </View>

            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <LinkBtn key={variant} title='Hello world' variant={variant} />
                </View>
            ))}
            </View>
            
            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <P key={variant} children='Hello world' variant={variant} fontSize='2xl' color='gray' tint={200}/>
                </View>
            ))}
            </View>

            <Tab height={50} variant='white' headings={["Hello","World","Good","Evening"]} 
                contents={["Hello world",'Hello world','Hello world','Hello world']}/>

            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap',zIndex:10}}>
            {variants.map((variant)=>(
                <Select key={Math.random()*9999}
                    data={[{data:'Data 1',label: 'Option 1'},{data:'Data 2',label: 'Option 2'},{data:'Data 3',label: 'Option 3'}]} 
                    width={150} 
                    height={50}
                    variant={variant}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    size='sm'
                    placeholder='Please select something'
                    onChange={(data)=>{console.log(data.data)}}
                    />
            ))}
            </View>

            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <Badge key={variant} title='Hello world' variant={variant} size='md' rounded={false}/>
                </View>
            ))}
            </View>

            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <Toggle key={variant} description='I' variant={variant} onToggle={(t)=>{console.log(t)}}/>
                </View>
            ))}
            </View>
            
            <View style={{flexDirection:'row',alignContent:'space-between',flexWrap:'wrap'}}>
            {variants.map((variant)=>(
                <View key={Math.random()*9999} style={{margin:2}}>
                    <CheckBox onChange={(c)=>{console.log(c)}} description={<Text selectable={false}>This is a checkbox!</Text>} key={variant} variant={variant} defaultChecked />
                </View>
            ))}
            </View>
            {/* TOAST CONTEXT PROVIDER IS TRIGGERING SOME PROBLEM :) , see console for more details */}
            <ToastContextProvider />
            <DatePicker numberOfLetters={2}/>

            <Drawer direction='bottom' setVisible={setVisible} visible={visible} widthOrHeight={200} backdropPressHidesMenu />
            <Dialog setVisible={setVisible2} visible={visible2} variant='white' backdropPressHidesModal footer={{title:'Close'}}>
                <View><P color='cyan' tint={950}>HELLO WORLD</P></View>
            </Dialog>
            <View style={{marginLeft:20,flex:1}}><Switch description="HELLO WORLD" variant='white'/></View>
        </View>
  );
};