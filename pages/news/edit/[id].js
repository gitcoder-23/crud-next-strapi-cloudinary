import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/form.module.css';
import Modal from '@/components/Modal';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

export default function EditNews() {
  const router = useRouter();
  let sId = router?.query?.id;
  const [showModel, setShowModel] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [values, setValues] = useState({
    sportName: '',
    details: '',
    date: '',
    time: '',
  });

  const getSingleSport = () => {
    axios
      .get(`${API_URL}/api/sports/${sId}?populate=*`)
      .then((res) => {
        // console.log('singleNewsEdit->', res);
        let newDate = res?.data?.data?.attributes?.date;
        let modDate = moment(newDate).format('yyyy-MM-DD');
        let imagePre = res?.data?.data?.attributes?.image
          ? res?.data?.data?.attributes?.image?.data?.attributes?.url
          : null;
        setValues({
          sportName: res?.data?.data?.attributes?.name,
          details: res?.data?.data?.attributes?.details,
          date: modDate,
          time: res?.data?.data?.attributes?.time,
        });
        setImagePreview(imagePre);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSingleSport();
  }, [router?.query?.id]);

  const { sportName, details, date, time } = values;

  console.log('imagePreview->', imagePreview);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: sportName,
      details: details,
      date: date,
      time: time,
      // image: imagePreview,
    };
    console.log('formData->', formData);
    axios
      .put(`${API_URL}/api/sports/${sId}`, { data: formData })
      .then((resPut) => {
        console.log('resPut->', resPut);
        toast.success('News updated success');
        // const getPost = resPut?.data?.data;
        // router.push(`/news/${getPost?.id}`);
      })
      .catch((err) => {
        console.log('putErr->', err);
        toast.error('Something went wrong!');
      });
  };

  const imageUploaded = async (e) => {
    console.log('click');
    const res = await fetch(`${API_URL}/api/sports/${sId}?populate=*`);
    const data = await res.json();
    console.log('data->', data);
    // setImagePreview(data?.image?.formats?.thumbnail?.url);
    setShowModel(false);
  };

  return (
    <Layout title={'Edit Current News'}>
      <div style={{ marginBottom: 30 }}>
        <Link
          href={'/news'}
          style={{ background: 'orange', padding: 10, color: '#fff' }}
        >
          Go Back
        </Link>
      </div>
      <div>
        <h1>Edit Sport News</h1>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Sport Name</label>
            <input
              name="sportName"
              type="text"
              id="sportName"
              value={sportName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">
              Date {moment(date).format('DD / MM / YYYY')}
            </label>

            <input
              name="date"
              type="date"
              id="date"
              value={date || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              name="time"
              type="text"
              id="time"
              value={time || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label htmlFor="details">Sport Details</label>
        <textarea
          name="details"
          type="text"
          id="details"
          value={details || ''}
          onChange={handleInputChange}
        />
        <input type="submit" className="btn" value={'Update News'} />
      </form>

      {/* {imagePreview ? (
        <img src={imagePreview} height={100} width={180} />
      ) : (
        <div>
          <p>No Image Found!</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModel(true)} className="btn-edit">
          Update Image
        </button>
      </div> */}
      <Modal show={showModel} onClose={() => setShowModel(false)}>
        <ImageUpload
          sportNewsId={sId}
          setImagePreview={setImagePreview}
          setShowModel={setShowModel}
          imageUploaded={imageUploaded}
        />
      </Modal>
    </Layout>
  );
}
