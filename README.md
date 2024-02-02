# unistyles_components
Built in UI components for react native built on unistyles. 
Types are defined in index.d.ts file.
## Style variants
1. primary
2. secondary
3. tertiary
4. success
5. warning
6. error
7. black
8. white

## Screen sizes
1. xs
2. vs
3. sm
4. md
5. lg
6. vlg
5. xl
6. XXL
7. tv

   
## Accordion
JSX Element - add data and headings props, there are two types of accordion ( chevron arrows and plus, minus ) 

## Badge
Non interactive elements with the style of button

## Button
Button element, available in all variant( with an additional outlined ) and sizes. Have used Color library to generate darker color for hover and clicked effect. 

## Date picker
A calendar for date picking, can set a callback function for getting the selected date.

## Modal
Or Dialog you would call. Created with View component ( not built on rn modal ), there are different animation styles, and a footer( must pass to close the dialog )
Can also enable backdrop press close the modal

## Menu
This is an other form of Modal which is attached to one side of the screen. Can be dragged to dismiss. ( drag to fullscreen is still in development )

## Toast
Toast is an alert box. useToast() must be called in your app.tsx, which will return two things ( Toast: function to display toast messages , ToastProviderComponent: which must be called inside your app.tsx ) 
