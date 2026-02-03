import React from 'react';
import {
  Eye, Heart, Users, Clock, Phone, MapPin, Award, Shield,
  Scan, Activity, Scissors, Gauge, Glasses, Monitor,
  Baby, Focus, EyeOff, Droplets, AlertCircle, DollarSign
} from 'lucide-react';
import Image from 'next/image';
import About from "../../../assets/about/about.jpeg"
import Director from "../../../assets/about/Director.jpg"
import CEO from "../../../assets/about/CEO.jpg"
import ExecutiveDirector from "../../../assets/about/executive_director.png"

export default function EyeHospital() {
  const services = [
    {
      title: "Comprehensive Eye Check-up",
      description: "Complete eye examination with advanced diagnostic tools, vision testing, and health assessment",
      icon: Eye,
    },
    {
      title: "Diabetic Retina Screening",
      description: "Advanced retinal imaging and screening for early detection of diabetic eye diseases",
      icon: Scan,
    },
    {
      title: "Cataract Surgery",
      description: "Modern phacoemulsification surgery using state-of-the-art technology for safe and quick recovery",
      icon: Scissors,
    },
    {
      title: "Glaucoma Diagnosis & Treatment",
      description: "Comprehensive glaucoma management with advanced pressure monitoring and treatment options",
      icon: Gauge,
    },
    {
      title: "Accurate Spectacle Power Testing",
      description: "Precise refraction testing and prescription glasses fitting for optimal vision correction",
      icon: Glasses,
    },
    {
      title: "Digital Eye Examination",
      description: "Cutting-edge digital imaging and diagnostic technology for accurate eye health evaluation",
      icon: Monitor,
    },
    {
      title: "Specialized Pediatric Eye Care",
      description: "Child-friendly comprehensive eye care services with specialized pediatric ophthalmologists",
      icon: Baby,
    },
    {
      title: "Cornea, Retina & Optic Nerve Evaluation",
      description: "Advanced diagnostic services for detailed assessment of critical eye structures",
      icon: Focus,
    },
    {
      title: "Low Vision Care",
      description: "Rehabilitation services and assistive devices for patients with low vision",
      icon: EyeOff,
    },
    {
      title: "Dry Eye Treatment",
      description: "Comprehensive dry eye therapy including advanced treatments and lifestyle management",
      icon: Droplets,
    },
    {
      title: "24/7 Emergency Eye Services",
      description: "Round-the-clock emergency care for urgent eye conditions and injuries",
      icon: AlertCircle,
    },
    {
      title: "Affordable Treatment Packages",
      description: "Cost-effective treatment plans ensuring quality eye care accessible to everyone",
      icon: DollarSign,
    },
  ];

  const benefits = [
    "Children learn faster and more effectively",
    "Working professionals become more productive",
    "Elderly people remain independent",
    "The risk of accidents is reduced",
    "Families and communities stay safe and secure",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12 md:mt-14">
      <div className="w-full h-24 md:h-auto">
        <Image
          src={About}
          alt="Dhamrai Drisiti Kalyan Eye Hospital apparel — shirts and polos"
          className="w-full h-full shadow-sm object-fill"
        />
      </div>
      {/* Hero Banner */}
      {/* <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1551601651-bc60f254d532?w=1200&q=80"
          alt="Eye Hospital"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
          <div className="text-center px-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Eye className="w-6 h-6" />
              <span className="text-lg font-semibold">Founded January 1, 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Dhamrai Drishti Kalyan<br />Eye Hospital
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-8">
              Restoring Vision, Transforming Lives
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#services" className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg">
                Our Services
              </a>
              <a href="#contact" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto">
        {/* Mission Statement */}
        <section className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold mb-8 border border-primary/20">
                <Heart className="w-4 h-4" />
                OUR MISSION
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                A Beacon of Hope in Eye Care
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Founded in the historic heart of Rathkhola, Dhamrai, our hospital is more than just a medical facility—it is a beacon of hope. Guided by the mission of building a healthy society through the gift of sight, we are committed to delivering world-class eye care to our community.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe that a healthy society begins with clear vision. Located just on the outskirts of Dhaka, we bridge the gap between advanced medical technology and compassionate community service.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md border border-gray-100">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-gray-900">World-Class Care</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md border border-gray-100">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-gray-900">Community Focus</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-teal-100 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-100 rounded-3xl -z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                alt="Eye Care"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-primary px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-md border border-primary/20">
              <Shield className="w-4 h-4" />
              COMPREHENSIVE CARE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Our Advanced Eye Care Services
            </h2>
            <p className="text-xl text-primary font-semibold mb-2">
              Dhamrai Dristi Kalyan Eye Hospital
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Experience world-class eye care with cutting-edge technology and compassionate specialists
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-lg p-8 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <IconComponent className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center uppercase tracking-wide">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 border-2 border-primary/20 p-8 md:p-12 rounded-3xl text-center max-w-5xl mx-auto shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6 shadow-lg">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium mb-4">
              For us, every patient is not just a case—they are a valuable member of our society, and protecting their vision is our responsibility.
            </p>
            <div className="flex items-center justify-center gap-3 text-primary font-semibold">
              <div className="w-12 h-0.5 bg-primary"></div>
              <span className="text-sm uppercase tracking-wider">Our Commitment</span>
              <div className="w-12 h-0.5 bg-primary"></div>
            </div>
          </div>
        </section>

        {/* Visionaries Section */}
        <section className="py-8 md:py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            The Visionaries Behind the Mission
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Driven by compassion and commitment to serve the community
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Chairman */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={Director}
                  alt="Nahar Akter Doly - Chairman"
                  fill
                  className="object-fill"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nahar Akter Doly
                </h3>
                <p className="text-primary font-semibold text-lg mb-3">Chairman</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  This institution is the realization of her heartfelt dream. Her deep compassion for people suffering from vision loss became the spark that gave birth to Dhamrai Drishti Kalyan Eye Hospital.
                </p>
              </div>
            </div>

            {/* Managing Director */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={CEO}
                  alt="Mohammad Mosharrof Hossain - Managing Director & CEO"
                  fill
                  className="object-fill"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mohammad Mosharrof Hossain
                </h3>
                <p className="text-primary font-semibold text-lg mb-3">
                  Managing Director & CEO
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  The driving force behind the hospital's growth and excellence. He transformed a noble vision into a state-of-the-art eye care institution, ensuring quality, efficiency, and compassion in every service.
                </p>
              </div>
            </div>

            {/* Executive Director */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={ExecutiveDirector}
                  alt="Alhaz Md. Ali Azam Khan - Executive Director"
                  fill
                  className="object-fill"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Alhaz Md. Ali Azam Khan
                </h3>
                <p className="text-primary font-semibold text-lg mb-1">
                  Executive Director
                </p>
                <p className="text-primary font-semibold text-sm mb-3">
                  Dhamrai Dristi Kalyan Eye Hospital
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Senior Teacher, Sharifbag Afaz Uddin School and College, Dhamrai
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inspirational Quote */}
        <section className="py-8 md:py-12">
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center max-w-5xl mx-auto shadow-lg">
            <div className="text-6xl text-primary mb-6">"</div>
            <p className="text-2xl md:text-3xl italic leading-relaxed text-gray-800 mb-6">
              Eyes are the windows to the soul and the light of life. At Dhamrai Drishti Kalyan Eye Hospital, we work tirelessly to ensure that this light never fades for anyone in our community.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
        </section>

        {/* Development Message */}
        <section className="py-8 md:py-12 bg-primary rounded-3xl shadow-xl  px-4 sm:mx-0 sm:px-12">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Vision Is the Light of Development
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              A society that protects the eyesight of its people builds a future that is visionary, productive, and secure.
            </p>
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed">
              Let us work together to build a healthy, prosperous, and enlightened Bangladesh through the power of clear vision.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8 md:py-12">
          <div className="bg-primary text-white rounded-3xl p-12 md:p-16 text-center shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">24/7 Emergency Services Available</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Dhamrai Dristi Kalyan Eye Hospital
            </h3>
            <p className="text-xl mb-12">
              Your vision, our priority. Contact us anytime for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a
                href="tel:01922228733"
                className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-2xl hover:bg-gray-100 transition-all shadow-lg"
              >
                <Phone className="w-7 h-7" />
                01922-228733
              </a>
              <a
                href="tel:01568364872"
                className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-2xl hover:bg-gray-100 transition-all shadow-lg"
              >
                <Phone className="w-7 h-7" />
                01568-364872
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Rathkhola, Dhamrai, Dhaka</span>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}