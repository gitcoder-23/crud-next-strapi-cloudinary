import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>Sport News</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/news">
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link href="/news/add">
              <span>Add New News</span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
