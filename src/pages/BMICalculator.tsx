import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Calculator, Scale, Ruler, TrendingUp } from 'lucide-react'

export const BMICalculator: React.FC = () => {
  const { profile } = useAuth()
  const [height, setHeight] = useState(profile?.height?.toString() || '')
  const [weight, setWeight] = useState(profile?.weight?.toString() || '')
  const [bmi, setBMI] = useState<number | null>(null)

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const bmiValue = w / ((h / 100) ** 2)
      setBMI(bmiValue)
    }
  }

  const getBMIInfo = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Underweight',
        color: 'text-blue-600',
        bg: 'bg-blue-50 border-blue-200',
        advice: 'Consider gaining weight through a balanced diet and strength training.',
        range: 'Below 18.5'
      }
    } else if (bmiValue < 25) {
      return {
        category: 'Normal Weight',
        color: 'text-green-600',
        bg: 'bg-green-50 border-green-200',
        advice: 'Great job! Maintain your current lifestyle with regular exercise and balanced nutrition.',
        range: '18.5 - 24.9'
      }
    } else if (bmiValue < 30) {
      return {
        category: 'Overweight',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50 border-yellow-200',
        advice: 'Consider losing weight through a calorie-controlled diet and regular exercise.',
        range: '25.0 - 29.9'
      }
    } else {
      return {
        category: 'Obese',
        color: 'text-red-600',
        bg: 'bg-red-50 border-red-200',
        advice: 'Consult with a healthcare professional for a comprehensive weight management plan.',
        range: '30.0 and above'
      }
    }
  }

  const bmiCategories = [
    { category: 'Underweight', range: '< 18.5', color: 'bg-blue-100 text-blue-800' },
    { category: 'Normal', range: '18.5 - 24.9', color: 'bg-green-100 text-green-800' },
    { category: 'Overweight', range: '25.0 - 29.9', color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Obese', range: '≥ 30.0', color: 'bg-red-100 text-red-800' }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">BMI Calculator</h1>
          <p className="text-gray-600 text-lg">Calculate your Body Mass Index and get personalized recommendations</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h2>
            
            <div className="space-y-6">
              <div className="relative">
                <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateBMI}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Calculate BMI
              </motion.button>
            </div>

            {/* BMI Result */}
            {bmi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className={`p-6 rounded-2xl border-2 ${getBMIInfo(bmi).bg}`}>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <TrendingUp className={`w-8 h-8 ${getBMIInfo(bmi).color}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{bmi.toFixed(1)}</h3>
                    <p className={`text-lg font-semibold ${getBMIInfo(bmi).color} mb-4`}>
                      {getBMIInfo(bmi).category}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {getBMIInfo(bmi).advice}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* BMI Categories & Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* BMI Categories */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">BMI Categories</h3>
              <div className="space-y-4">
                {bmiCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="font-medium text-gray-700">{category.category}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                      {category.range}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Health Tips</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>BMI is a screening tool, not a diagnostic measure of body fatness or health.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Muscle weighs more than fat, so athletes may have higher BMI values.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Consult healthcare professionals for comprehensive health assessments.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Focus on overall health, not just numbers on the scale.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}