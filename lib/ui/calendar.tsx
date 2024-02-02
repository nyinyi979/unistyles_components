import React from "react";
import Button from "../basic/button";
import { Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Colors } from "../unistyles";
import { CalendarHeadingProps, CalendarProps, DateData, DayProp, EachDayProp, Months } from "..";

const months:Months[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const initDates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const now = new Date();
const _date = now.getDate();
const _month = now.getMonth();
const _year = now.getFullYear();

/**
 * 
 * @param Calendar
 * - numberOfLetters: Sat, Sun or Sa, Su
 * - onValueChange: (date: string)=>void, callback function for when the value is updated
 * @returns JSX Calendar Component
 */
function Calendar(props: CalendarProps){
    const {
        numberOfLetters=3,
        onValueChange=(date)=>{console.log(date)},
        initDate={month:_month,year:_year}
    } = props;
    const [date, setDate] = React.useState<DateData>({
        date: _date,
        month: initDate.month,
        year: initDate.year
    });
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
    
    return(
        <View style={styles.calendarView}>
            <CalendarHeading 
                date={date} 
                numberOfLetters={numberOfLetters} 
                NextMonth={NextMonth} PreviousMonth={PreviousMonth}
                />

            <CalendarDays 
                {...date} 
                onValueChange={onValueChange}
                />
        </View>
    )
}



function CalendarHeading(props: CalendarHeadingProps){
    const {
        numberOfLetters,
        date,
        NextMonth,PreviousMonth
    } = props;
    const {styles} = useStyles(styleSheet);
    const days = numberOfLetters===3? 
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : 
        ['Su','Mo','Tu','We','Th','Fr','Sa'];
    return (
        <View>
            <View style={[styles.flexBoxStyles,styles.borderStyle,{paddingBottom:3}]}>

                <Button title="<" variant="white" size='xs' onPress={PreviousMonth} />
                <Text style={[styles.headingStyles,{width:'70%',textAlign:'center'}]}>
                    {months[props.date.month]} {date.year}
                </Text>
                <Button title=">" variant="white" size='xs' onPress={NextMonth} />

            </View>

            <Text style={[styles.flexBoxStyles,styles.borderStyle]}>
                {days.map((day)=>(
                    <View key={Math.random()*99999} style={styles.dateView}>
                        <Text style={styles.fontStyles}>{day}</Text>
                    </View>
                ))}
            </Text>
            
        </View>
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
            daysBeforeArray.push(i-k);
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
function EachDay(props: EachDayProp){
    const {date,month,year,selectedDate,setSelectedDate,unselectable,onValueChange} = props;
    const {styles:{dateView,selectedDateView,unselectableDateView,fontStyles}} = useStyles(styleSheet);

    const intendedDate = React.useRef(`${date} ${month} ${year}`);
    const style = unselectable? unselectableDateView: 
        selectedDate===intendedDate.current? selectedDateView : dateView;

    const selectDate = () =>{
        if(!unselectable) {
            setSelectedDate(intendedDate.current);
            onValueChange(intendedDate.current);
        }
    }
    return(
        <Pressable style={style} onPress={selectDate}>
            <Text style={[fontStyles, {color:style.color}]}>
                {date}
            </Text>
        </Pressable>
    )
}

const styleSheet = createStyleSheet((theme)=>({
    calendarView: {
        maxWidth:240,
        width: 240,
        padding:5,
        borderRadius:5,
        zIndex:5,
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
    dateView: {
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        backgroundColor: theme.color['white'],
        color: theme.color['black'],
        margin: 1
    },
    selectedDateView:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        backgroundColor: theme.color['black'],
        color: theme.color['white'],
        margin: 1
    },
    unselectableDateView:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        backgroundColor: theme.color['white'],
        color: Colors.slate['500'],
        margin: 1
    }
}))

const DatePicker = Calendar
export default DatePicker 