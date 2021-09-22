import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Font from './Fonts'

const ApplicationStyles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
  },
  containerSearch: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImages:{
    height: 500, width: 360
  },
  containerApp:{
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  card:{
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 12, 
    marginHorizontal: 12
  },
  image60:{
    width: 60, 
    height: 60
  },
  image40:{
    width: 40, 
    height: 40
  },
  image20:{
    width: 20, 
    height: 20,
    marginRight: 20
  },
  description:{
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: 10, 
    justifyContent: 'flex-start'
  },
  titleCard:{
    height: 22, 
    fontSize: Font.size.regular, 
    fontFamily: Font.type.bold
  },
  playMusic:{
    // position: 'absolute',
    height: 60, 
    flexDirection: 'row', 
    paddingHorizontal: 12, 
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ececec'
  },
  trackName:{
    height: 22, 
    width: 270,
    fontSize: Font.size.regular, 
    fontFamily: Font.type.bold
  },
  topBar:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    height: 60, 
    paddingHorizontal: 12,
    backgroundColor: '#ececec',
  },
  textInput:{
    backgroundColor: Colors.white, 
    height: 40, 
    width: 300, 
    paddingHorizontal: 10, 
    borderRadius: 10
  },
  boxImage:{
    backgroundColor: '#ffffff', 
    width: 40, 
    height: 40, 
    borderRadius: 6
  }  
});

export default ApplicationStyles;
