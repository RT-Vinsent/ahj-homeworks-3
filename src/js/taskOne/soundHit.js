import myAudioResource from '../../audio/hit.mp3';

export default class SoundHit {
  static play() {
    const myAudio = new Audio();
    myAudio.src = myAudioResource;
    myAudio.play();
  }
}
