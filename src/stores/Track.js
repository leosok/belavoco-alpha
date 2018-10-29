import { observable } from 'mobx';

class Track {
  @observable title = '';
  @observable artist = '';
  // @observable artwork;
}  

export default new Track();
