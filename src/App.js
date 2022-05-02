import React from 'react';
import clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new clarifai.App({ apiKey: 'a5c61027733b4e79aa3eba9632c07962' });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (responce) {
        console.log(responce.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {
        console.log(err);
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo></Logo>
        <Rank></Rank>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}></ImageLinkForm>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
