import React from 'react';
import './App.css';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

function App() {
  return (
    <div className="App">
      <h1>95Defender</h1>
      <ImageConversion />
      <h3>Protect your images with N95 masks</h3>
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
    console.log(picture);
    this.getBase64(picture[0], (result) => {
      this.handleSubmit(result)
    })
  }

  handleSubmit = (img64) => {
    const bytes = img64.split(/,(.+)/)[1];
    let url = 'https://d2ugoy1n3m739j.cloudfront.net/api/mask_image';
    const data = new FormData();
    data.append("image", bytes);
    const requestOptions = {
      method: 'POST',
      body: data
    };
    console.log(requestOptions);
    fetch(url, requestOptions)
      .then(response => response.text())
      .then((imgBytes) => {
        console.log(imgBytes);
        this.setState({masked_image: imgBytes});
      })
      .catch(error => { console.log(error.response) });
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    if (this.state.masked_image) {
      return (
        <div className="imageConversion">
          <ImageUploader withIcon={true} buttonText="Upload new image"
            onChange={this.onDrop}
            imgExtension={[".jpg"]}
            maxFileSize={5242880}
            singleImage={true}
            label='Max File Size: 5MB, accepted: .JPG'
          />
          <img src={`data:image/jpeg;base64,${this.state.masked_image}`} alt="Protected image"></img>
        </div>
      );
    } else {
      return (
        <div className="imageConversion">
          <ImageUploader withIcon={true} buttonText="Upload image"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".jpeg"]}
            singleImage={true}
            label='Max File Size: 5MB, accepted: .JPG'
            maxFileSize={5242880} />
        </div>
      );
    }
  }
}



export default App;
