import { useState } from 'react'

const driverList = [
  "Gytis Romaško",
  "Edvardas Čiupailo",
  "Erikas Michnevič",
  "Robert Subotkevič",
  "Artūras Petrikas",
  "Aleksandr Makutunovič"
]

export default function App() {
  const [driver, setDriver] = useState("")
  const [mileage, setMileage] = useState("")
  const [oilLevel, setOilLevel] = useState("3")
  const [comments, setComments] = useState("")
  const [photo, setPhoto] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append("driver", driver)
    formData.append("date", today)
    formData.append("mileage", mileage)
    formData.append("oilLevel", oilLevel)
    formData.append("comments", comments)
    if (photo) formData.append("photo", photo)

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyt_T8pEXjkPDIK61t0MnRG4Tq4F00QcOUvD9mWEvY/dev", {
        method: "POST",
        body: formData
      })
      alert("Duomenys išsiųsti!")
      setDriver("")
      setMileage("")
      setOilLevel("3")
      setComments("")
      setPhoto(null)
    } catch {
      alert("Klaida siunčiant duomenis.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Vairuotojo forma</h2>
      <label>Vairuotojas:</label>
      <select value={driver} onChange={(e) => setDriver(e.target.value)} required>
        <option value="">Pasirinkti...</option>
        {driverList.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <br />
      <label>Data:</label>
      <input type="text" value={today} readOnly />
      <br />
      <label>Rida pradžioje:</label>
      <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
      <br />
      <label>Tepalų lygis (1–5):</label>
      <input type="number" min="1" max="5" value={oilLevel} onChange={(e) => setOilLevel(e.target.value)} required />
      <br />
      <label>Komentarai / nesklandumai:</label>
      <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      <br />
      <label>Nuotrauka (nebūtina):</label>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <br />
      <button type="submit" disabled={submitting}>{submitting ? "Siunčiama..." : "Pateikti"}</button>
    </form>
  )
}
