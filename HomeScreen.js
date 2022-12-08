import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Pressable,
} from 'react-native';

import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,Foundation,AntDesign,Entypo } from '@expo/vector-icons';

import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

import tinycolor from 'tinycolor2';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const d = new Date();

    this.state = {
      suggestedLtrs: 0,
      date:
        new Date().getDate() +
        '-' +
        month[d.getMonth()] +
        '-' +
        new Date().getFullYear(),
      email: firebase.auth().currentUser.email,
      cupSize: '',
      intake: 0,
      intakeInLtrs: '',
      totalDayIntake: 0,
      cupSizeSelected: false,
      firstEntry: true,
      docId: '',
      color1: '#b1bfd8',
      color2: '#6782b4',
      borderColorState: '#c4c4c4',
      daysIntakeIsTrue: false,
      goalMet: false,
      titleText: 'Start Drinking!',
      modalVisible: false,
      success:false,
      
      
    };
  }

  getUserDetails = async () => {
    await db
      .collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            suggestedLtrs: Math.round(doc.data().suggestedLitres),
            cupSize: doc.data().cupSize,
          });
        });
      });
  };
  getIntake = async () => {
    var today = this.state.date;
    await db
      .collection('intake')
      .doc(this.state.email)
      .onSnapshot((doc) => {
        if (doc.data()[today]) {
          this.setState({ totalDayIntake: doc.data()[today] });
        }
        
      });
    if (0 < parseInt(this.state.suggestedLtrs)) {
      this.setState({ titleText: "Don't forget to hydrate!" });
    }
  };
  componentDidMount = async () => {
    this.getUserDetails();
    this.getIntake();
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  logout=()=>{
    firebase.auth().signOut().then(() => {
       alert("Logged out")
       this.props.navigation.replace('LoginScreen');
      }).catch((error) => {
        alert("Something went wrong!Try Again")
      });
}

 datesBlacklist =

  [ moment().add((-1),'days'),moment().add((-2),'days'),moment().add((-3),'days'),moment().add((-4),'days'),
  moment().add((-5),'days'),moment().add((-6),'days'),moment().add((-7),'days') ]; 

  render() {
    const {header_color} = this.props;
    var color2 = tinycolor(header_color);
    var text_color = color2.isDark() ? '#fff' : '#000';
    const { modalVisible } = this.state;
    return (

      <ImageBackground source={require('../assets/2.png')} style={styles.container}>
        <View style={{flexDirection:'row', marginTop:'15%', alignItems:'center',alignSelf:'center'}}>
        <Text style={{fontFamily:'Trebuchet MS', color:'#0F52BA', fontSize:25}}>DRINK WATER REMINDER</Text>
        <TouchableOpacity style={{marginLeft:'25%'}} onPress={() => { this.logout() }} >
        <AntDesign name="logout" size={24} color="#0F52BA" />
        </TouchableOpacity>
        
        </View>
         <View  style={{marginTop:'5%',flexDirection: 'row', marginLeft:'2%'}}>
         
          
       <Image source={require('../assets/droppyHome.png')} style={{height:70,width:70}}></Image>
       <View style={{maxWidth: 300,
    paddingTop:10,
        paddingLeft:10,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        borderBottomEndRadius:10,
        backgroundColor:'#ADD8E6',
        }}>
           <Text style={{paddingTop: 5, color:'#4287f5',fontWeight:'bold',fontFamily:'Trebuchet MS'}}>Hold the water in your mouth for a while before swollowing!</Text>
        </View>
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
        <Foundation name="lightbulb" size={50} color="yellow" style={{marginLeft:'2%'}} />
        </TouchableOpacity>
       </View>
          
         
        
       
          <View
            style={{
             
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#4287f5',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
                marginTop:150,
              }}>
              {this.state.titleText}
            </Text>
           
            <Text style={{ color: '#4287f5', fontWeight: 'bold' }}>
              Your daily hydration goal is {this.state.suggestedLtrs} litres.
            </Text>
            
            <Text style={{ color: '#4287f5' }}>
              Your current day intake is{' '}
              {parseInt(Math.round(this.state.totalDayIntake) / 1000)} litres.
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <TextInput
                  placeholder={'ml'}
                  maxLength={3}
                  style={[
                    {
                      height: 100,
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: 10,
                      borderBottomWidth: 3,
                      borderColor: '#c4c4c4',
                      marginBottom: 10,
                      alignSelf: 'center',
                      color: '#4287f5',
                      flex: 1,
                      outline: 'none',
                      width: 50,
                    },
                    { borderColor: this.state.borderColorState },
                  ]}
                  onChangeText={(e) => {
                    this.setState({
                      intake: e,
                    });
                  }}
                  value={this.state.intake}
                  onFocus={() => {
                    this.setState({ borderColorState: '#4287f5' });
                  }}
                  onBlur={() => {
                    this.setState({ borderColorState: '#c4c4c4' });
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <LinearGradient
                    colors={[this.state.color1, this.state.color2]}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 50,
                      width: 105,
                      padding: 14,
                      height: 45,
                      marginRight: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      display: 'inline-block',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          intake: this.state.cupSize,
                          color1: '#09c6f9',
                          color2: '#045de9',
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {this.state.cupSize} ml
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#5aff15', '#00b712']}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: '100%',
                      backgroundColor: '#4287f5',
                      width: 25,
                      padding: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginVertical: 2,
                      display: 'inline-block',
                    }}>
                    <TouchableOpacity style={{width:100}}
                      onPress={() => {
                        this.recordIntake();
                      }}>
                     <Entypo name="check" size={24} color="white" />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>How to drink water correctly?</Text>
              <View style={{flexDirection:'row',backgroundColor:'#ADD8E6',borderRadius:15,paddingLeft:'2%',paddingRight:'3%',paddingTop:'2%',height:50}}>
              <Image source={require('../assets/boyDrink.png')} style={{height:50,width:50}}></Image>
              <Text style={styles.modalText}>Drink small sips and slowly</Text>
              </View>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{marginTop:'10%'}}>
          <Text>Click on the date to day's Update</Text>
        <CalendarStrip
        //calendarAnimation={{type: 'sequence', duration: 10}}
        
              daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: text_color}}
              style={{height: 100, paddingTop: 20, paddingBottom: 10}}
              calendarHeaderStyle={{color: text_color}}
              calendarColor={color2.toHexString()}
              dateNumberStyle={{color: text_color}} 
              dateNameStyle={{color: text_color}} 
              highlightDateNumberStyle={{color: 'red'}}
              highlightDateNameStyle={{color: 'red'}}
              disabledDateNameStyle={{color: 'grey'}}
              disabledDateNumberStyle={{color: 'grey'}}
              selectedDate={moment()}
              datesBlacklist={this.datesBlacklist}
              scrollable={true}
              iconContainer={{flex: 0.1}}
              onDateSelected={date2 => {
                console.log(date2)

                var totalUpdatedIntake =
      parseInt(this.state.totalDayIntake) + parseInt(this.state.intake);
      db
      .collection('intake')
      .doc(this.state.email)
      .set({ 
        [this.state.date]: totalUpdatedIntake,
      });
    
            
                let timestamp= new Date(date2).getTime();
                
                let day=new Date(timestamp).getDate();
                
                let month=new Date(timestamp).getMonth()+1;
                let year=new Date(timestamp).getFullYear();

                 var calenderDate=`${day}-${month}-${year}`;
                 console.log(calenderDate);
                 console.log(this.state.date);
                  
                 console.log(this.state.success)
                 
               
                
              if ( totalUpdatedIntake > this.state.suggestedLtrs * 1000 && this.state.date===calenderDate) {
                
                alert('Task completed for today');
              }
            
              else{
                  alert('Task not completed for the day');
                 }
                
           
          }}
             />
             </View>
      </ImageBackground>
    );
  }

  

  recordIntake = async () => {
    var totalUpdatedIntake =
      parseInt(this.state.totalDayIntake) + parseInt(this.state.intake);
    console.log(totalUpdatedIntake);
    console.log(this.state.suggestedLtrs);
try{
    await db
      .collection('intake')
      .doc(this.state.email)
      .set({ 
        [this.state.date]: totalUpdatedIntake,
      });
    if (totalUpdatedIntake > this.state.suggestedLtrs * 1000) {
      this.setState({success:true})
      this.setState({ titleText: "You met today's goal!" });

      //alert('Congratulations! You met your daily hydration goal!');
      window.location.reload(true);
     
    }
  
  }catch(e){
      console.log(e)
  }
  }
}

const styles = StyleSheet.create({
  containerCalender: {
    flex: 1,
    backgroundColor: '#0F52BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'3%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3", 
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:'bold',
    fontSize:'15'
  },
});

              
//       selectedDate={context.date}/>
// <CalendarPicker style={{borderRadius:10,elevation:4}} 



 {/* <View style={styles.containerCalender}>
<WeeklyCalendar events={this.state.titleText}  style={{ height: 300 }} />
</View>   */}
