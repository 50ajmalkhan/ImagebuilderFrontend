import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Image, Video, Zap, Shield, Clock, Star, Check } from 'lucide-react';
import GenericHeader from '../components/common/GenericHeader';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Image className="h-6 w-6" />,
      title: t('landing.features.items.imageGeneration.title'),
      description: t('landing.features.items.imageGeneration.description')
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: t('landing.features.items.videoCreation.title'),
      description: t('landing.features.items.videoCreation.description')
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('landing.features.items.styles.title'),
      description: t('landing.features.items.styles.description')
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('landing.features.items.speed.title'),
      description: t('landing.features.items.speed.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('landing.features.items.security.title'),
      description: t('landing.features.items.security.description')
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('landing.features.items.availability.title'),
      description: t('landing.features.items.availability.description')
    }
  ];

  const testimonials = [
    {
      name: t('landing.testimonials.items.artist.name'),
      role: t('landing.testimonials.items.artist.role'),
      comment: t('landing.testimonials.items.artist.comment'),
      avatar: "/images/avatars/avatar-1.jpg"
    },
    {
      name: t('landing.testimonials.items.marketer.name'),
      role: t('landing.testimonials.items.marketer.role'),
      comment: t('landing.testimonials.items.marketer.comment'),
      avatar: "/images/avatars/avatar-2.jpg"
    },
    {
      name: t('landing.testimonials.items.creator.name'),
      role: t('landing.testimonials.items.creator.role'),
      comment: t('landing.testimonials.items.creator.comment'),
      avatar: "/images/avatars/avatar-3.jpg"
    }
  ];

  const pricingPlans = [
    {
      name: t('landing.pricing.plans.starter.name'),
      price: t('landing.pricing.plans.starter.price'),
      features: t('landing.pricing.plans.starter.features', { returnObjects: true }),
      cta: t('landing.pricing.plans.starter.cta'),
      popular: false
    },
    {
      name: t('landing.pricing.plans.pro.name'),
      price: t('landing.pricing.plans.pro.price'),
      features: t('landing.pricing.plans.pro.features', { returnObjects: true }),
      cta: t('landing.pricing.plans.pro.cta'),
      popular: true
    },
    {
      name: t('landing.pricing.plans.enterprise.name'),
      price: t('landing.pricing.plans.enterprise.price'),
      features: t('landing.pricing.plans.enterprise.features', { returnObjects: true }),
      cta: t('landing.pricing.plans.enterprise.cta'),
      popular: false
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#1a1f2e] to-[#252b3d]">
      <GenericHeader />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">{t('landing.hero.title.part1')}</span>
                  <span className="block text-indigo-400 mt-2">{t('landing.hero.title.part2')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('landing.hero.subtitle')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div 
                    className="rounded-md shadow"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      {t('landing.hero.cta.primary')}
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="mt-3 sm:mt-0 sm:ml-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-300 bg-[#252b3d] hover:bg-[#2d344a] md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      {t('landing.hero.cta.secondary')}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.div 
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-[#252b3d] p-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              <div className="space-y-6">
                <motion.div 
                  className="bg-[#1a1f2e] rounded-lg shadow-xl p-2 transform hover:scale-105 transition-transform duration-200 border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src="/images/landing/sample-1.png" 
                    alt="AI Art Sample 1"
                    className="rounded w-full h-36 object-cover"
                    loading="eager"
                  />
                </motion.div>
                <motion.div 
                  className="bg-[#1a1f2e] rounded-lg shadow-xl p-2 transform hover:scale-105 transition-transform duration-200 border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src="/images/landing/sample-2.png" 
                    alt="AI Art Sample 2"
                    className="rounded w-full h-36 object-cover"
                    loading="eager"
                  />
                </motion.div>
              </div>
              <div className="space-y-6 mt-12">
                <motion.div 
                  className="bg-[#1a1f2e] rounded-lg shadow-xl p-2 transform hover:scale-105 transition-transform duration-200 border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src="/images/landing/sample-3.png" 
                    alt="AI Art Sample 3"
                    className="rounded w-full h-36 object-cover"
                    loading="eager"
                  />
                </motion.div>
                <motion.div 
                  className="bg-[#1a1f2e] rounded-lg shadow-xl p-2 transform hover:scale-105 transition-transform duration-200 border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src="/images/landing/sample-4.png" 
                    alt="AI Art Sample 4"
                    className="rounded w-full h-36 object-cover"
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-b from-[#1e2335] to-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">
              {t('landing.features.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              {t('landing.features.subtitle')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
              {t('landing.features.description')}
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {t('landing.testimonials.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              {t('landing.testimonials.subtitle')}
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-[#252b3d] rounded-lg p-6 shadow-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">{testimonial.name}</h3>
                    <p className="text-indigo-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-gradient-to-b from-[#1e2335] to-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {t('landing.pricing.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              {t('landing.pricing.subtitle')}
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`bg-[#252b3d] rounded-lg p-8 shadow-lg border ${
                  plan.popular ? 'border-indigo-500' : 'border-gray-700'
                } relative`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white">
                      {t('landing.pricing.popular')}
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex justify-center">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-indigo-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      to="/signup"
                      className={`w-full inline-flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-base font-medium ${
                        plan.popular
                          ? 'text-white bg-indigo-500 hover:bg-indigo-600'
                          : 'text-indigo-300 bg-[#1a1f2e] hover:bg-[#252b3d]'
                      } transition-colors duration-200`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#252b3d] border-t border-gray-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="block">{t('landing.cta.title.part1')}</span>
            <span className="block">{t('landing.cta.title.part2')}</span>
          </motion.h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            {t('landing.cta.subtitle')}
          </p>
          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/signup"
              className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md text-white bg-indigo-500 hover:bg-indigo-600 sm:w-auto transition-colors duration-200"
            >
              {t('landing.cta.button')}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;