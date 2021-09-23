import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import { SampleAction } from '../../Sagas/SampleSagas';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import CardMusic from './Component/CardMusic';
import images from '../../Themes/Images';

class SearchScreen extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      activeMusic: [],
      statusMusic: false
    }
  }

  componentDidMount(){
    const {music} = this.props;
    this.getSelectMusic();
    music(false);
  }

  getSelectMusic (){
    const {playMusic, onPlayMusic} = this.props;
    this.setState({
      activeMusic: onPlayMusic,
      statusMusic: playMusic
    });
  }

  cancel = () => {
    const {selectMusic} = this.props;
    Keyboard.dismiss();
    this.setState({
      query: ''
    });
    selectMusic(this.state.activeMusic);
  }

  onSearchMusic = (text) =>{
    const {music, searchMusic} = this.props;
    music(false);
    this.setState({
      query: text
    });
    if(text == ''){
      searchMusic('justin', this.state.activeMusic);
    }
    else{
      searchMusic(text, this.state.activeMusic)
    }

  }

  onSelectMusic = (item) =>{
    const {music, selectMusic} = this.props;
    this.setState({
      query: '',
      activeMusic: item,
      statusMusic: true
    });
    selectMusic(item);
    music(true);
  }

  render() {
    const {payload, playMusic, musicList, onPlayMusic} = this.props;
    const {music, reset, selectMusic, searchMusic} = this.props;
    // console.log(onPlayMusic);
    console.log(this.state.activeMusic);
    return (
      <View style={ApplicationStyles.containerSearch}>
        <View style={ApplicationStyles.container}>
          <View style={ApplicationStyles.topBar}>
            <TextInput
              style={ApplicationStyles.textInput}
              placeholder={"search in apple music"}
              onChangeText={(text) => this.onSearchMusic(text)}
              value={this.state.query}
              onFocus={() => music(false)}
              onBlur={()=> selectMusic(this.state.activeMusic)}
            />
            <TouchableOpacity  activeOpacity={0.8} onPress={this.cancel}>
              <Text style={Font.style.normal}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {(payload)?
          <View style={{flex: 1}}>
              <FlatList 
                data={musicList.data}
                keyExtractor={item => item.trackId.toString()}
                renderItem={(item) =>{
                  return(
                    <TouchableOpacity activeOpacity={0.8} onPress={ (() => this.onSelectMusic(item.item))}>
                      <View style={ApplicationStyles.card}>
                        <Image style={{height: 60, width: 60}} source={{uri: item.item.artworkUrl60}}/>
                        <View style={ApplicationStyles.description}>
                          <Text style={ApplicationStyles.titleCard}>{item.item.trackCensoredName}</Text>
                          <Text style={Font.style.normal, {height: 22}}>{item.item.artistName} - {item.item.collectionName}</Text>
                        </View>
                        {/* <View style={{height: 20, backgroundColor: '#ececec'}}>
                          <Text>aaaa</Text>
                        </View> */}
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
          </View>
          :
          <Text>false</Text>
        }

        {(this.state.statusMusic) ? (
        <View style={ApplicationStyles.playMusic}>
          <Image style={{width: 40, height: 40}} source={{uri: this.state.activeMusic.artworkUrl60}}/> 
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.trackName}>{this.state.activeMusic.trackCensoredName}</Text>
            <Text style={Font.style.normal, {height: 22}}>{this.state.activeMusic.artistName} - {this.state.activeMusic.collectionName}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => music(!playMusic)}>
            { (playMusic)?  <Image source={images.play} style={ApplicationStyles.image20} /> :
              <Image source={images.pause} style={ApplicationStyles.image20} />
            }
          </TouchableOpacity>
        </View>) : (<View style={ApplicationStyles.playMusic}>
          <View style={ApplicationStyles.boxImage}/>
          <View style={ApplicationStyles.description}>
            <Text style={Font.style.h6}>Not Playing</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={images.pause} style={ApplicationStyles.image20} />
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.tron.error({state});
  return {
    payload: SampleSelectors.getDataAction(state),
    playMusic: SampleSelectors.getActiveMusic(state),
    musicList: SampleSelectors.getMusicList(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    searchMusic: (search, select) => dispatch(SampleActions.actionSearchMusic(search, select)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
