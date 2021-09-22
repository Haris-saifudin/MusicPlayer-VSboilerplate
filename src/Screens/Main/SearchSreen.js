import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import { SampleAction } from '../../Sagas/SampleSagas';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import CardMusic from './Component/CardMusic';
import images from '../../Themes/Images';

class SearchScreen extends PureComponent {
  
  render() {
    const {payload, playMusic, musicList, onPlayMusic} = this.props;
    const {music, reset, selectMusic, searchMusic} = this.props;
    
    return (
      <View style={ApplicationStyles.containerSearch}>
        <View style={ApplicationStyles.container}>
          <View style={ApplicationStyles.topBar}>
            <TextInput
              style={ApplicationStyles.textInput}
              placeholder={"search in apple music"}
              onChangeText={(text) => searchMusic(text)}
              // onFocus={() => music(false)}

            />
            <TouchableOpacity  activeOpacity={0.8} onPress={() =>searchMusic('rihana')}>
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
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>selectMusic(item.item)}>
                      <View style={ApplicationStyles.card}>
                        <Image style={{height: 60, width: 60}} source={{uri: item.item.artworkUrl60}}/>
                        <View style={ApplicationStyles.description}>
                          <Text style={ApplicationStyles.titleCard}>{item.item.trackName}</Text>
                          <Text style={Font.style.normal, {height: 22}}>{item.item.artistName} - {item.item.collectionName}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
          </View>
          :
          <Text>false</Text>
        }

        {(onPlayMusic) ? (
        <View style={ApplicationStyles.playMusic}>
          <Image style={{width: 40, height: 40}} source={{uri: onPlayMusic.artworkUrl60}}/> 
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.trackName}>{onPlayMusic.trackName}</Text>
            <Text style={Font.style.normal, {height: 22}}>{onPlayMusic.artistName} - {onPlayMusic.collectionName}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => music(false)}>
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
  console.tron.error({state});
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
    searchMusic: (search) => dispatch(SampleActions.actionSearchMusic(search)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
