import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Droplets, Moon, Sun, Apple, Activity, Brain, Shield } from 'lucide-react'

export const HealthTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('general')

  const healthTips = {
    general: [
      {
        icon: Heart,
        title: 'Stay Hydrated',
        tip: 'Drink at least 8 glasses of water daily to maintain optimal body function and energy levels.',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Sun,
        title: 'Get Morning Sunlight',
        tip: 'Expose yourself to natural sunlight for 10-15 minutes each morning to regulate your circadian rhythm.',
        color: 'from-yellow-500 to-orange-500'
      },
      {
        icon: Activity,
        title: 'Move Every Hour',
        tip: 'Take a 5-minute break every hour to stretch or walk around, especially if you work at a desk.',
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: Brain,
        title: 'Practice Mindfulness',
        tip: 'Spend 10 minutes daily in meditation or deep breathing to reduce stress and improve mental clarity.',
        color: 'from-purple-500 to-pink-500'
      }
    ],
    nutrition: [
      {
        icon: Apple,
        title: 'Eat the Rainbow',
        tip: 'Include colorful fruits and vegetables in every meal to ensure you get diverse nutrients and antioxidants.',
        color: 'from-red-500 to-pink-500'
      },
      {
        icon: Droplets,
        title: 'Portion Control',
        tip: 'Use smaller plates and bowls to naturally reduce portion sizes without feeling deprived.',
        color: 'from-blue-500 to-indigo-500'
      },
      {
        icon: Heart,
        title: 'Healthy Fats',
        tip: 'Include omega-3 rich foods like salmon, walnuts, and flaxseeds for brain and heart health.',
        color: 'from-emerald-500 to-teal-500'
      },
      {
        icon: Sun,
        title: 'Meal Timing',
        tip: 'Eat your largest meal earlier in the day and avoid heavy meals 3 hours before bedtime.',
        color: 'from-orange-500 to-yellow-500'
      }
    ],
    fitness: [
      {
        icon: Activity,
        title: 'Start Small',
        tip: 'Begin with 10-15 minutes of exercise daily and gradually increase duration and intensity.',
        color: 'from-green-500 to-blue-500'
      },
      {
        icon: Heart,
        title: 'Mix It Up',
        tip: 'Combine cardio, strength training, and flexibility exercises for comprehensive fitness.',
        color: 'from-red-500 to-orange-500'
      },
      {
        icon: Shield,
        title: 'Rest Days',
        tip: 'Include 1-2 rest days per week to allow your muscles to recover and prevent burnout.',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        icon: Sun,
        title: 'Morning Workouts',
        tip: 'Exercise in the morning to boost energy levels and metabolism throughout the day.',
        color: 'from-yellow-500 to-orange-500'
      }
    ],
    sleep: [
      {
        icon: Moon,
        title: 'Consistent Schedule',
        tip: 'Go to bed and wake up at the same time every day, even on weekends, to regulate your sleep cycle.',
        color: 'from-indigo-500 to-purple-500'
      },
      {
        icon: Shield,
        title: 'Screen-Free Hour',
        tip: 'Avoid screens for at least 1 hour before bedtime to improve sleep quality.',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Heart,
        title: 'Cool Environment',
        tip: 'Keep your bedroom temperature between 65-68°F (18-20°C) for optimal sleep conditions.',
        color: 'from-cyan-500 to-blue-500'
      },
      {
        icon: Brain,
        title: 'Relaxation Routine',
        tip: 'Develop a calming bedtime routine like reading, gentle stretching, or listening to soft music.',
        color: 'from-purple-500 to-pink-500'
      }
    ]
  }

  const categories = [
    { key: 'general', label: 'General Health', icon: Heart },
    { key: 'nutrition', label: 'Nutrition', icon: Apple },
    { key: 'fitness', label: 'Fitness', icon: Activity },
    { key: 'sleep', label: 'Sleep', icon: Moon }
  ]

  const dailyTips = [
    'Take the stairs instead of the elevator',
    'Pack healthy snacks to avoid vending machine temptations',
    'Set reminders to drink water throughout the day',
    'Practice gratitude by writing down 3 things you\'re thankful for',
    'Do 10 deep breaths when feeling stressed',
    'Stand and stretch during TV commercial breaks',
    'Choose whole grain options over refined carbs',
    'Get outside for fresh air during lunch break'
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Health & Wellness Tips</h1>
          <p className="text-gray-600 text-lg">Expert advice for a healthier, happier you</p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {healthTips[selectedCategory as keyof typeof healthTips].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 bg-gradient-to-r ${tip.color} rounded-2xl flex-shrink-0`}>
                  <tip.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 text-white mb-8"
        >
          <div className="text-center mb-6">
            <Sun className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Daily Quick Tips</h2>
            <p className="text-emerald-100">Small changes that make a big difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-sm leading-relaxed">{tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gut Health Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Foods to Avoid for Gut Health</h2>
            <p className="text-gray-600">Limit these foods to maintain a healthy digestive system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Processed and ultra-processed foods',
              'Excessive sugar and artificial sweeteners',
              'Deep-fried and greasy foods',
              'Alcohol and sugary beverages',
              'Refined grains and white bread',
              'High-sodium packaged foods'
            ].map((food, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">{food}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}