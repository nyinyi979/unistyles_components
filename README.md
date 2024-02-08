# unistyles_component
UI components for react native built on unistyles stylesheet. 
Unistyles is an awesome stylesheet for react native! ( All the features and built on C++, very performant )
Types are defined in index.d.ts file.
Breakpoint styles are defined in breakpoints.d.ts file.
Default values for variants, colors, fonts can be seen in default.d.ts file. 

## Style variants
1. primary
2. secondary
3. tertiary
4. success
5. warning
6. error
7. black
8. white ( black and white values will be changed according to theme )
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
- The default breakpoints are created to support almost all of the screens.
- They are all defined in default_values/default_breakpoints.ts
- And if you enable the enableExperimentalMobileFirstStyle variable, the supported elements will carry small breakpoint styles to larger breakpoints ( just like in web, i suggest you to turn on that, breakpoints features will come to more components later! )

## Colors 
- Colors can be imported from unistyles.ts file ( which is imported from default_values/default_colors.ts )
- All the colors are inspired from tailwind.

## Sizes
- Font sizes and (~tailwind) sizes can also be imported from unistyles.ts file ( which is imported from default_values/default_sizes.ts )
  
## Basic Elements
### Button - built from Pressable, View and Text
### Input - built on TextInput from rn
### Typography - modified text with support for colors and themes
### link - link btn component with a slight lightened color when hovered

## Additional UI Elements ( Most of them are inspired from remix, shadcn )
### Accordion
JSX Element - add data and headings props, there are two types of accordion ( chevron arrows and plus, minus )

### Badge
Non interactive elements with the style of button

### Date picker
A calendar for date picking, can set a callback function for getting the selected date.

### Checkbox 
A checkbox component which can have a callback function when the value is updated.

### Dropdown
A dropdown component (an arrow is still needed:)) , all variants available built on Button

### Modal
Or Dialog you would call. Created with View component ( not built on rn modal ), there are different animation styles, and a footer( must pass to close the dialog )
Can also enable backdrop press close the modal

### Menu
This is an other form of Modal which is attached to one side of the screen. Can be dragged to dismiss. ( drag to fullscreen is still in development )

### Switch
On/Off switch component, can set a callback function when the value is updated

### Toast
Toast is an alert box. useToast() must be called in your app.tsx, which will return two things ( Toast: function to display toast messages , ToastProviderComponent: which must be called inside your app.tsx ) 

### Toggle
A toggle component built on Button ( from this library ), it is only supported for one character yet, 
can extend it!

### Tab
A tab component.

## Dependency 
1. Unistyles ( so please test them with anything but Expo Go app, unistyles isn't supported in Expo Go ) 
2. Color library
3. React native reanimated

