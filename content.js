const siteContent = {
  // Experience data is now a property of the main object
  experience: [
      {
          id: 'consulting',
          period: '10/2015 - Present',
          title: 'Technology Content Specialist | Editor',
          company: 'Jerry James (Consulting)',
          location: 'Bangalore, India',
          responsibilities: ['Founded a consulting firm for clients in the tech and finance industries.', 'Specialized in PC Hardware, B2B/B2C Networking, Cybersecurity, and Cloud Computing.'],
          achievements: [{ icon: '🏆', text: 'Created over <b>1,000+</b> compelling content pieces.' }],
          coords: { x: 85, y: 50 }
      },
      {
          id: 'msi',
          period: '05/2018 - Present',
          title: 'Freelance Technical Content Developer | Consultant',
          company: 'MSI (Micro-Star Int\'l)',
          location: 'Remote',
          responsibilities: ['Translate technical specs into effective marketing materials.', 'Strategize content marketing for new product launches.', 'Develop a distinct brand voice for MSI\'s business product lineup.'],
          achievements: [{ icon: '🌐', text: 'Managed content for <b>50+</b> landing pages with <b>50M+</b> views.' }, { icon: '✍️', text: 'Authored <b>100+</b> and edited <b>400+</b> content pieces.' }],
          coords: { x: 65, y: 20 }
      },
      {
          id: 'cgdirector',
          period: '07/2019 - 06/2025',
          title: 'Head of PC Hardware | Technical Editor',
          company: 'CGDirector',
          location: 'New Delhi, India',
          responsibilities: ['Oversaw the hardware section, including content strategy and quality control.', 'Managed and edited work from a team of writers to ensure quality standards.'],
          achievements: [{ icon: '📈', text: 'Edited and published over <b>200+</b> technical articles.' }],
          coords: { x: 75, y: 80 }
      },
      {
          id: 'webdev',
          period: '07/2014 - 08/2015',
          title: 'Freelance Web Developer',
          company: 'Self-Employed',
          location: 'New Delhi Area, India',
          responsibilities: ['Provided freelance web development, focusing on design changes, maintenance, and bug fixing.'],
          achievements: [{ icon: '🚀', text: 'Handled creation and updates of <b>REST APIs</b> using Node.js.' }],
          coords: { x: 35, y: 50 }
      },
      {
          id: 'dota2',
          period: '10/2012 - 10/2015',
          title: 'Web Administrator',
          company: 'Dota2Traders',
          location: 'New Delhi, India',
          responsibilities: ['Managed website and community administration for a forum.', 'Collaborated with influencers and Esports players for publicity campaigns.'],
          achievements: [{ icon: '👥', text: 'Grew and managed a community forum of over <b>10,000+</b> members.' }],
          coords: { x: 10, y: 50 }
      }
  ],

  // Portfolio data
  portfolio: [
      {
          category: 'b2b',
          title: 'SaaS Platform Launch Strategy',
          description: 'Led the technical marketing strategy for a new SaaS platform, resulting in 300% increase in qualified leads and $2M ARR growth.',
          results: ['300% increase in qualified leads', '$2M ARR growth', '45% reduction in CAC'],
          tags: ['B2B', 'SaaS', 'Technical Marketing', 'Lead Generation']
      },
      {
          category: 'b2c',
          title: 'Consumer Electronics Campaign',
          description: 'Developed and executed an integrated B2C campaign for consumer electronics brand, achieving 150% ROI.',
          results: ['150% ROI', '2.5M+ impressions', '25% increase in brand awareness'],
          tags: ['B2C', 'Consumer Electronics', 'Integrated Campaign', 'Brand Awareness']
      },
      {
          category: 'content',
          title: 'Technical White Paper Series',
          description: 'Created a series of technical white papers for cybersecurity company, generating 1000+ qualified leads.',
          results: ['1000+ qualified leads', '40% conversion rate', 'Industry thought leadership'],
          tags: ['Technical Writing', 'White Papers', 'Cybersecurity', 'Lead Generation']
      },
      {
          category: 'b2b',
          title: 'Marketing Automation Implementation',
          description: 'Implemented comprehensive marketing automation system for manufacturing company, improving lead nurturing by 85%.',
          results: ['85% improvement in lead nurturing', '60% time savings', '35% increase in sales-ready leads'],
          tags: ['Marketing Automation', 'B2B', 'Lead Nurturing', 'Manufacturing']
      }
  ],

  // Skills data
  skills: [
    {
        category: 'Technical Marketing',
        tags: ['Technical Writing', 'White Paper Creation', 'API Documentation', 'Product Marketing', 'Technical SEO', 'Marketing Automation']
    },
    {
        category: 'B2B Marketing',
        tags: ['Demand Generation', 'Account-Based Marketing', 'Lead Nurturing', 'Sales Enablement', 'B2B Content Strategy', 'Marketing Qualified Leads']
    },
    {
        category: 'B2C Marketing',
        tags: ['Consumer Behavior Analysis', 'Brand Storytelling', 'Social Media Marketing', 'Customer Journey Mapping', 'Conversion Optimization', 'Performance Marketing']
    },
    // MODIFIED THIS OBJECT
    {
        category: 'Tools & Platforms',
        type: 'pane', // Using 'pane' to identify this new layout
        tags: [ // Now a single array of tags
            'HubSpot', 'Salesforce', 'Google Analytics', 'Marketo',
            'Pardot', 'Mailchimp', 'Hootsuite', 'Figma',
            'WordPress', 'Webflow'
        ]
    }
],
  
  // Services data
  services: [
      {
          icon: '📝',
          title: 'Technical Content Creation',
          description: 'White papers, case studies, technical documentation, and thought leadership content that simplifies complex topics.'
      },
      {
          icon: '🎯',
          title: 'B2B Marketing Strategy',
          description: 'Comprehensive B2B marketing strategies including demand generation, ABM, and lead nurturing campaigns.'
      },
      {
          icon: '🚀',
          title: 'B2C Campaign Development',
          description: 'Consumer-focused marketing campaigns that drive engagement, awareness, and conversions across digital channels.'
      },
      {
          icon: '⚡',
          title: 'Marketing Automation',
          description: 'Implementation and optimization of marketing automation workflows to nurture leads and improve ROI.'
      },
      {
          icon: '📊',
          title: 'Content Marketing',
          description: 'Strategic content planning, creation, and distribution across multiple channels to build brand authority.'
      },
      {
          icon: '📈',
          title: 'Performance Analytics',
          description: 'Data analysis and reporting to measure campaign effectiveness and optimize marketing performance.'
      }
  ], 
  testimonials: [
      {
          name: 'Alex Glawion',
          title: 'CEO and Founder',
          company: 'CG Director',
          quote: 'Jerry is an exceptional technical writer, editor, and content marketer. He\'s been instrumental in our traffic growth from a few thousands to over 2M a month within 18 months!',
          image: 'https://i.pravatar.cc/100?u=john-doe'
      },
      {
          name: 'Jane Smith',
          title: 'Marketing Director',
          company: 'Innovate Corp.',
          quote: 'Working with Jerry was a game-changer. His strategic insights and execution on our B2B campaigns were instrumental in us exceeding our quarterly targets.',
          image: 'https://i.pravatar.cc/100?u=jane-smith'
      },
      {
          name: 'Sam Wilson',
          title: 'Product Manager',
          company: 'Gadget Masters',
          quote: 'The B2C campaign Jerry developed was a resounding success. He has a deep understanding of the consumer mindset and how to engage them effectively.',
          image: 'https://i.pravatar.cc/100?u=sam-wilson'
      },
      {
          name: 'Emily White',
          title: 'Head of Content',
          company: 'Redlegg',
          quote: 'The series of white papers Jerry created for us not only generated a significant number of qualified leads but also positioned us as thought leaders in the cybersecurity space.',
          image: 'https://i.pravatar.cc/100?u=emily-white'
      },
      {
          name: 'Michael Brown',
          title: 'Founder',
          company: 'SaaSify',
          quote: 'Jerry\'s expertise in technical marketing was crucial for our SaaS platform launch. He is a true professional and a pleasure to work with.',
          image: 'https://i.pravatar.cc/100?u=michael-brown'
      },
      {
          name: 'Sarah Green',
          title: 'CMO',
          company: 'Data Dynamics',
          quote: 'We saw an 85% improvement in our lead nurturing process after Jerry implemented and optimized our marketing automation workflows. Highly recommended.',
          image: 'https://i.pravatar.cc/100?u=sarah-green'
      },
      {
          name: 'David Lee',
          title: 'Brand Manager',
          company: 'Quantum Electronics',
          quote: 'The integrated B2C campaign for our new product line achieved a 150% ROI, far exceeding our expectations. Jerry\'s data-driven approach was key.',
          image: 'https://i.pravatar.cc/100?u=david-lee'
      },
      {
          name: 'Laura Chen',
          title: 'VP of Engineering',
          company: 'CloudNet',
          quote: 'Jerry\'s ability to create clear and concise API documentation was a huge asset to our development team and our partners.',
          image: 'https://i.pravatar.cc/100?u=laura-chen'
      },
      {
          name: 'Chris Taylor',
          title: 'Operations Manager',
          company: 'Global Manufacturing',
          quote: 'The marketing automation system Jerry put in place saved us countless hours and significantly increased our sales-ready leads.',
          image: 'https://i.pravatar.cc/100?u=chris-taylor'
      }
  ]
};