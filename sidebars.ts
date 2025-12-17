// file: sidebars.ts (FINAL UPDATED VERSION)

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Default sidebar: 'tutorialSidebar'
  tutorialSidebar: [
    'intro', // Introduction/Welcome page

    // --- MODULE 1: The Robotic Nervous System (ROS 2) ---
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      collapsible: true,
      collapsed: false,
      items: [
        'module-1-ros2/1.1-intro-physical-ai',
        'module-1-ros2/1.2-ros2-core-concepts',
        'module-1-ros2/1.3-advanced-ros2',
        'module-1-ros2/1.4-urdf-robot-description',
      ],
    },

    // --- MODULE 2: The Digital Twin (Gazebo & Unity) ---
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      collapsible: true,
      collapsed: false,
      items: [
        'module-2-gazebo/2.1-simulation-setup',
        'module-2-gazebo/2.2-sensor-simulation',
      ],
    },

    // --- MODULE 3: NVIDIA Isaac and RL (NEW CHAPTERS ADDED) ---
    {
      type: 'category',
      label: 'Module 3: NVIDIA Isaac and RL',
      collapsible: true,
      collapsed: false, // Isko open rakhte hain for hackathon
      items: [
        'module-3-nvidia-isaac/3.1-isaac-sim-overview', 
        'module-3-nvidia-isaac/3.2-deep-rl-for-humanoids', 
        
        // --- NEW CONTENT ---
        'module-3-nvidia-isaac/3.3-drl-basics',        // <-- Naya Chapter: Core Concepts of DRL
        'module-3-nvidia-isaac/3.4-sim-to-real',       // <-- Naya Chapter: Sim-to-Real Transfer
      ],
    },

    // --- MODULE 4: VLA Capstone (NEW CHAPTERS ADDED) ---
    {
      type: 'category',
      label: 'Module 4: VLA Capstone',
      collapsible: true,
      collapsed: false, // Isko open rakhte hain for hackathon
      items: [
        // --- NEW CONTENT ---
        'module-4-vla-capstone/4.3-humanoid-intro',     // <-- Naya Chapter: Humanoid Architecture
        'module-4-vla-capstone/4.4-vla-pipeline',       // <-- Naya Chapter: VLA Pipeline
        
        'module-4-vla-capstone/4.1-conversational-robotics', 
        'module-4-vla-capstone/4.2-vla-cognitive-planning', 
      ],
    },

    // Optional: Spec-Kit ke default tutorials
    {
      type: 'category',
      label: 'Tutorial Basics (Spec-Kit)',
      collapsible: true,
      collapsed: true,
      items: [
        'tutorial-basics/congratulations',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial Extras (Spec-Kit)',
      collapsible: true,
      collapsed: true,
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

module.exports = sidebars;