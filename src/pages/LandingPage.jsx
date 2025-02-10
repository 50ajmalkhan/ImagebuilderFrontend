import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Wand2, Image, Video, Sparkles, ArrowRight, Zap, Shield, Download, Star, CreditCard } from 'lucide-react';
import Header from '../components/Layout/Header';

const LandingPage = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const steps = [
    {
      icon: <Image className="w-8 h-8" />,
      title: t('landing.howItWorks.steps.items.describe.title'),
      description: t('landing.howItWorks.steps.items.describe.description'),
      color: "from-blue-500/20 via-indigo-500/20 to-blue-600/20"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: t('landing.howItWorks.steps.items.generate.title'),
      description: t('landing.howItWorks.steps.items.generate.description'),
      color: "from-purple-500/20 via-pink-500/20 to-purple-600/20"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: t('landing.howItWorks.steps.items.video.title'),
      description: t('landing.howItWorks.steps.items.video.description'),
      color: "from-pink-500/20 via-rose-500/20 to-pink-600/20"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: t('landing.howItWorks.steps.items.download.title'),
      description: t('landing.howItWorks.steps.items.download.description'),
      color: "from-green-500/20 via-emerald-500/20 to-green-600/20"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t('landing.features.items.quality.title'),
      description: t('landing.features.items.quality.description')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('landing.features.items.speed.title'),
      description: t('landing.features.items.speed.description')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('landing.features.items.security.title'),
      description: t('landing.features.items.security.description')
    }
  ];

  const testimonials = [
    {
      name: t('landing.testimonials.items.sarah.name'),
      role: t('landing.testimonials.items.sarah.role'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      quote: t('landing.testimonials.items.sarah.quote')
    },
    {
      name: t('landing.testimonials.items.michael.name'),
      role: t('landing.testimonials.items.michael.role'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
      quote: t('landing.testimonials.items.michael.quote')
    },
    {
      name: t('landing.testimonials.items.emily.name'),
      role: t('landing.testimonials.items.emily.role'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      quote: t('landing.testimonials.items.emily.quote')
    }
  ];

  const plans = [
    {
      name: t('landing.pricing.plans.items.starter.name'),
      price: t('landing.pricing.plans.items.starter.price'),
      features: t('landing.pricing.plans.items.starter.features', { returnObjects: true }),
      getStarted: t('landing.pricing.plans.getStarted')
    },
    {
      name: t('landing.pricing.plans.items.professional.name'),
      price: t('landing.pricing.plans.items.professional.price'),
      features: t('landing.pricing.plans.items.professional.features', { returnObjects: true }),
      popular: t('landing.pricing.plans.items.professional.popular'),
      getStarted: t('landing.pricing.plans.getStarted')
    },
    {
      name: t('landing.pricing.plans.items.enterprise.name'),
      price: t('landing.pricing.plans.items.enterprise.price'),
      features: t('landing.pricing.plans.items.enterprise.features', { returnObjects: true }),
      getStarted: t('landing.pricing.plans.getStarted')
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative pt-20 pb-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto space-y-8"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {t('landing.hero.title.part1')}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                {t('landing.hero.title.part2')}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="group inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1"
              >
                {t('landing.hero.cta.primary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                {t('landing.hero.cta.secondary')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#1a1f2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-gradient-to-br ${step.color} backdrop-blur-lg`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              {t('landing.features.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              {t('landing.features.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-[#252b3d] border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-[#252b3d] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              {t('landing.showcase.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              {t('landing.pricing.plans.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              {t('landing.pricing.plans.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative p-8 rounded-2xl bg-[#252b3d] border ${
                  plan.popular ? 'border-indigo-500' : 'border-gray-700'
                } transition-all duration-300 transform hover:-translate-y-1`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium">
                      {plan.popular}
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="ml-2 text-gray-400">{t('landing.pricing.plans.perMonth')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Sparkles className="w-5 h-5 text-indigo-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {plan.getStarted}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {t('landing.cta.subtitle')}
          </p>
          <Link
            to="/signup"
            className="group inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            {t('landing.cta.button')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;