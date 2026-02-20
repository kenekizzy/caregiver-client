import ServicesView from "@/features/services/ServicesView"
import Header from "@/components/general/Header"
import Footer from "@/components/general/Footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ServicesView />
      </main>
      <Footer />
    </div>
  )
}