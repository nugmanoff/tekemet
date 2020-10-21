import { useState, Component } from 'react';
import { Howl } from 'howler';

import { BsPlayFill, BsPauseFill } from 'react-icons/bs';

type State = {
  isPlaying: boolean;
};

class Home extends Component {
  private sound;
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
    this.sound = new Howl({
      src: 'https://tekemet.herokuapp.com/stream',
      html5: true, // A live stream can only be played through HTML5 Audio.
      format: ['mp3', 'aac'],
    });
  }

  handleClick() {
    if (this.state.isPlaying) {
      this.sound.unload();
    } else {
      this.sound.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', height: 'auto', width: 'auto' }}>
          <p>Tekemet</p>
          <img
            src="/images/amre.jpg"
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              zIndex: 0,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: 'transparent',
              marginTop: '25px',
            }}
            onClick={() => this.handleClick()}
          >
            {this.state.isPlaying ? (
              <BsPauseFill style={{ width: '50px', height: '50px' }} />
            ) : (
              <BsPlayFill style={{ width: '50px', height: '50px' }} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
