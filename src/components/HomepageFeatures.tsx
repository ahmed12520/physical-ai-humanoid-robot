// src/components/HomepageFeatures.tsx (FINAL FIX & UI UPGRADE)

import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import { JSX } from 'react';
import Link from '@docusaurus/Link';

// GIF imports (Yakeen karein ki yeh files static/img/ folder mein hain)
import DigitalBrainGif from '@site/static/img/digitalization.gif'; // DRL Icon
import EyeGif from '@site/static/img/eye.gif'; // VLA Icon
import CubeGif from '@site/static/img/3d-cube.gif'; // Isaac Sim Icon

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Deep Reinforcement Learning (DRL)',
    image: DigitalBrainGif,
    // CRASH FIX: Link ko temporarily /docs/intro par set kiya gaya hai.
    // Isse crash ruk jayega. Aap baad mein isko sahi chapter link se replace kar sakte hain.
    link: '/docs/intro', 
    description: (
      <>Learn how humanoids acquire locomotion and complex skills using advanced DRL policies.</>
    ),
  },
  {
    title: 'Vision-Language-Action (VLA) Pipeline',
    image: EyeGif,
    link: '/docs/module-4-vla-capstone/4.4-vla-pipeline', 
    description: (
      <>Explore how LLMs, perception, and action combine for cognitive robotic planning.</>
    ),
  },
  {
    title: 'NVIDIA Isaac Sim Deployment',
    image: CubeGif,
    link: '/docs/module-3-nvidia-isaac/3.4-sim-to-real', 
    description: (
      <>Master training, Sim-to-Real transfer, and deployment using NVIDIA Isaac Sim.</>
    ),
  },
];

function Feature({ title, image, description, link }: FeatureItem) {
  return (
    // 'col col--4' ke saath 'card-wrapper' class add ki, agar spacing issue ho
    <div className={clsx('col col--4', styles.featureWrapper)}>
      {/* 1. Link is the container */}
      <Link to={link} className={styles.cardLink}>
        {/* 2. featureCard class for local styling, card-glow for neon effect */}
        <div className={clsx(styles.featureCard, 'card-glow')}> 
          <div className="text--center">
            <img
              src={image}
              alt={title}
              className={styles.featureImage}
            />
          </div>
          <div className="text--center padding-vert--md padding-horiz--md">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}