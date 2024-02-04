import { View } from 'react-native';
import React from 'react';
import Menu from './lib/ui/Slide_menus';
import Button from './lib/basic/button';
import DatePicker from './lib/ui/calendar';
import Input from './lib/basic/input';
import Accordion from './lib/ui/accordion';
import Badge from './lib/ui/badge';
import LinkBtn from './lib/basic/link';
import Dropdown from './lib/ui/dropdown';
export default function App() {
  const [vis, setVis] = React.useState(false)
  return (
    <View style={{flex:1}}>
      <DatePicker initDate={{month:8,year:2024}}/>
      <Button title='CLick' onPress={()=>{setVis(!vis)}} active={vis}/>
      <Input placeholder='HELLO' variant='white' breakpoints={{xl:{borderWidth:3,paddingHorizontal:5,paddingVertical:5,width:150}}}/>
      <Input placeholder='HELLO' variant='secondary' />
      <Badge title='HELLO' variant='black' rounded={false} size='lg'/>
      <Accordion data={['gg','gg']} headings={['ok','ok']} type='plus' headingFontSize='2xl' dataFontSize='xl'/>
      <Dropdown onChange={(data)=>{console.log(data.data)}} variant='black' data={[{data:'Something1',label:'SOMEWHATOVERFLOWING'},{data:'Something2',label:'SOMEWHAT'},{data:'Something3',label:'SOMEWHAT'},{data:'Something4',label:'SOMEWHAT'},]} width={150} height={50}/>
    </View>
  );
};


