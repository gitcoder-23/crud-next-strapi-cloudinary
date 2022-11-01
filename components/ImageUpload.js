import { useState } from 'react';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageUpload({
  sportNewsId,
  setImagePreview,
  setShowModel,
  imageUploaded,
}) {
  console.log('sportNewsId->', sportNewsId);
  const [imageFile, setImageFile] = useState(null);

  // const handleFileChange = (e) => {
  //   console.log('log-file->', e.target.files);
  //   // let getImage = e.target.files[0];
  //   setImage(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // imageUploaded();
  //   const formData = new FormData();
  //   formData.append('files', image);
  //   // "sports"- strapi collection name
  //   formData.append('ref', 'sports');
  //   formData.append('refId', sportNewsId);
  //   // "image"- strapi collection field name
  //   formData.append('field', 'image');
  //   // formData.append('name', 'testfile.png');
  //   // formData.append('type', 'image/png');

  //   //upload
  //   // const res = await fetch(`${API_URL}/api/upload`, {
  //   //   method: 'POST',
  //   //   body: formData,
  //   // });

  //   console.log('formData->', formData);

  //   axios
  //     .post(`${API_URL}/api/upload`, formData)
  //     .then((upRes) => {
  //       console.log('upRes->', upRes);
  //       imageUploaded();
  //     })
  //     .catch((err) => {
  //       console.log('upErr->', err);
  //     });

  //   // if (res.ok) {
  //   //   imageUploaded();
  //   // }
  // };

  const handleFileChange = (evnt) => {
    console.log('evnt.target.files->', evnt.target.files);
    setImageFile(evnt.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    console.log('fileSubmit-image', imageFile);

    let data = new FormData();
    data.append('files', imageFile);
    data.append('ref', 'api::sports.sports');
    data.append('refId', sportNewsId);
    // data.append('field', 'images');

    const uploadRes = await axios({
      method: 'POST',
      url: `${API_URL}/api/upload`,
      data: data,
    });
    console.log('fileUpload', uploadRes);
    if (uploadRes.status === 200) {
      toast.success('Image edited and uploaded');
      setImagePreview(uploadRes?.data[0]?.url);
      imageUploaded();
      setShowModel(false);
    } else {
      toast.error('Image upload error');
    }
  };

  return (
    <div className={styles.form}>
      <h4>Upload Sport News Image</h4>
      <form onSubmit={handleFileSubmit}>
        <div className={styles.file}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
