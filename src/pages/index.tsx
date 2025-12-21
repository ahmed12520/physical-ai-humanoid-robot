import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import ChatBot from '../components/ChatBot';
import { JSX } from 'react';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroSection)}>
      <div className={clsx('container', styles.heroContainer)}>

        {/* Left Side */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

          <div className={styles.buttons}>
            <Link className={styles.heroButton} to="/docs/intro">
              Start Reading the Book 🚀
            </Link>
          </div>
        </div>

        {/* Right: Robot Image */}
        <div className={styles.heroRobotContainer}>
          <img
            src="img/humanoid-robot1.png"
            alt="Humanoid Robot"
            className={styles.heroRobot}
          />
        </div>

      </div>

      {/* Glow Orb Effect */}
      <div className={styles.glowOrb}></div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Explore Deep Reinforcement Learning, Vision-Language-Action, and Robotics with AI.">

      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>

      <ChatBot />
    </Layout>
  );
}
