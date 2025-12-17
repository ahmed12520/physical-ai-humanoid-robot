// src/pages/index.tsx

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css'; // For local CSS modules
import HomepageFeatures from '../components/HomepageFeatures'; // Hum yeh component banayenge
import { JSX } from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary hero-banner', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Reading the Book 🚀
          </Link>
        </div>
        {/* Robot Image with subtle animation */}
        <img src="img/humanoid-robot1.png" alt="Humanoid Robot" className={styles.heroRobot} />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Home`} // Title for the browser tab
      description="Explore Deep Reinforcement Learning, Vision-Language-Action, and Isaac Sim for Humanoid Robotics.">
      <HomepageHeader />
      <main>
        <HomepageFeatures /> {/* This component will display key features */}
      </main>
    </Layout>
  );
}