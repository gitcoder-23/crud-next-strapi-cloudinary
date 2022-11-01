import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/config/index';
import styles from '@/styles/News.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function SingleNews({ news }) {
  const router = useRouter();
  // console.log('router===>', router);
  const [singleNews, setSingleNews] = useState({});
  // if use slug then problem
  const getSingleSport = () => {
    axios
      .get(`${API_URL}/api/sports/${router?.query?.id}?populate=*`)
      .then((res) => {
        console.log('singleNews->', res);
        setSingleNews(res?.data?.data?.attributes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSingleSport();
  }, [router?.query?.id]);
  return (
    <Layout>
      <div className={styles.news}>
        <span>
          {moment(singleNews.date).format('LLLL')}
          {/* {singleNews.time} */}
        </span>

        <h1>{singleNews.name}</h1>
        {singleNews.image && (
          <div className={styles.image}>
            <img
              src={
                singleNews.image && singleNews?.image?.data?.attributes?.url
                  ? singleNews.image.data.attributes?.url
                  : '/images/most-popular-sport-illustration-free-vector.jpeg'
              }
              width={900}
              height={600}
            />
          </div>
        )}
        <p>{singleNews.details}</p>
        <Link href="/news" className="link-css">
          <span className={styles.back}>Go Back</span>
        </Link>
      </div>
      <style>{customCss}</style>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/sports?_sort=date:ASC&_limit=5`);
//   const news = await res.json();
//   const paths = news?.map((item) => ({
//     params: { slug: item.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/sports?slug=${slug}`);
//   console.log('res->>>>', res);

//   return {
//     props: {
//       news: singleNews[0],
//     },
//     revalidate: 1,
//   };
// }

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/news/${slug}`);
//   const singleNews = await res.json();
//   return {
//     props: {
//       news: singleNews[0],
//     },
//   };
// }

const customCss = `
.link-css {
  background: #f28a09;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
`;
