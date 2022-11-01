import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import NewsItem from '@/components/NewsItem';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const getSports = () => {
    axios
      .get(`${API_URL}/api/sports?_sort=date:ASC&_limit=5&populate=*`)
      .then((res) => {
        // console.log(res);
        setNews(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <div>
      <Layout>
        <h1>Latest News</h1>
        {news?.length === 0 && <h3>No News</h3>}
        {news?.map((item) => (
          <NewsItem
            getSports={getSports}
            key={item.id}
            id={item.id}
            news={item?.attributes}
          />
        ))}
        {news?.length > 0 && (
          <Link href="/news" className="link-css">
            <span className="btn-secondary">View All News</span>
          </Link>
        )}
      </Layout>
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/news`);
//   const news = await res.json();

//   return {
//     props: { news },
//   };
// }

// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/api/news`);
//   const news = await res.json();

//   return {
//     props: { news: news.slice(0, 5) },
//     revalidate: 1,
//   };
// }

// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/sport?_sort=date:ASC&_limit=5`);
//   console.log('res->', res);
//   const news = await res.json();

//   return {
//     props: { news },
//     revalidate: 1,
//   };
// }