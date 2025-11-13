'use client'
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"

export default function SitemapList() {
  const [sitemaps, setSitemaps] = useState([])
  const router = useRouter()

  useEffect(() => {
    const GetAllSitemaps = async () => {
      const res = await axios.get("http://localhost:4000/api/sitemaps")

      setSitemaps(res.data)
    }
    GetAllSitemaps()
  }, [])

  const handleClick = (siteId) => {

    router.push(`/saved-sitemaps/${siteId}`)
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-3 text-lg">Saved Sitemaps</h2>
      {sitemaps.map((site) => (
        <div
          key={site.id}
          onClick={() => handleClick(site.id)}
          className="border p-3 rounded-md mb-3 hover:bg-gray-100 cursor-pointer transition"
        >
          <h3 className="font-semibold">{site.projectName}</h3>
          <p className="text-sm text-gray-500">{site.language}</p>
          <p className="text-xs text-gray-400">{new Date(site.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
