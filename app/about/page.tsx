import AboutView from "@/features/about/AboutView"
import Header from "@/components/general/Header"
import Footer from "@/components/general/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutView />
      </main>
      <Footer />
    </div>
  )
}