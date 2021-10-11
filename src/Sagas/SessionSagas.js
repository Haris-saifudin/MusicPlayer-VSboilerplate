import NavigationServices from '../Navigation/NavigationServices';
import { UpdatePlaylist } from '../Components/Music/MusicManager';
// import {Reducers} from '../Redux/ResetRedux';

export function ActionReset() {
  console.log("[reset]");
  NavigationServices.setRootAuth();
}
export function ActionNavigateToMain() {
  NavigationServices.setRootMain();
  UpdatePlaylist();
}
