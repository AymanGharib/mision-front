"use client"

import { useState } from "react"
import "./globals.css"

const MissionGenerator = () => {
  const [prompt, setPrompt] = useState("react, 4000 dh")
  const [isLoading, setIsLoading] = useState(false)
  const [missionData, setMissionData] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    workMode: "REMOTE",
    startImmediately: false,
    duration: "",
    durationType: "MONTH",
    dailyRate: "",
    contractType: "",
    domain: "",
    targetRole: "",
    experience: "",
    skills: "",
  })

  const handleGenerateMission = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5205/api/Mission/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate mission")
      }

      const data = await response.json()
      setMissionData({
        title: data.title || "",
        description: data.description || "",
        country: data.country || "",
        city: data.city || "",
        workMode: data.workMode || "REMOTE",
        startImmediately: data.startImmediately || false,
        duration: data.duration?.toString() || "",
        durationType: data.durationType || "MONTH",
        dailyRate: data.estimatedDailyRate?.toString() || "",
        contractType: data.contractType || "",
        domain: data.domain || "",
        targetRole: data.position || "",
        experience: data.experienceYear || "",
        skills: (data.requiredExpertises || []).join(", "),
      })
    } catch (error) {
      console.error("Error generating mission:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setMissionData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-2xl font-bold text-white transform -skew-x-12">V</div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Générateur de Mission</h1>
              <p className="text-sm text-gray-500">Créez des missions personnalisées facilement</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prompt Input Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Prompt de génération</h2>
            <p className="text-sm text-gray-600 mt-1">Décrivez votre mission en quelques mots</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Ex: développeur React, 4000€, télétravail..."
                />
              </div>
              <button
                onClick={handleGenerateMission}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[140px] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Génération...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Générer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mission Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Détails de la mission</h2>
            <p className="text-sm text-gray-600 mt-1">Personnalisez les informations générées</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="text-base font-medium text-gray-900">Informations de base</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la mission</label>
                  <input
                    type="text"
                    value={missionData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Ex: Développeur React Senior"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={missionData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                    placeholder="Décrivez les objectifs et responsabilités de la mission..."
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Location & Work Mode */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="text-base font-medium text-gray-900">Localisation & Mode de travail</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                  <input
                    type="text"
                    value={missionData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="France"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                  <input
                    type="text"
                    value={missionData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mode de travail</label>
                  <select
                    value={missionData.workMode}
                    onChange={(e) => handleInputChange("workMode", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  >
                    <option value="REMOTE">🏠 Télétravail</option>
                    <option value="ONSITE">🏢 Sur site</option>
                    <option value="HYBRID">🔄 Hybride</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Job Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <h3 className="text-base font-medium text-gray-900">Profil recherché</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Domaine d'intervention</label>
                  <input
                    type="text"
                    value={missionData.domain}
                    onChange={(e) => handleInputChange("domain", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Développement web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fonction visée</label>
                  <input
                    type="text"
                    value={missionData.targetRole}
                    onChange={(e) => handleInputChange("targetRole", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Développeur Frontend"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expérience requise</label>
                  <input
                    type="text"
                    value={missionData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="5 ans"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expertises requises</label>
                  <input
                    type="text"
                    value={missionData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contract Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <h3 className="text-base font-medium text-gray-900">Détails du contrat</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée estimée</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={missionData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="6"
                    />
                    <select
                      value={missionData.durationType}
                      onChange={(e) => handleInputChange("durationType", e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white min-w-[100px]"
                    >
                      <option value="WEEK">Semaines</option>
                      <option value="MONTH">Mois</option>
                      <option value="YEAR">Années</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                  <select
                    value={missionData.contractType}
                    onChange={(e) => handleInputChange("contractType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="FORFAIT">💼 Forfait</option>
                    <option value="REGIE">⏰ Régie</option>
                    <option value="FREELANCE">🚀 Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TJM estimé (€)</label>
                  <input
                    type="text"
                    value={missionData.dailyRate}
                    onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="500"
                  />
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="startImmediately"
                    checked={missionData.startImmediately}
                    onChange={(e) => handleInputChange("startImmediately", e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="startImmediately" className="text-sm font-medium text-gray-700 cursor-pointer">
                    ⚡ Démarrage immédiat
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
                Annuler
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sauvegarder la mission
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MissionGenerator
