# unistyles_components
It is UI component for react native built on unistyles. 

##Style variants
1. primary
2. secondary
3. tertiary
4. success
5. warning
6. error

##Sizes
1. xs
2. sm
3. md
4. lg
5. xl
6. 2xl
   
##Accordion
JSX Element - add data and headings props, there are two types of accordion ( chevron arrows and plus, minus ) 

##Button
Button element, available in all variant( with an additional outlined ) and sizes. Have used Color library to generate darker color for hover and clicked effect. 

##Modal
Or Dialog you would call. Created with View component ( not built on rn modal ), there are different animation styles, and a footer( must pass to close the dialog )
Can also enable backdrop press close the modal

##DragToDimiss
This is an other form of Modal which is attached to one side of the screen. Can be dragged to dismiss. ( drag to fullscreen is still in development ) 

##Toast
Toast is an alert box. useToast() must be called in your app.tsx, which will return two things ( Toast: function to display toast messages , ToastProviderComponent: which must be called inside your app.tsx ) 
