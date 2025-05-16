"use client"
import Hero from "@/components/Hero"
import ProcessSteps from "@/components/ProcessSteps"
import DashboardPreview from "@/components/DashboardPreview"
import LockedFeatures from "@/components/LockedFeatures"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-grow">
        <Hero />
        <ProcessSteps />
        <DashboardPreview />
        <LockedFeatures />
      </main>
      <Footer />
    </div>
  )
}

export default Index
