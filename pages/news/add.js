import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '../styles/form.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function AddNews() {
  const router = useRouter();
  const [values, setValues] = useState({
    sportName: '',
    details: '',
    date: '',
    time: '',
  });

  const { sportName, details, date, time } = values;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ''
    );
    if (emptyFieldCheck) {
      toast.error('Please fill all the fields!');
    } else {
      const formData = {
        name: sportName,
        details: details,
        date: date,
        time: time,
      };
      // console.log('formData->', values);
      // always send value through data
      axios
        .post(`${API_URL}/api/sports`, { data: formData })
        .then((resPost) => {
          console.log('postRes->', resPost);
          toast.success('News added success');
          const getPost = resPost?.data?.data;
          router.push(`/news/${getPost?.id}`);
        })
        .catch((err) => {
          console.log('postErr->', err);
          toast.error('Something went wrong!');
        });
      // const response = await fetch(`${API_URL}/api/sports`, {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });
      // const response = await fetch('http://localhost:1337/api/sports/', {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Token ' + token,
      //   },
      //   body: JSON.stringify({ data: values }),
      // });
      // if (!response.ok) {
      //   toast.error('Something went wrong!');
      // } else {
      //   const sport = await response.json();
      //   console.log('sport->', sport);
      // }
    }
  };
  return (
    <Layout title={'Add New Sport News'}>
      <div style={{ marginBottom: 30 }}>
        <Link
          href={'/news'}
          style={{ background: 'orange', padding: 10, color: '#fff' }}
        >
          Go Back
        </Link>
      </div>
      <div>
        <h1>Add Sport News</h1>
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
            <label htmlFor="date">Date</label>
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
        <input type="submit" className="btn" value={'Add News'} />
      </form>
    </Layout>
  );
}
