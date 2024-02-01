import { View } from 'react-native';
import React from 'react';
import Menu from './lib/ui/Slide_menus';
import Button from './lib/basic/button';
import DatePicker from './lib/ui/calendar';
export default function App() {
  const [vis, setVis] = React.useState(false)
  return (
    <View style={{flex:1}}>
      <DatePicker initDate={{month:8,year:2024}}/>
      <Button title='CLick' onPress={()=>{setVis(!vis)}}/>
      <Menu direction='left' visible={vis} setVisible={setVis} widthOrHeight={200}/>
    </View>
  );
};


