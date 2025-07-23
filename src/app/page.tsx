'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Star, Play } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: '🏗️',
      title: 'AI Floor Plans',
      description: 'Generate professional layouts in seconds'
    },
    {
      icon: '🛒',
      title: 'Smart Shopping',
      description: 'Compare prices from top UK suppliers'
    },
    {
      icon: '👷',
      title: 'Verified Trades',
      description: 'Connect with rated professionals'
    },
    {
      icon: '📋',
      title: 'Project Management',
      description: 'Track progress from start to finish'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Self-Builder, Manchester',
      content: 'Saved me £15k on materials and found an amazing builder. Game-changer for first-time builders!',
      rating: 5
    },
    {
      name: 'James Mitchell',
      role: 'Property Developer, Birmingham',
      content: 'The AI floor plans are incredible. What used to take weeks now takes minutes.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Announcement Bar */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
              <Sparkles className="h-4 w-4 mr-2" />
              Now serving 10,000+ UK builders
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Smarter with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-2">
                AI-Powered Precision
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The UK's most comprehensive building platform. Generate AI floor plans, 
              source materials, find verified tradespeople, and manage your entire project 
              in one intelligent platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/start" 
                className="btn-primary text-lg flex items-center justify-center group"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary text-lg flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                UK building regulations
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Verified professionals
              </div>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-gray-600 font-medium">Interactive Demo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to completion, BuildMate AI streamlines every aspect of your building project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to your dream build
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Design with AI',
                description: 'Tell us your requirements and budget. Our AI generates professional floor plans optimized for UK regulations.',
                color: 'blue'
              },
              {
                step: '02',
                title: 'Source Materials',
                description: 'Browse materials from Travis Perkins, Wickes, B&Q and more. Everything goes into one smart shopping cart.',
                color: 'purple'
              },
              {
                step: '03',
                title: 'Build & Track',
                description: 'Connect with verified professionals and track your project progress with our intelligent dashboard.',
                color: 'green'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="card">
                  <div className={`w-12 h-12 bg-${item.color}-100 text-${item.color}-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by UK Builders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who've built smarter with BuildMate AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-blue-100 text-xl mb-8 leading-relaxed">
            Join over 10,000 UK builders who've saved time and money with BuildMate AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/start" 
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg group"
            >
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/professionals" 
              className="inline-flex items-center bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Find Professionals
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}