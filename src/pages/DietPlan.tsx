import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Utensils, Coffee, Sun, Moon, Apple, Droplets } from 'lucide-react'

export const DietPlan: React.FC = () => {
  const { profile } = useAuth()
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null)

  const calculateBMI = () => {
    if (!profile?.height || !profile?.weight) return 0
    return profile.weight / ((profile.height / 100) ** 2)
  }

  const getDietRecommendations = () => {
    const bmi = calculateBMI()
    const goal = profile?.goal
    
    if (goal === 'weight_loss' || bmi > 25) {
      return {
        calories: '1200-1500 kcal/day',
        carbs: '40-45%',
        protein: '25-30%',
        fats: '25-30%',
        type: 'Weight Loss',
        color: 'from-red-500 to-pink-500'
      }
    } else if (goal === 'weight_gain' || bmi < 18.5) {
      return {
        calories: '2500-3000 kcal/day',
        carbs: '50-55%',
        protein: '20-25%',
        fats: '25-30%',
        type: 'Weight Gain',
        color: 'from-blue-500 to-cyan-500'
      }
    } else {
      return {
        calories: '1800-2200 kcal/day',
        carbs: '45-50%',
        protein: '20-25%',
        fats: '25-30%',
        type: 'Maintenance',
        color: 'from-green-500 to-emerald-500'
      }
    }
  }

  const mealPlans = {
    breakfast: {
      icon: Coffee,
      title: 'Breakfast',
      time: '7:00 - 9:00 AM',
      foods: [
        'Oatmeal with berries and nuts',
        'Greek yogurt with honey',
        'Whole grain toast with avocado',
        'Green tea or black coffee',
        'Fresh fruit (banana, apple)'
      ]
    },
    lunch: {
      icon: Sun,
      title: 'Lunch',
      time: '12:00 - 2:00 PM',
      foods: [
        'Grilled chicken or fish',
        'Quinoa or brown rice',
        'Mixed vegetables (broccoli, carrots)',
        'Green salad with olive oil',
        'Lemon water'
      ]
    },
    snack: {
      icon: Apple,
      title: 'Snack',
      time: '4:00 - 5:00 PM',
      foods: [
        'Mixed nuts and seeds',
        'Greek yogurt',
        'Fresh fruits',
        'Herbal tea',
        'Dark chocolate (small piece)'
      ]
    },
    dinner: {
      icon: Moon,
      title: 'Dinner',
      time: '7:00 - 8:00 PM',
      foods: [
        'Lean protein (chicken, fish, tofu)',
        'Steamed vegetables',
        'Sweet potato or quinoa',
        'Green tea',
        'Small portion of dessert'
      ]
    }
  }

  const nutritionTips = [
    'Drink at least 8 glasses of water daily',
    'Include protein in every meal',
    'Eat colorful fruits and vegetables',
    'Choose whole grains over refined',
    'Limit processed and sugary foods',
    'Practice portion control',
    'Eat slowly and mindfully',
    'Plan your meals in advance'
  ]

  const foodsToAvoid = [
    'Processed and packaged foods',
    'Sugary drinks and sodas',
    'Deep-fried foods',
    'White bread and pastries',
    'Excess alcohol',
    'High-sodium foods',
    'Artificial sweeteners',
    'Fast food and junk food'
  ]

  const dietRec = getDietRecommendations()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Personalized Diet Plan</h1>
          <p className="text-gray-600 text-lg">Nutrition recommendations based on your profile and goals</p>
        </motion.div>

        {/* Diet Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-r ${dietRec.color} rounded-3xl p-8 text-white mb-8`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{dietRec.type}</h3>
              <p className="text-white/80">Diet Plan</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{dietRec.calories}</h3>
              <p className="text-white/80">Daily Calories</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{dietRec.protein}</h3>
              <p className="text-white/80">Protein</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{dietRec.carbs}</h3>
              <p className="text-white/80">Carbohydrates</p>
            </div>
          </div>
        </motion.div>

        {/* Meal Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Meal Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(mealPlans).map(([key, meal], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer transition-all duration-300 ${
                  selectedMeal === key ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => setSelectedMeal(selectedMeal === key ? null : key)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
                    <meal.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">{meal.time}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{meal.title}</h3>
                
                {selectedMeal === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {meal.foods.map((food, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{food}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nutrition Tips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nutrition Tips</h3>
            </div>
            <div className="space-y-3">
              {nutritionTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Foods to Avoid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mr-4">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Foods to Limit</h3>
            </div>
            <div className="space-y-3">
              {foodsToAvoid.map((food, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">{food}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}