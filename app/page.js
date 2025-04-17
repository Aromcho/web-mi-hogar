"use client"

import "./page.css"
import { useState, useEffect } from "react"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import CategoryGrid from "../components/CategoryGrid/CategoryGrid"
import PropertyList from "../components/PropertyList/PropertyList"
import Footer from "../components/Footer/Footer"

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchType, setSearchType] = useState("Venta")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/properties/search?operation_type=Venta&property_type=Cochera&minPrice=10000&maxPrice=30000",
        )
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        setProperties(data.objects || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="home-container">
      <Header />

      <main>
        <Hero searchType={searchType} setSearchType={setSearchType} />

        <section className="categories-section">
          <CategoryGrid />
        </section>

        <section className="properties-section">
          <PropertyList properties={properties} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
