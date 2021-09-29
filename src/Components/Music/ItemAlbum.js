import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ApplicationStyles from '../../Themes/ApplicationStyles';


const ItemAlbum = (item, index) =>{
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(item)}>
      <View style={ApplicationStyles.card}>
          <FastImage style={ApplicationStyles.imageAlbum} 
            source={{
              uri: item.item.artworkUrl60,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.titleCard}>{item.item.collectionCensoredName}</Text>
            <Text style={{height: 22}}>{item.item.collectionType}</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default ItemAlbum;

