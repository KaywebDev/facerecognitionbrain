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
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.bottom_row * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxs) => {
    this.setState({ box: boxs });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(responce => this.displayFaceBox(this.calculateFaceLocation(responce)))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo></Logo>
        <Rank></Rank>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}></ImageLinkForm>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
