"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function MissionGenerator() {
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
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <div className="text-2xl font-bold text-white transform -skew-x-12">V</div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Générer la mission</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Prompt Input Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prompt de génération</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Entrez votre prompt ici..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleGenerateMission} disabled={isLoading} className="min-w-[120px]">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  "Générer"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mission Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Détails de la mission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Informations de base</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="title">Titre de la mission</Label>
                    <Input
                      id="title"
                      value={missionData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={missionData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={6}
                      className="mt-1 resize-y"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location & Work Mode */}
              <div>
                <h3 className="text-lg font-medium mb-4">Localisation & Mode de travail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      value={missionData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={missionData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="workMode">Mode de travail</Label>
                    <Select
                      value={missionData.workMode}
                      onValueChange={(value) => handleInputChange("workMode", value)}
                    >
                      <SelectTrigger id="workMode" className="mt-1">
                        <SelectValue placeholder="Sélectionner un mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="REMOTE">REMOTE</SelectItem>
                        <SelectItem value="ONSITE">ONSITE</SelectItem>
                        <SelectItem value="HYBRID">HYBRID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Job Requirements */}
              <div>
                <h3 className="text-lg font-medium mb-4">Profil recherché</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="domain">Domaine d'intervention</Label>
                    <Input
                      id="domain"
                      value={missionData.domain}
                      onChange={(e) => handleInputChange("domain", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetRole">Fonction visée</Label>
                    <Input
                      id="targetRole"
                      value={missionData.targetRole}
                      onChange={(e) => handleInputChange("targetRole", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Expérience requise</Label>
                    <Input
                      id="experience"
                      value={missionData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <Label htmlFor="skills">Expertises requises</Label>
                    <Input
                      id="skills"
                      value={missionData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      className="mt-1"
                      placeholder="Séparez les expertises par des virgules"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contract Details */}
              <div>
                <h3 className="text-lg font-medium mb-4">Détails du contrat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="duration">Durée estimée</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="duration"
                        value={missionData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="flex-1"
                      />
                      <Select
                        value={missionData.durationType}
                        onValueChange={(value) => handleInputChange("durationType", value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WEEK">WEEK</SelectItem>
                          <SelectItem value="MONTH">MONTH</SelectItem>
                          <SelectItem value="YEAR">YEAR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contractType">Type de contrat</Label>
                    <Select
                      value={missionData.contractType}
                      onValueChange={(value) => handleInputChange("contractType", value)}
                    >
                      <SelectTrigger id="contractType" className="mt-1">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FORFAIT">FORFAIT</SelectItem>
                        <SelectItem value="REGIE">REGIE</SelectItem>
                        <SelectItem value="FREELANCE">FREELANCE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dailyRate">TJM estimé (€)</Label>
                    <Input
                      id="dailyRate"
                      value={missionData.dailyRate}
                      onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="startImmediately"
                      checked={missionData.startImmediately}
                      onCheckedChange={(checked) => handleInputChange("startImmediately", checked)}
                    />
                    <Label htmlFor="startImmediately">Démarrage immédiat</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline">Annuler</Button>
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Sauvegarder la mission
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
