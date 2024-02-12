import React from "react";
import Button from "../basic/button";
import { Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Colors } from "../unistyles";
import { CalendarHeadingProps, CalendarProps, DateData, DayProp, EachDayProps, MonthProps, Months, EachMonthProps, CurrentMonthProps, YearProps } from "..";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Input from "../basic/input";

const months:Months[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const initDates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const now = new Date();
const _date = now.getDate();
const _month = now.getMonth();
const _year = now.getFullYear();

/**
 * 
 * @param Calendar
 * - numberOfLetters - Sat, Sun or Sa, Su
 * - onValueChange - (date: string)=>void, callback function for when the value is updated
 * - initDate - month and year for initial page render
 * @returns Date Picker react node
 */
function Calendar(props: CalendarProps){
    const {
        numberOfLetters=3,
        onValueChange=()=>{},
        initDate={month:_month,year:_year}
    } = props;
    const [date, setDate] = React.useState<DateData>({
        date: _date,
        month: initDate.month,
        year: initDate.year
    });

    const [views, setViews] = React.useState<'day'|'month'|'year'>('day');
    const openMonthView = () =>{ setViews('month') };
    const openDayView = () =>{ setViews('day') };
    const openYearView = () =>{ setViews('year') };

    const {styles} = useStyles(styleSheet);

    const NextMonth = () =>{
        if(date.month === 11)
            setDate({date: 1, month: 0, year: date.year+1})
        else 
            setDate({date: 1, month: date.month+1, year: date.year})
    };
    const PreviousMonth = () =>{
        if(date.month === 0)
            setDate({date: 1, month: 11, year: date.year-1})
        else 
            setDate({date: 1, month: date.month-1, year: date.year})
    }
    const setMonth = (month: number) =>{
        setDate({...date, month: month});
    }
    const setYear = (year: string) =>{
        setDate({...date,year:Number(year)})
    }
    return(
        <View style={styles.calendarView}>
            <CalendarHeading 
                date={date} 
                NextMonth={NextMonth} PreviousMonth={PreviousMonth}
                openMonthView={openMonthView}
                openYearView={openYearView}
                />

            <View style={{alignItems:'center',justifyContent:'center'}}>
                {views === 'day'?
                <>
                    <Days 
                        openDayView={openDayView}
                        numberOfLetters={numberOfLetters}
                    />
                    <CalendarDays 
                        date={date.date}
                        month={date.month}
                        year={date.year}
                        onValueChange={onValueChange}
                    />
                </>
                : views === 'month'?
                <CalendarMonth 
                    openDayView={openDayView}
                    selectedMonth={date.month}
                    setSelectedMonth={setMonth}
                />
                : <CalendarYear 
                    openMonthView={openMonthView}
                    setYear={setYear}
                    year={date.year}
                />
                }
            </View>
        </View>
    )
}

function CalendarYear(props: YearProps){
    const {openMonthView,year,setYear} = props;
    const {styles} = useStyles(styleSheet);
    React.useEffect(()=>{
        document.addEventListener('keypress',(e)=>{
            if(e.key == 'enter') {
                openMonthView();
            }
        })
    })
    return(
        <View style={styles.calendarContainer}>
            <Input 
                keyboardType="numeric" 
                variant="white" 
                value={`${year}`}  
                onChangeText={setYear}
                onEndEditing={openMonthView}
                onSubmitEditing={openMonthView}
                
            />
            <Button title="Ok" variant="white" block onPress={openMonthView} size="md"/>
        </View>
    )
}

function CalendarMonth(props: MonthProps){
    const {styles:{flexBoxStyles}} = useStyles(styleSheet);
    return(
        <View style={flexBoxStyles}>
            {months.map((month,index)=>(
                <EachMonth
                    key={index}
                    title={month} 
                    month={index} 
                    {...props}/>
            ))}
        </View>
    )
}

function EachMonth(props: EachMonthProps){
    const {month,setSelectedMonth,selectedMonth,title,openDayView} = props;
    const intendedMonth = React.useRef(month);
    const selectMonth = () =>{
        setSelectedMonth(intendedMonth.current);
        setTimeout(()=>{
            openDayView();
        },400)
    }
    const {styles:{monthView,selectedDateView,iniDayView,fontStyles}} = useStyles(styleSheet);

    const colors = useSharedValue({
        backgroundColor: iniDayView.backgroundColor,
        color: iniDayView.color,
    });

    React.useEffect(()=>{
        if(selectedMonth === intendedMonth.current)
            colors.value = withTiming({
                backgroundColor: selectedDateView.backgroundColor,
                color: selectedDateView.color,
            },{duration:200})
        else 
            colors.value = withTiming({
                backgroundColor: iniDayView.backgroundColor,
                color: iniDayView.color,
            },{duration:200})
    },[selectedMonth])

    
    const animatedStyles = useAnimatedStyle(()=>(colors.value))

    return(
        <Animated.View style={[animatedStyles,monthView]}>
            <Pressable onPress={selectMonth} style={monthView}>
                <Animated.Text style={[fontStyles,animatedStyles]}>
                    {title}
                </Animated.Text>
            </Pressable>
        </Animated.View>
    )
}

function CalendarHeading(props: CalendarHeadingProps){
    const {
        date,openMonthView,openYearView,
        NextMonth,PreviousMonth
    } = props;
    const {styles:{flexBoxStyles,borderStyle,calendarHeadingView,headingStyles}} = useStyles(styleSheet);
    return (
        <View style={[flexBoxStyles,borderStyle,{paddingBottom:3}]}>
            <Button title="<" variant="white" size='xs' onPress={PreviousMonth} />
            <View style={calendarHeadingView}>
                <Button variant="white" size="xs" asChild onPress={openMonthView}>
                    <Text style={[headingStyles]}>
                        {months[props.date.month]} 
                    </Text>
                </Button>
                <Button size="xs" variant="white" asChild onPress={openYearView}>
                    <Text style={[headingStyles]}>
                        {date.year}
                    </Text>
                </Button>
            </View>
            <Button title=">" variant="white" size='xs' onPress={NextMonth} />
        </View>
    )
}

function Days(props: CurrentMonthProps){
    const {styles:{flexBoxStyles,borderStyle,dayView,fontStyles,dayHeading}} = useStyles(styleSheet);
    const {numberOfLetters,openDayView} = props;
    const days = numberOfLetters===3? 
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : 
        ['Su','Mo','Tu','We','Th','Fr','Sa'];
    return(
        <Text style={[flexBoxStyles,borderStyle]}>
            {days.map((day)=>(
                <View key={Math.random()*99999} style={dayView}>
                    <Text style={[fontStyles,dayHeading]}>{day}</Text>
                </View>
            ))}
        </Text>
    )
}

function CalendarDays(props: DayProp){
    const {date,year,onValueChange} = props;
    const month = months[props.month];
    const [selectedDate, setSelectedDate] = React.useState(`${date} ${month} ${date}`);


    // Entire workflow can be understood here:)
    // removing 31 from 30 months
    // removing last 31,30 from February 
    // daysBefore is the count of unselectable days before 1  
    // daysAfter is the count of unselectable days after 31|30|29|28
    // if a month start at Sun, ends in 31 -> Tue, 30 -> Mon, 29 -> Sun, 28 -> Mon 
    const generatedDays = React.useMemo(()=>{

        const daysBefore = new Date(`1 ${month} ${year}`).getDay();
        let daysAfter = 6 - (new Date(`31 ${month} ${year}`).getDay()); 
        
        const dates = [[],[...initDates],[]];

        // remove the last memeber if the month only have 30 days , Sep, Apr, Jun, Nov
        if(month==='September'||month==='April'||month==='June'||month==='November') {
            dates[1].pop(); 
            daysAfter = 6 - (new Date(`30 ${month} ${year}`).getDay());
        }
        else if(month==='February') { 
            if(year%4!==0) dates[1].pop();
            dates[1].pop();
            dates[1].pop(); 
            daysAfter = 6 - (new Date(`${year%4===0? 29:28} ${month} ${year}`).getDay());
        }

        let i = 31;
        // adding before dates 
        if(month==='October'||month==='May'||month==='July'||month==='December') i = 30;
        else if(month==='February') i = year%4===0? 29 : 28;
        else i = 31;
        
        // adding before dates
        const daysBeforeArray = [];
        for(let k = 0; k<daysBefore; k++){
            daysBeforeArray.unshift(i-k);
        }
        dates[0] = daysBeforeArray;

        // adding after dates 
        const daysAfterArray = [];
        for(let j = 0; j<daysAfter; j++){
            daysAfterArray.push(j+1);
        }
        dates[2] = daysAfterArray;

        return dates;

    },[props.month,props.year]);
    const {styles} = useStyles(styleSheet);

    return(
        <View style={styles.flexBoxStyles}>
            {generatedDays.map((date,index)=>(
                date.map((date_)=>(
                    <EachDay 
                        key={Math.random()*9999} 
                        month={index===0? props.month-1 : index===1? props.month+1 : props.month}
                        year={year}
                        date={date_} 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate}
                        unselectable={index===0||index===2}
                        onValueChange={onValueChange}
                    />
                ))
            ))}
        </View>
    )
}

function EachDay(props: EachDayProps){
    const {date,month,year,selectedDate,setSelectedDate,unselectable,onValueChange} = props;
    const intendedDate = React.useRef(`${date} ${month} ${year}`);
    
    const {styles:{dayView,selectedDateView,unselectableDateView,iniDayView,fontStyles}} = useStyles(styleSheet);

    const colors = useSharedValue({
        backgroundColor: unselectable? unselectableDateView.backgroundColor : iniDayView.backgroundColor,
        color: unselectable? unselectableDateView.color : iniDayView.color,
    });

    React.useEffect(()=>{
        if(selectedDate === intendedDate.current)
            colors.value = withTiming({
                backgroundColor: selectedDateView.backgroundColor,
                color: selectedDateView.color,
            },{duration:200})
    },[selectedDate])

    const selectDate = () =>{
        if(!unselectable) {
            setSelectedDate(intendedDate.current);
            onValueChange(intendedDate.current);
        }
    }
    const animatedStyles = useAnimatedStyle(()=>(colors.value))

    return(
        <Animated.View style={[animatedStyles,dayView]}>
            <Pressable onPress={selectDate} style={[dayView]}>
                <Animated.Text style={[fontStyles,animatedStyles]}>
                    {date}
                </Animated.Text>
            </Pressable>
        </Animated.View>
    )
}


const styleSheet = createStyleSheet((theme)=>({
    calendarContainer:{
        alignItems:'center',
        justifyContent:'center',
        height:200
    },
    calendarView: {
        maxWidth:240,
        width: 240,
        padding:5,
        borderRadius:5,
        zIndex:3,
        borderWidth: 1,
        borderColor: Colors.slate['300'],
        backgroundColor: theme.color['white']
    },
    flexBoxStyles:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    borderStyle:{
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate['200']
    },
    fontStyles:{
        fontWeight: '600',
    },
    headingStyles:{
        fontWeight: '600',
        color: theme.color['black']
    },
    calendarHeadingView:{
        width:150,
        flexDirection:'row',
        paddingBottom:3,
        marginHorizontal:10,
        justifyContent:'center'
    },
    dayView:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        margin: 1
    },
    dayHeading:{
        color: theme.color['darkGray']
    },
    iniDayView: {
        backgroundColor: theme.color['white'],
        color: theme.color['black'],
    },
    monthView:{
        width: 70,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        margin: 1
    },
    selectedDateView:{
        backgroundColor: theme.color['black'],
        color: theme.color['white'],
    },
    unselectableDateView:{
        backgroundColor: theme.color['white'],
        color: Colors.slate['500']
    }
}))

const DatePicker = Calendar
export default DatePicker 