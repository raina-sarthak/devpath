export interface Technology {
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  resources?: string[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: Technology[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export const tracks: Track[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern web development with a focus on user interfaces and client-side applications',
    icon: '🎨',
    difficulty: 'Beginner',
    estimatedTime: '6-8 months',
    technologies: [
      {
        name: 'HTML5 & CSS3',
        description: 'Core web technologies for structure and styling',
        level: 'Beginner',
        resources: ['MDN Web Docs', 'W3Schools']
      },
      {
        name: 'JavaScript (ES6+)',
        description: 'Modern JavaScript programming and DOM manipulation',
        level: 'Intermediate',
        resources: ['JavaScript.info', 'Eloquent JavaScript']
      },
      {
        name: 'React',
        description: 'Popular library for building user interfaces',
        level: 'Intermediate',
        resources: ['React Docs', 'React for Beginners']
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Build robust server-side applications and APIs',
    icon: '⚙️',
    difficulty: 'Intermediate',
    estimatedTime: '8-10 months',
    prerequisites: ['Basic programming concepts'],
    technologies: [
      {
        name: 'Node.js',
        description: 'JavaScript runtime for server-side development',
        level: 'Intermediate',
        resources: ['Node.js Docs', 'Node.js Design Patterns']
      },
      {
        name: 'Python',
        description: 'Versatile programming language for backend development',
        level: 'Beginner',
        resources: ['Python.org', 'Real Python']
      },
      {
        name: 'Databases',
        description: 'SQL and NoSQL database management',
        level: 'Intermediate',
        resources: ['MongoDB University', 'PostgreSQL Tutorial']
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become proficient in both frontend and backend technologies',
    icon: '🔄',
    difficulty: 'Advanced',
    estimatedTime: '12-14 months',
    prerequisites: ['Basic web development knowledge'],
    technologies: [
      {
        name: 'MERN Stack',
        description: 'MongoDB, Express.js, React, Node.js',
        level: 'Advanced',
        resources: ['MERN.js', 'Full Stack Open']
      },
      {
        name: 'DevOps Basics',
        description: 'Deployment, CI/CD, and cloud services',
        level: 'Intermediate',
        resources: ['AWS Tutorials', 'Docker Docs']
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Create native and cross-platform mobile applications',
    icon: '📱',
    difficulty: 'Intermediate',
    estimatedTime: '8-10 months',
    technologies: [
      {
        name: 'React Native',
        description: 'Cross-platform mobile development with React',
        level: 'Intermediate',
        resources: ['React Native Docs', 'React Native Express']
      },
      {
        name: 'Swift',
        description: 'Native iOS development',
        level: 'Advanced',
        resources: ['Swift.org', 'Hacking with Swift']
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Master the tools and practices for modern software deployment',
    icon: '🔧',
    difficulty: 'Advanced',
    estimatedTime: '10-12 months',
    prerequisites: ['Linux basics', 'Networking fundamentals'],
    technologies: [
      {
        name: 'Docker & Kubernetes',
        description: 'Container orchestration and management',
        level: 'Advanced',
        resources: ['Kubernetes Docs', 'Docker Labs']
      },
      {
        name: 'CI/CD',
        description: 'Continuous Integration and Deployment',
        level: 'Intermediate',
        resources: ['Jenkins Tutorials', 'GitHub Actions']
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Build and manage applications in the cloud',
    icon: '☁️',
    difficulty: 'Advanced',
    estimatedTime: '8-10 months',
    technologies: [
      {
        name: 'AWS',
        description: 'Amazon Web Services fundamentals',
        level: 'Advanced',
        resources: ['AWS Training', 'A Cloud Guru']
      },
      {
        name: 'Azure',
        description: 'Microsoft Azure cloud platform',
        level: 'Advanced',
        resources: ['Azure Docs', 'Microsoft Learn']
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Develop intelligent applications using AI and ML',
    icon: '🤖',
    difficulty: 'Advanced',
    estimatedTime: '12-14 months',
    prerequisites: ['Python', 'Statistics', 'Linear Algebra'],
    technologies: [
      {
        name: 'TensorFlow',
        description: 'Machine learning framework',
        level: 'Advanced',
        resources: ['TensorFlow Docs', 'Deep Learning Book']
      },
      {
        name: 'PyTorch',
        description: 'Deep learning framework',
        level: 'Advanced',
        resources: ['PyTorch Tutorials', 'Fast.ai']
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Learn to protect systems and networks from threats',
    icon: '🔒',
    difficulty: 'Advanced',
    estimatedTime: '10-12 months',
    prerequisites: ['Networking', 'Operating Systems'],
    technologies: [
      {
        name: 'Network Security',
        description: 'Secure network infrastructure',
        level: 'Advanced',
        resources: ['CompTIA Security+', 'Cybrary']
      },
      {
        name: 'Ethical Hacking',
        description: 'Penetration testing and security auditing',
        level: 'Advanced',
        resources: ['HackTheBox', 'OWASP']
      }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Build decentralized applications and smart contracts',
    icon: '⛓️',
    difficulty: 'Advanced',
    estimatedTime: '8-10 months',
    prerequisites: ['JavaScript', 'Cryptography basics'],
    technologies: [
      {
        name: 'Ethereum',
        description: 'Smart contract development',
        level: 'Advanced',
        resources: ['Ethereum.org', 'CryptoZombies']
      },
      {
        name: 'Solidity',
        description: 'Smart contract programming language',
        level: 'Advanced',
        resources: ['Solidity Docs', 'OpenZeppelin']
      }
    ]
  },
  {
    id: 'game-dev',
    title: 'Game Development',
    description: 'Create engaging games for multiple platforms',
    icon: '🎮',
    difficulty: 'Intermediate',
    estimatedTime: '10-12 months',
    prerequisites: ['Programming basics', '3D Mathematics'],
    technologies: [
      {
        name: 'Unity',
        description: 'Cross-platform game engine',
        level: 'Intermediate',
        resources: ['Unity Learn', 'Unity Documentation']
      },
      {
        name: 'Unreal Engine',
        description: 'Advanced game engine',
        level: 'Advanced',
        resources: ['Unreal Docs', 'Unreal Online Learning']
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Analyze and interpret complex data sets',
    icon: '📊',
    difficulty: 'Advanced',
    estimatedTime: '10-12 months',
    prerequisites: ['Statistics', 'Python', 'SQL'],
    technologies: [
      {
        name: 'Python Data Stack',
        description: 'NumPy, Pandas, Matplotlib',
        level: 'Intermediate',
        resources: ['Python Data Science Handbook', 'Kaggle']
      },
      {
        name: 'Machine Learning',
        description: 'Scikit-learn, Statistical Learning',
        level: 'Advanced',
        resources: ['Stanford ML Course', 'Fast.ai']
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Design beautiful and functional user interfaces',
    icon: '🎨',
    difficulty: 'Intermediate',
    estimatedTime: '6-8 months',
    technologies: [
      {
        name: 'Design Tools',
        description: 'Figma, Adobe XD, Sketch',
        level: 'Intermediate',
        resources: ['Figma Tutorials', 'Design+Code']
      },
      {
        name: 'Design Systems',
        description: 'Component libraries and design patterns',
        level: 'Advanced',
        resources: ['Material Design', 'Human Interface Guidelines']
      }
    ]
  }
]; 