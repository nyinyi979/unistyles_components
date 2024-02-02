import { View } from 'react-native';
import React from 'react';
import Menu from './lib/ui/Slide_menus';
import Button from './lib/basic/button';
import DatePicker from './lib/ui/calendar';
import Input from './lib/basic/input';
import Accordion from './lib/ui/accordion';
import Badge from './lib/ui/badge';
export default function App() {
  const [vis, setVis] = React.useState(false)
  return (
    <View style={{flex:1}}>
      <DatePicker initDate={{month:8,year:2024}}/>
      <Button title='CLick' onPress={()=>{setVis(!vis)}}/>
      <Input placeholder='HELLO' variant='white' breakpoints={{xl:{borderWidth:3,paddingHorizontal:5,paddingVertical:5,width:150}}}/>
      <Input placeholder='HELLO' variant='secondary' />
      <Badge title='HELLO' variant='black' rounded={false} size='lg'/>
      <Menu direction='left' visible={vis} setVisible={setVis} widthOrHeight={200}/>
      <Accordion data={['gg','gg']} headings={['ok','ok']} type='plus'/>
    </View>
  );
};


