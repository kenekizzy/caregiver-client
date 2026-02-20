import HowItWorksView from "@/features/how-it-works/HowItWorksView"
import Header from "@/components/general/Header"
import Footer from "@/components/general/Footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HowItWorksView />
      </main>
      <Footer />
    </div>
  )
}