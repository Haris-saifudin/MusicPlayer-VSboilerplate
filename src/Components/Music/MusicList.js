import * as React from 'react';
import { View, useWindowDimensions , StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AlbumScreen from '../../Screens/Main/AlbumScreen';
import SongScreen from '../../Screens/Main/SongScreen';

const renderScene = SceneMap({
  song: SongScreen,
  album: AlbumScreen,
});

export default function MusicList() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'song', title: 'SONG' },
    { key: 'album', title: 'ALBUM' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'red'}}
      style={{ backgroundColor: 'white'}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{color: (focused)? 'red' : 'grey'}}>
          {route.title}
        </Text>
      )}
      pressColor={"#ececec"}
      // tabStyle={{backgroundColor: 'white' }}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={{marginHorizontal: 12}}
    />
  );
}