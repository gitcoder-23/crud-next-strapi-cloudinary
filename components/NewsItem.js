import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/NewsItem.module.css';
import moment from 'moment';
import { API_URL } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function NewsItem({ news, id, getSports }) {
  const router = useRouter();
  const deleteNews = () => {
    if (window.confirm('Do you want to delete?')) {
      axios
        .delete(`${API_URL}/api/sports/${id}?populate=*`)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.statusText === 'OK') {
            toast.success('Delete success');
            getSports();
            router.push('/news');
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Delete error');
        });
    }
  };

  return (
    <div className={styles.news}>
      <div className={styles.img}>
        <img
          src={
            news.image && news?.image?.data?.attributes?.url
              ? news.image.data.attributes?.url
              : '/images/most-popular-sport-illustration-free-vector.jpeg'
          }
          alt=""
          width={150}
          height={100}
        />
        {/* <Image
          src={news.image ? news.image.data.attributes.url : 'No Image'}
          width={150}
          height={100}
        /> */}
      </div>
      <div className={styles.info}>
        <span>
          {/* {moment(news.date).format('DD-MM-YYYY')} {news.time} */}
          {moment(news.date).format('LLLL')}
        </span>
        <h3>{news.name}</h3>
      </div>{' '}
      <div className={styles.link}>
        <Link href={`/news/${id}`} className="link-css">
          <span className="btn">Read</span>
        </Link>{' '}
        <Link href={`/news/edit/${id}`} className="link-css">
          <span className="btn">Edit</span>
        </Link>{' '}
        <button onClick={deleteNews} className="link-css">
          <span className="btn">Delete</span>
        </button>
      </div>
      <style>{customCss}</style>
    </div>
  );
}

const customCss = `
.link-css {
  background: #f28a09;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
`;
