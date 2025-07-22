// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Companies', href: '#companies' },
    { name: 'News & Media', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/ecana-logo.png"
              alt="Ecana Group Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`font-medium transition-colors duration-300 hover:text-red-600 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}
              ></span>
              <span
                className={`h-0.5 w-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}
              ></span>
              <span
                className={`h-0.5 w-full transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                } ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-gray-800 font-medium hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Video Hero Background Component
const VideoHeroBackground = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/images/placeholder/large/img.png" // Fallback poster image
        >
          {/* You can add multiple video sources for browser compatibility */}
          <source src="/videos/video1.mp4" type="video/mp4" />

          {/* Fallback for browsers that don't support video */}
          <img
            src="/images/placeholder/large/img.png"
            alt="Ecana Group Hero Background"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ecana Group – Building Nigeria&lsquo;s Future,
            <span className="block text-red-800 bg-gray-300 bg-opacity-15">
              {' '}
              Empowering Africa&lsquo;s Tomorrow
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 font-light max-w-4xl mx-auto leading-relaxed">
            Committed to improving lives and transforming Africa by investing in
            critical sectors that matter most.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Discover Our Impact
            </button>
            <button
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById('about')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* TV Commercial Play Button Overlay */}
      {/*     {showPlayButton && (
        <div className="absolute bottom-8 left-8 z-30">
          <div className="bg-black bg-opacity-70 rounded-lg p-4 max-w-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPlayButton(false)}
                className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                ▶
              </button>
              <div className="text-white">
                <p className="text-sm font-medium">WATCH OUR</p>
                <p className="text-sm font-bold">TELEVISION COMMERCIAL</p>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Video loading indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-5">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Ecana Group
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Ecana Group is a leading diversified conglomerate based in Abuja,
              Nigeria, with a strong presence in the construction, real estate,
              and energy sectors. Since our founding over a decade ago, we have
              been dedicated to driving progress and empowering communities
              through innovative solutions and sustainable practices.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {' '}
              Since our inception in Abuja over a decade ago, Ecana Group has
              been at the forefront of Nigeria&#39;s development. What began as
              a regional distributor of cement and granite has evolved into a
              diversified leader in construction, real estate, and energy
              sectors
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Learn More About Us
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/image.jpg"
              alt="About Ecana Group"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent opacity-20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Companies Component
const PortfolioSection = () => {
  const companies = [
    {
      name: 'Ecana Family',
      sector: 'Cement Distribution',
      description:
        'Partnering with Dangote, BUA, and Lafarge to supply high-quality cement across West Africa.',
      logo: '/images/ecana-logo.png',
    },
    {
      name: 'Ecana Energy',
      sector: 'Oil & Gas',
      description:
        'Collaborating with Dangote Refinery on downstream and midstream projects to fuel Africa’s growth.',
      logo: '/images/ecana-logo.png',
    },
    {
      name: 'Ecana Heritage',
      sector: 'Real Estate & Building Materials',
      description:
        'Delivering landmark residential and commercial projects, backed by premium materials distribution.',
      logo: '/images/ecana-logo.png',
    },
  ];

  return (
    <section id="companies" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Business Pillars
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three core divisions driving Ecana Group’s mission to build, power,
            and sustain communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 mb-4 object-contain"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                {company.name}
              </h3>
              <span className="inline-block bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full mb-3">
                {company.sector}
              </span>
              <p className="text-gray-600 leading-relaxed">
                {company.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Section Component
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Watch Our Story
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how we are investing in Africa&#39;s future and
            transforming lives across the continent.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/images/placeholder/large/img.png"
              alt="Video Thumbnail"
              className="w-full aspect-video object-cover"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-red-600 hover:bg-red-700 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110"
                >
                  ▶
                </button>
              </div>
            )}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold mb-1">
                WATCH OUR TELEVISION COMMERCIAL
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// News Section Component
const NewsSection = () => {
  const news = [
    {
      title: 'Ecana Energy Signs MoU with Dangote Refinery',
      date: 'March 10, 2025',
      excerpt:
        'A landmark partnership to expand downstream capacity and fuel regional growth.',
      image: '/images/ecana-logo.png',
    },
    {
      title: 'Ecana Family Hits 10-Year Milestone',
      date: 'January 5, 2025',
      excerpt:
        'Celebrating a decade of reliable cement distribution across Nigeria and beyond.',
      image: '/images/ecana-logo.png',
    },
    {
      title: 'Ecana Heritage Launches Signature Abuja Development',
      date: 'December 20, 2024',
      excerpt:
        'A mixed-use community redefining luxury and sustainability in the capital.',
      image: '/images/ecana-logo.png',
    },
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest News
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest announcements, investments, and impact
            stories from across Africa.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <time className="text-sm text-red-600 font-medium">
                  {article.date}
                </time>
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2 group-hover:text-red-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <button className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We welcome inquiries from partners, clients, and talent worldwide.
              Let’s build tomorrow together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-950 text-white p-3 rounded-lg">📍</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Headquarters
                  </h3>
                  <p className="text-gray-600">
                    Plot 1567 chibuzor G chinyere Crescent Guzape
                    <br />
                    Abuja, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-950 text-white p-3 rounded-lg">📞</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+2348092612656</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-950 text-white p-3 rounded-lg">✉️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@ecanagroup.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a message
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = {
    Company: [
      'About Us',
      'Our Leadership',
      'Governance',
      'Investor Relations',
      'Careers',
    ],
    Pillars: ['Ecana Family', 'Ecana Energy', 'Ecana Heritage'],
    Resources: [
      'News & Media',
      'ESG Reports',
      'Financial Reports',
      'Press Releases',
      'Publications',
    ],
    Legal: [
      'Privacy Policy',
      'Terms of Use',
      'Cookie Policy',
      'Compliance',
      'Whistleblowing',
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <img
              src="/images/ecana-logo.png"
              alt="Ecana Group"
              className="h-12 mb-6"
            />
            <p className="text-gray-300 leading-relaxed">
              Ecana Group—headquartered in Abuja with a global outlook—builds
              communities through cement distribution, real estate development,
              and oil & gas partnerships.
            </p>
            {/* <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>📘
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>💼
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>📸
              </a>
            </div> */}
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 Ecana Group. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 lg:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  return (
    <>
      <Head>
        <title>
          Ecana Group - Leading Family-owned African Investment Company
        </title>
        <meta
          name="description"
          content="Ecana Group is committed to improving lives and transforming Africa through strategic investments in critical sectors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans">
        <Header />
        <VideoHeroBackground />
        <AboutSection />
        <PortfolioSection />
        <NewsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
