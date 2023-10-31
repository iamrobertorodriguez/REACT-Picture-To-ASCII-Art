import axios from "axios";
import { useState } from "react";

const UploadImageForm = ({handleResult}) => {
  const [imageFile, setImageFile] = useState(null);
  const [sizeValue, setSizeValue] = useState('md')

  const handleImageUpload = (event) => {
    if (event.target.files.length > 1) {
      setImageFile(null)
      return alert('Only 1 image at the time can be parsed.')
    }

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImageFile(base64Image.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (e) => {
    setSizeValue(e.target.value)
  }

  const [isButtonTriggered, setIsButtonTriggered] = useState(false)

  const clearStates = () => {
    setIsButtonTriggered(false)
    setImageFile(null)
    setSizeValue('md')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsButtonTriggered(true)
    
    const formData = {
      'base_64': imageFile,
      'size': sizeValue,
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/conversion/convert/`,
      formData
    ).then(({data}) => {
      return {success: true, ascii_art: data['ascii_art'], size: formData.size}
    }).catch(() => {
      return {error: true}
    })

    if (response.success) {
      clearStates()
      handleResult(response)
    } else {
      clearStates()
      alert('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} id="upload-image-form">
      <div>
        <label htmlFor="file-input">Upload one image:</label>
        {
          !imageFile ?
          <input required name="base_64" type="file" accept="image/*" onChange={handleImageUpload} id="file-input"/> :
          <button type="button" className="red-content" onClick={() => setImageFile(null)}>Clear</button>
        }
      </div>
      <div>
        <label htmlFor="size-input">Choose a size for your result:</label>
        <select required name="size" id="size-input" value={sizeValue} onChange={handleSizeChange}>
          <option value="xs">Very Small</option>
          <option value="s">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Very Large</option>
        </select>
      </div>
      {
        imageFile &&
        <div>
          <button disabled={isButtonTriggered} type="submit">
            {!isButtonTriggered ? 'Do some art' : 'Loading...'}
          </button>
        </div>
      }
    </form>
  );
};

export default UploadImageForm;