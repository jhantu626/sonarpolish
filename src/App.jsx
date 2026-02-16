import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Heart,
  Facebook,
  MessageCircle,
} from "lucide-react";
import Lenis from "lenis";

// --- Components ---

// Button Component
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-pink-400 to-pink-200 text-white hover:shadow-pink-300/50",
    secondary: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-100",
    outline: "border-2 border-pink-400 text-pink-500 hover:bg-pink-50",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = "", hoverEffect = true, ...props }) => {
  return (
    <div
      className={`bg-white rounded-3xl p-6 transition-all duration-500 ${hoverEffect ? "hover:-translate-y-2 hover:shadow-xl" : ""} shadow-sm border border-gray-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Section Title
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16 space-y-4">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

// --- Data ---

const galleryImages = [
  // Bridal Category (7 images)
  {
    url: "/images/bride.jpg",
    category: "Bridal",
    alt: "Exquisite bridal nail art with intricate white patterns and stones for Indian weddings in Kolkata",
  },
  {
    url: "/images/bride2.jpg",
    category: "Bridal",
    alt: "Traditional Red and Gold bridal nail art perfect for Bengali brides in Kolkata",
  },
  {
    url: "/images/bride3.jpg",
    category: "Bridal",
    alt: "Elegant white and gold bridal nail art for modern wedding ceremonies",
  },
  {
    url: "/images/bride4.jpg",
    category: "Bridal",
    alt: "Detailed stone work and 3D floral bridal nail art by Rimi Dey",
  },
  {
    url: "/images/bride5.jpg",
    category: "Bridal",
    alt: "Royal bridal nail extensions with intricate detailing and glossy finish",
  },
  {
    url: "/images/bride6.jpg",
    category: "Bridal",
    alt: "Modern minimalist bridal nails with subtle shimmer and accents",
  },
  {
    url: "/images/bride7.jpg",
    category: "Bridal",
    alt: "Luxury bridal nail art set for premium wedding functions in Kolkata",
  },

  // Abstract Category (6 images)
  {
    url: "/images/abstract1.jpg",
    category: "Abstract",
    alt: "Unique abstract nail art with vibrant hand-painted geometric designs by Rimi Dey",
  },
  {
    url: "/images/abstract2.jpg",
    category: "Abstract",
    alt: "Modern marble abstract nail art with gold leaf accents",
  },
  {
    url: "/images/abstract3.jpg",
    category: "Abstract",
    alt: "Artistic abstract nail designs with custom patterns and textures",
  },
  {
    url: "/images/abstract4.jpg",
    category: "Abstract",
    alt: "Creative fluid art inspired nail designs for a bold look",
  },
  {
    url: "/images/abstract5.jpg",
    category: "Abstract",
    alt: "Contemporary abstract nail patterns with mixed color palettes",
  },
  {
    url: "/images/abstract7.jpg",
    category: "Abstract",
    alt: "Sophisticated abstract nail art with elegant line work and shapes",
  },

  // Glitter Category (8 images)
  {
    url: "/images/glitter1.jpg",
    category: "Glitter",
    alt: "Sparkling rose gold glitter gel nail extensions with premium glossy finish",
  },
  {
    url: "/images/glitter2.jpg",
    category: "Glitter",
    alt: "Luxury silver ombre glitter nails with custom gel polish application",
  },
  {
    url: "/images/glitter3.jpg",
    category: "Glitter",
    alt: "Electric blue glitter nail extensions for high-fashion events",
  },
  {
    url: "/images/glitter4.jpg",
    category: "Glitter",
    alt: "Multi-colored sparkling glitter nails for a festive celebration",
  },
  {
    url: "/images/glitter5.jpg",
    category: "Glitter",
    alt: "Deep emerald green glitter nail art with high-shine top coat",
  },
  {
    url: "/images/glitter6.jpg",
    category: "Glitter",
    alt: "Chunky holographic glitter nail extensions by Rimi Dey",
  },
  {
    url: "/images/glitter7.jpg",
    category: "Glitter",
    alt: "Champagne gold glitter gradient for a classy and subtle sparkle",
  },
  {
    url: "/images/glitter8.jpg",
    category: "Glitter",
    alt: "Midnight black glitter nails with premium gel finish",
  },

  // Minimal Category (6 images)
  {
    url: "/images/minimal1.jpg",
    category: "Minimal",
    alt: "Elegant minimal French tip nail art for a clean and professional look",
  },
  {
    url: "/images/minimal2.jpg",
    category: "Minimal",
    alt: "Nude base minimal line art nails - trending style in Kolkata nail studios",
  },
  {
    url: "/images/minimal3.jpg",
    category: "Minimal",
    alt: "Clean minimal nail design with single dot accent for daily wear",
  },
  {
    url: "/images/minimal4.jpg",
    category: "Minimal",
    alt: "Soft pastel minimal nails for a refreshing and simple aesthetic",
  },
  {
    url: "/images/minimal5.jpg",
    category: "Minimal",
    alt: "Matte black minimal nails with subtle glossy stripes",
  },
  {
    url: "/images/minimal6.jpg",
    category: "Minimal",
    alt: "Sheer pink minimal nails for a natural and healthy nail look",
  },
];

// --- Main Application ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filtered images based on active filter
  const filteredImages = galleryImages.filter(
    (img) => activeFilter === "All" || img.category === activeFilter,
  );

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      {/* --- Header / Navbar --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent"
          >
            Sonal Polish
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-pink-500 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button
              size="sm"
              className="px-6 py-2"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-pink-500 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="p-6 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium text-gray-700 py-2 border-b border-gray-100 hover:text-pink-500 transition-all duration-300 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
            <Button
              className={`w-full mt-4 transition-all duration-300 ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen
                  ? `${navLinks.length * 50}ms`
                  : "0ms",
              }}
              onClick={() => {
                setIsMenuOpen(false);
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 relative overflow-hidden"
      >
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4 animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/4 animate-pulse duration-[8s]" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
              Kolkata's Elite
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                Studio & Home
              </span>
              <br />
              Nail Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Experience premium nail art, gel extensions & bespoke designs at
              my private Kolkata studio or in the comfort of your own home. I,
              Rimi Dey, bring salon excellence wherever you prefer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Your Session
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  document
                    .getElementById("gallery")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Art Gallery
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-8 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-800">500+</p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Stunning Transformations
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">5.0</p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Rated Excellence
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right-8 duration-700 fade-in delay-200 hidden md:block">
            {/* Floating Cards Composition */}
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 to-blue-50 rounded-[3rem] transform rotate-3 scale-95 opacity-50" />
              <img
                src="./images/bannerimage.jpg"
                alt="Premium Nail Art Kolkata - Professional Studio and Home Service"
                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Premium Quality</p>
                    <p className="text-xs text-gray-500">Certified Artist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-white/50">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Professional Nail Art — My Studio or Your Doorstep"
            subtitle="Whether you visit my private Kolkata studio or prefer an at-home session, I ensure every design is a masterpiece."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Gel & Acrylic Extensions",
                desc: "I provide long-lasting gel and acrylic nail extensions at your home in Kolkata. Lightweight, durable, and flawless results every time.",
                color: "from-pink-500 to-pink-400",
              },
              {
                title: "Custom Hand-Painted Art",
                desc: "Trending hand-painted nail designs — French tips, ombré, marble, chrome, and intricate 3D flowers crafted personally by me.",
                color: "from-blue-400 to-blue-300",
              },
              {
                title: "Bridal Nail Packages",
                desc: "Stunning bridal nail designs for your big day — mehendi-inspired, glitter, and stone work customized to your bridal theme.",
                color: "from-purple-400 to-purple-300",
              },
              {
                title: "Chrome & Holo Effects",
                desc: "Get the latest mirror-finish chrome or holographic effects. I use only premium pigments for that extra shine.",
                color: "from-green-400 to-green-300",
              },
              {
                title: "3D Nail Embellishments",
                desc: "Exquisite 3D nail art using stones, charms, and embossed designs for special occasions and parties.",
                color: "from-yellow-400 to-yellow-300",
              },
              {
                url: "/images/abstract4.jpg", // This was actually a text field in the previous map, fixing logic
                title: "Poly-Gel Extensions",
                desc: "The perfect middle ground between gel and acrylic. Strong yet flexible extensions done at the convenience of your location.",
                color: "from-red-400 to-red-300",
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="group relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-bl-[100px] opacity-10 group-hover:opacity-20 transition-opacity`}
                />

                <div className="relative z-10 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-sm font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:tracking-wider transition-all cursor-pointer">
                  Learn More{" "}
                  <ChevronRight size={16} className="ml-1 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Nail Art Gallery — Our Latest Work"
            subtitle="Browse real nail art designs by Rimi Dey. From minimalist to bridal — every style, beautifully crafted."
          />

          {/* Functional Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Bridal", "Abstract", "Glitter", "Minimal"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          <div className="columns-1 md:columns-3 gap-8 space-y-8 min-h-[400px]">
            {filteredImages.map((img, idx) => (
              <div
                key={`${activeFilter}-${idx}`}
                className="break-inside-avoid relative group rounded-3xl overflow-hidden cursor-pointer animate-in fade-in zoom-in duration-500"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-white font-bold text-lg tracking-widest border border-white px-6 py-2 rounded-full backdrop-blur-sm mb-3">
                    VIEW
                  </span>
                  <p className="text-white text-xs font-medium uppercase tracking-tighter opacity-80 decoration-pink-400">
                    {img.category} Style
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-[80px] opacity-60" />

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="order-2 md:order-1 space-y-6">
                <div className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-bold tracking-wider mb-2">
                  CERTIFIED NAIL ARTIST — KOLKATA
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900">
                  About Rimi Dey — Your Nail Expert
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  I am Rimi Dey, a dedicated professional nail artist in Kolkata
                  specializing in gel extensions, acrylic nails, and high-end
                  bridal art. You can choose the convenience of my **doorstep
                  service** or visit my **private studio** for a dedicated
                  pampering experience. With my commitment to 100% hygiene and
                  premium products, I transform your nails into stunning works
                  of art, tailored to your style.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  {[
                    { label: "Professional Experience", value: "4+ Years" },
                    { label: "Nail Art Certifications", value: "Advanced" },
                    { label: "Doorstep Service", value: "All Kolkata" },
                    { label: "Nail Products Used", value: "100% Premium" },
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-4 border-pink-200 pl-4">
                      <p className="font-bold text-gray-900 text-xl">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 border-2 border-dashed border-pink-300 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/images/bride6.jpg"
                      alt="Rimi Dey - Certified Professional Nail Artist in Kolkata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="What My Clients Say"
            subtitle="I've helped 500+ clients in Kolkata achieve their dream nails. Here's what they think about my work."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                review:
                  "Best home nail service in Kolkata! Rimi did stunning gel extensions at my place. The designs were exactly what I wanted and the quality lasted 3+ weeks. Super convenient!",
                rating: 5,
              },
              {
                name: "Anjali M.",
                review:
                  "Booked Rimi for my bridal nail art and she absolutely nailed it! Beautiful stone work and glitter designs. My wedding nails were the highlight of my bridal look. Highly recommend her!",
                rating: 5,
              },
              {
                name: "Sneha K.",
                review:
                  "I was looking for a professional nail artist in Kolkata and found Rimi. She did stunning gel extensions at my place. The designs were exactly what I wanted!",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="text-center p-8">
                <div className="flex justify-center mb-4 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.review}"
                </p>
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-gray-500">
                  {testimonial.name.charAt(0)}
                </div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-xs text-gray-400">Verified Client</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact & Footer --- */}
      <section
        id="contact"
        className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[3rem] relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500 blur-[150px] opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">
                Book My <br />
                <span className="text-pink-400">Studio or Home Visit</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Ready for gorgeous nails? Schedule an appointment at my Kolkata
                studio or book a professional home session with me. I'm here to
                accommodate your style and schedule.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-400">
                    <MapPin />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      Location & Service Area
                    </p>
                    <p>Visit my Studio or request Home Service (All Kolkata)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-pink-400">
                    <Phone />
                  </div>
                  <div>
                    <p className="font-bold text-white">Phone</p>
                    <p>+91 8697666994</p>
                  </div>
                </div>

                <div className="flex mt-8 gap-4">
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-700 text-white hover:bg-white hover:text-gray-900"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/ourcozylife2025",
                        "_blank",
                      )
                    }
                  >
                    <Instagram size={20} /> Instagram
                  </Button>
                  <Button
                    className="rounded-full bg-green-500 hover:bg-green-600 text-white border-none shadow-green-900/50"
                    onClick={() =>
                      window.open(
                        "https://wa.me/918697666994?text=Hi, I would like to book an appointment for nail art",
                        "_blank",
                      )
                    }
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() =>
                  window.open(
                    "https://wa.me/918697666994?text=Hi, I would like to book an appointment for nail art",
                    "_blank",
                  )
                }
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <MessageCircle size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Chat on WhatsApp</h4>
                    <p className="text-gray-400">
                      Fastest way to book & ask questions
                    </p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </Card>

              <Card
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => window.open("tel:+918697666994")}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Phone size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Call Me Directly</h4>
                    <p className="text-gray-400">+91 8697666994</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group p-4"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/ourcozylife2025",
                      "_blank",
                    )
                  }
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                      <Instagram size={24} />
                    </div>
                    <span className="font-bold">Instagram</span>
                  </div>
                </Card>

                <Card
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group p-4"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/Ourcozylife2025",
                      "_blank",
                    )
                  }
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                      <Facebook size={24} />
                    </div>
                    <span className="font-bold">Facebook</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800 text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-1">
              Made with{" "}
              <Heart size={16} className="text-pink-500 fill-current" /> by{" "}
              <a
                href=""
                className="text-white hover:text-pink-400 transition-colors"
              >
                Pritam Bala
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* --- Lightbox --- */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          ></div>
          <div className="relative z-10 w-full max-w-5xl h-full flex flex-col justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors z-20"
            >
              <X size={32} />
            </button>

            <div className="relative flex items-center justify-center h-[80vh]">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all backdrop-blur-sm hover:scale-110 -translate-x-4 md:-translate-x-12"
              >
                <ChevronRight size={32} className="rotate-180" />
              </button>

              <img
                src={filteredImages[selectedImageIndex].url}
                alt={filteredImages[selectedImageIndex].alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300"
              />

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all backdrop-blur-sm hover:scale-110 translate-x-4 md:translate-x-12"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-bold">
                {filteredImages[selectedImageIndex].category}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {filteredImages[selectedImageIndex].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
