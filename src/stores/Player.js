import { observable } from 'mobx';

class Player {
  @observable playbackState;
  @observable playbackType;
}  

export default new Player();
