import React from 'react';
import { Link } from 'react-router-dom';

const NewUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white text-center">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Shape the Future,<br />Not Just Your Role
        </h1>
        <p className="text-xl text-gray-400">
          We don't just offer jobs. We craft meaningful journeys in AI
        </p>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Feature Card 1 */}
        <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-4xl mb-4">01</h2>
          <h3 className="text-2xl mb-4">Collaborate Across Industries</h3>
          <p className="text-gray-400 leading-relaxed">
            Build solutions for diverse sectors, with clients who are shaping tomorrow.
          </p>
        </div>
        
        {/* Feature Card 2 */}
        <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-4xl mb-4">02</h2>
          <h3 className="text-2xl mb-4">Learn Beyond Boundaries</h3>
          <p className="text-gray-400 leading-relaxed">
            Join a culture where people learn from each other and push boundaries together.
          </p>
        </div>
        
        {/* Feature Card 3 */}
        <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-4xl mb-4">03</h2>
          <h3 className="text-2xl mb-4">Mentorship with Depth</h3>
          <p className="text-gray-400 leading-relaxed">
            Get guided by experts who can helps you grow both as a thinker and a builder.
          </p>
        </div>
      </div>
      
      {/* Careers Section */}
      <div className="mt-16">
        <h2 className="text-4xl mb-8">Want to be a part of Datapixl?</h2>
        
        <div className="space-y-4">
          {/* Job Cards */}
          <Link 
            to="/careers/ai-engineer"
            className="flex items-center justify-between bg-white/5 p-6 rounded-lg text-white no-underline hover:bg-white/10 hover:translate-x-1 transition-all duration-300"
          >
            <span>AI Engineer</span>
            <span className="text-gray-500">Delhi</span>
            <span className="text-xl">→</span>
          </Link>
          
          <Link 
            to="/careers/data-scientist"
            className="flex items-center justify-between bg-white/5 p-6 rounded-lg text-white no-underline hover:bg-white/10 hover:translate-x-1 transition-all duration-300"
          >
            <span>Data Scientist</span>
            <span className="text-gray-500">Delhi</span>
            <span className="text-xl">→</span>
          </Link>
          
          <Link 
            to="/careers/researcher"
            className="flex items-center justify-between bg-white/5 p-6 rounded-lg text-white no-underline hover:bg-white/10 hover:translate-x-1 transition-all duration-300"
          >
            <span>Researcher</span>
            <span className="text-gray-500">Delhi</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
        
        <p className="mt-8">
          Want to apply for a different role?{' '}
          <a 
            href="mailto:careers@datapixl.com" 
            className="text-white underline hover:text-gray-200 transition-colors"
          >
            Email Us
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewUI;