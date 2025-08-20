import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import FeaturedCampaigns from '../components/FeaturedCampaigns'
import CategoriesSection from '../components/CategoriesSection'
import StatsSection from '../components/StatsSection'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage(){
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      {/* Marquee strip below hero */}
      <section className="bg-white border-y border-gray-200">
        <div className="marquee">
          <div className="marquee-track text-brand-700 font-semibold">
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
            <span>•</span>
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
            <span>•</span>
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <HowItWorks />
      <FeaturedCampaigns />
      <CategoriesSection />
      <StatsSection />
      <Testimonials />
      <CTASection />
      <FAQ />
      <Footer />
    </div>
  )
}





