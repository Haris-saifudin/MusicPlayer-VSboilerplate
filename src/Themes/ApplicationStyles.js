import {Dimensions, StyleSheet} from 'react-native';
import Colors from './Colors';
import Font from './Fonts'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

const ApplicationStyles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
  },
  containerSearch: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerOnboard: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50
  },
  cardImages:{
    height: 500, 
    width: 360,
    marginTop: 12,
    borderRadius: 10
  },
  containerApp:{
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  card:{
    flex: 1, 
    flexDirection: 'row', 
    paddingVertical: 10, 
    marginHorizontal: 16,
    borderBottomColor: "#ececec",
    borderBottomWidth: 2
  },
  image60:{
    width: 55, 
    height: 55,
    borderRadius: 3
  },
  imageAlbum:{
    width: 55, 
    height: 55,
    borderRadius: 30
  },
  image40:{
    width: 40, 
    height: 40
  },
  iconCardMusic:{
    width: 16, 
    height: 16,
    marginLeft: 20
  },
  icon:{
    height: 16,
    width: 28, 
    marginLeft: 20,
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
    fontFamily: Font.type.bold,
    fontWeight: 'bold'
  },
  titleOnBoard:{
    fontFamily: Font.type.bold,
    fontSize: Font.size.h2, 
    fontWeight: 'bold'
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
    fontFamily: Font.type.bold,
    fontWeight: 'bold'
  },
  topBar:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    height: 60, 
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  tabBar:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 6,
    marginHorizontal: 16
  },
  activeTabBar:{
    width: windowWidth/2-16, 
    paddingBottom: 8, 
    borderBottomColor: '#ff0000',
    borderBottomWidth: 1.5
  },
  defaultTabBar:{
    width: windowWidth/2-16, 
    paddingBottom: 8, 
  },
  activeTextTabBar:{
    fontFamily: Font.type.bold,
    color: '#ff0000', 
    fontSize: 16, 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  defaultTextTabBar:{
    fontFamily: Font.type.bold,
    color: 'grey', 
    fontSize: 16, 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput:{
    backgroundColor: Colors.white, 
    height: 40, 
    width: windowWidth-32-60, 
    paddingHorizontal: 10, 
    borderRadius: 10,
    backgroundColor: '#ececec',
    color: '#000000'
  },
  boxImage:{
    backgroundColor: '#ffffff', 
    width: 40, 
    height: 40, 
    borderRadius: 6
  }  
});

export default ApplicationStyles;
