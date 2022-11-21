/* eslint-disable react/jsx-key */
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
  const [dummy, setDummy] = useState([]);
  const [dummyData, setDummyData] = useState('');
  const [message, setMessage] = useState();
  const [fbUserPosts, setFbUserPosts] = useState([]);
  const [fbPages, setFbPages] = useState([]);
  const getSports = () => {
    axios
      .get(`${API_URL}/api/sports?_sort=date:ASC&_limit=5&populate=*`)
      .then((res) => {
        // console.log(res);
        setNews(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const getDummyApi = () => {
    axios
      .get(`${API_URL}/api/dummy-apis`)
      .then((resDummy) => {
        // console.log('resDummy=>', resDummy);
        if (resDummy?.status === 200) {
          setDummy(resDummy?.data?.data);
          resDummy?.data?.data?.map((data) => {
            setDummyData(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log('dummyData->', dummyData?.attributes?.dummyApiUrl);

  let userId = 101518762798077;
  let pagePostId = 102013339414404;

  const fbPerspnalPostUrl =
    'https://graph.facebook.com/v15.0/101518762798077/posts?fields=id,name,message,full_picture&access_token=EAASb31atdiABALJBt0PcpdH15mtZCxw2XkjQGUu8EdgqL6CW0ZAI2v1ls9ZCdIC129DOrPai3lrkYb1ZAgX3z6sKkaZBqPfKPoZAcdzZBeyru7XzRQ5FMBPNf6rMsCYcImudci29vKFSfMEps6kM8rKitvYkL79F1qUcHby5oZBxhUKu9DcIZBZBBG7ZAFCZAVDLZBm16x2aKtRo9SqtrSCihDrbWershkv3UQbAZD';

  const pagesPostFb =
    'https://graph.facebook.com/v15.0/102013339414404/feed?fields=created_time,from,id,picture,message_tags,message&access_token=EAASb31atdiABAH1qBErchF9Y7lVM7qdVYJLCr28t7ZB71Wxqja136YbJuZB8dFBf4u4z9BmDbI1ax0HLFGz1RSlfIOZASqYNMoG78GtmH0sCvY1ZBbfygAET4fuylslf6XQ7WjzBRFSAupqUhUWJq3LfB4hiBti1ZCA6RkHSNTL5BfG5KyfA0nTZC6S6mEDkanf5DElAGZA8QrvCgkkRFox';

  const getFaceBookPostPersonal = () => {
    axios
      .get(fbPerspnalPostUrl)
      .then((fbData) => {
        if (fbData?.status) {
          console.log('fbData->', fbData);
          setFbUserPosts(fbData?.data?.data);
        } else {
          setMessage('No Fb Post Found!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFaceBookPages = () => {
    axios
      .get(pagesPostFb)
      .then((fbPData) => {
        if (fbPData?.status) {
          console.log('fbPData->', fbPData);
          setFbPages(fbPData?.data?.data);
        } else {
          setMessage('No Fb Post Found!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFaceBookPostPersonal();
    getFaceBookPages();

    return () => {};
  }, []);

  useEffect(() => {
    getSports();
    getDummyApi();

    setTimeout(() => {
      if (dummyData && dummyData?.attributes) {
        axios
          .get(`${dummyData?.attributes?.dummyApiUrl}`)
          .then((res) => {
            // console.log('res-->', res);
          })
          .catch((errApi) => console.log(errApi));
      }
    }, 500);
  }, [dummyData?.attributes?.dummyApiUrl]);

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
        <h1>Facebook User Personal Posts</h1>
        <br />
        {message && <h2>{message}</h2>}
        {fbUserPosts &&
          fbUserPosts?.map((data) => (
            <table>
              <tbody>
                <td>
                  <img src={data?.full_picture} alt={data?.message} />
                </td>
                <td>
                  <h2>{data?.message}</h2>
                </td>
              </tbody>
            </table>
          ))}
        <h1>Facebook User Pages Posts</h1> <br />
        {fbPages &&
          fbPages?.map((data) => (
            <table>
              <tbody>
                <td>
                  {data?.picture ? (
                    <img src={data?.picture} alt={data?.message} />
                  ) : (
                    <p>No Picture Found </p>
                  )}
                </td>
                <td>
                  <h2>{data?.message ? data?.message : 'No Message'}</h2>
                </td>
              </tbody>
            </table>
          ))}
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
