import React, { useState } from 'react';

import './globals.css';


const MissionGenerator = () => {
  const [prompt, setPrompt] = useState('react, 4000 dh');
  const [isLoading, setIsLoading] = useState(false);
  const [missionData, setMissionData] = useState({
    title: '',
    description: '',
    country: '',
    city: '',
    workMode: 'REMOTE',
    startImmediately: false,
    duration: '',
    durationType: 'MONTH',
    dailyRate: '',
    contractType: '',
    domain: '',
    targetRole: '',
    experience: '',
    skills: ''
  });

  const handleGenerateMission = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5205/api/Mission/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate mission');
      }

      const data = await response.json();
      setMissionData({
        title: data.title || '',
        description: data.description || '',
        country: data.country || '',
        city: data.city || '',
        workMode: data.workMode || 'REMOTE',
        startImmediately: data.startImmediately || false,
        duration: data.duration?.toString() || '',
        durationType: data.durationType || 'MONTH',
        dailyRate: data.estimatedDailyRate?.toString() || '',
        contractType: data.contractType || '',
        domain: data.domain || '',
        targetRole: data.position || '',
        experience: data.experienceYear || '',
        skills: (data.requiredExpertises || []).join(', ')
      });
    } catch (error) {
      console.error('Error generating mission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
            <div className="text-4xl font-bold text-black transform -skew-x-12">V</div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-800">Générer la mission</h1>
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="p-6">
        <label className="block text-black font-medium mb-2">Prompt</label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-400 text-sm rounded"
          />
          <button
            onClick={handleGenerateMission}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Génération...' : 'Générer'}
          </button>
        </div>
      </div>

      {/* Mission Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-8">Détails de la mission</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Title - Full width */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-black font-medium mb-1">Titre de la mission</label>
            <input
              type="text"
              value={missionData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description - Full width */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-black font-medium mb-1">Description</label>
            <textarea
              value={missionData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-black font-medium mb-1">Pays</label>
            <input
              type="text"
              value={missionData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-black font-medium mb-1">Ville</label>
            <input
              type="text"
              value={missionData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-black font-medium mb-1">Mode de travail</label>
            <select
              value={missionData.workMode}
              onChange={(e) => handleInputChange('workMode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="REMOTE">REMOTE</option>
              <option value="ONSITE">ONSITE</option>
              <option value="HYBRID">HYBRID</option>
            </select>
          </div>

          {/* Domain */}
          <div>
            <label className="block text-black font-medium mb-1">Domaine d'intervention</label>
            <input
              type="text"
              value={missionData.domain}
              onChange={(e) => handleInputChange('domain', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Target Role */}
          <div>
            <label className="block text-black font-medium mb-1">Fonction visée</label>
            <input
              type="text"
              value={missionData.targetRole}
              onChange={(e) => handleInputChange('targetRole', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-black font-medium mb-1">Expérience requise</label>
            <input
              type="text"
              value={missionData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills - Spans 2 columns on medium screens, full width on large */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-black font-medium mb-1">Expertises requises</label>
            <input
              type="text"
              value={missionData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Séparez les expertises par des virgules"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-black font-medium mb-1">Durée estimée</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={missionData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={missionData.durationType}
                onChange={(e) => handleInputChange('durationType', e.target.value)}
                className="px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WEEK">WEEK</option>
                <option value="MONTH">MONTH</option>
                <option value="YEAR">YEAR</option>
              </select>
            </div>
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-black font-medium mb-1">Type de contrat</label>
            <select
              value={missionData.contractType}
              onChange={(e) => handleInputChange('contractType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="FORFAIT">FORFAIT</option>
              <option value="REGIE">REGIE</option>
              <option value="FREELANCE">FREELANCE</option>
            </select>
          </div>

          {/* Daily Rate */}
          <div>
            <label className="block text-black font-medium mb-1">TJM estimé (€)</label>
            <input
              type="text"
              value={missionData.dailyRate}
              onChange={(e) => handleInputChange('dailyRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Immediately - Checkbox spans appropriate width */}
          <div className="flex items-center gap-3 md:col-span-2 lg:col-span-1">
            <input
              type="checkbox"
              id="startImmediately"
              checked={missionData.startImmediately}
              onChange={(e) => handleInputChange('startImmediately', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="startImmediately" className="text-black font-medium">
              Démarrage immédiat
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-end">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
            Annuler
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sauvegarder la mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionGenerator;