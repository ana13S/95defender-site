import React from 'react';
import './App.css';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

function App() {
  return (
    <div className="App">
      <h1>95Defender</h1>
      <ImageConversion/>
    </div>
  );
}

class ImageConversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, masked_image: null };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({ image: picture });
    //this.handleSubmit();
  }

  handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      'image', this.state.image
    )
    formData.append('responseType', 'stream');
    let url = '';
    axios.get(url, formData)
      .then(response => {
        this.setState({ masked_image: response.data });
      })
  }

  render() {
    if (this.state.masked_image) {
      return (
        <div className="imageConversion">
          <ImageUploader withIcon={true} buttonText="Upload new image"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880} 
            singleImage={true}
            label ='Max File Size: 5MB, accepted: .JPG | .PNG'
            />
          <img src={this.state.masked_image} alt="Protected image"></img>
        </div>
      );
    } else {
      return (
        <div className="imageConversion">
          <ImageUploader withIcon={true} buttonText="Upload image"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".png"]}
            singleImage={true}
            label ='Max File Size: 5MB, accepted: .JPG | .PNG'
            maxFileSize={5242880} />
        </div>
      );
    }
  }
}



export default App;
