# unistyles_component
UI components for react native built on unistyles stylesheet. 
Unistyles is an awesome stylesheet for react native!

## Default values
- Types are defined in index.d.ts file. They are exposed directly in ./lib. 
- Default values for variants, colors, fonts can be seen in default.d.ts file. 
- unistyles.ts is a registry for unistyles
- Default values directory contain default colors, breakpoints, themes.
- You can read more about them on https://unistyle-ui-kit.vercel.app/getting_started/file_structure

## Style variants
1. primary
2. secondary
3. tertiary
4. success
5. warning
6. error
7. black
8. white ( black and white values will be changed according to theme, just use white most of the time )
- Default light and dark themes can be seen in default_values/default_themes.ts file.
- Extension of the themes can be seen on unistyles docs.

## Screen sizes ( Breakpoints ) 
1. xs
2. vs
3. sm
4. md
5. lg
6. vlg
5. xl
6. XXL
7. tv

## Colors 
- Colors can be imported from unistyles.ts file ( which is imported from default_values/default_colors.ts )
- All the colors are inspired from tailwind.

## Sizes
- Font sizes and (~tailwind) sizes can also be imported from unistyles.ts file ( which is imported from default_values/default_sizes.ts )
  
## UI Elements ( Most of them are inspired from remix, shadcn )
### Accordion
JSX Element - add data and headings props, there are two types of accordion ( chevron arrows and plus, minus )

### Badge
Non interactive elements with the style of button

### Button 
- built from Pressable, View and Text

### Calendar(DatePicker)
A calendar for date picking, can set a callback function for getting the selected date.

### Checkbox 
A checkbox component which can have a callback function when the value is updated.

### Dialog
Or Dialog you would call. Created with View component ( not built on rn modal ), there are different animation styles, can also enable backdrop press close the modal

### Drawer
This is an other form of Modal which is attached to one side of the screen(all sides available). Can be dragged to dismiss. 

### Input 
- built on TextInput from rn

### Link 
- link btn component with a slight lightened color when hovered

### Select
A dropdown component , all variants available built on Button

### Switch
On/Off switch component, can set a callback function when the value is updated

### Toast
Toast is an alert box. useToast() must be called in your app.tsx, which will return two things ( Toast: function to display toast messages , ToastProviderComponent: which must be called inside your app.tsx ) 

### Text 
- modified text with support for colors from tailwind, themes colors, boldness etc

### Toggle
A toggle component built on Button ( from this library ), it is only supported for one character yet, 
can extend it!

### Tab
A tab component.

## Dependency 
1. Unistyles ( unistyles isn't supported in Expo Go ) 
2. Color library
3. React native reanimated
4. React native gesture handler

