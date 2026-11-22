import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, Clock, Target, Zap, Play, CheckCircle } from 'lucide-react'

export const Exercises: React.FC = () => {
  const { profile } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const exercises = [
    {
      id: '1',
      name: 'Push-ups',
      category: 'strength',
      intensity: 'beginner',
      duration: '10-15 reps',
      description: 'Great for building upper body strength',
      instructions: [
        'Start in plank position with hands shoulder-width apart',
        'Lower your body until chest nearly touches floor',
        'Push back up to starting position',
        'Keep your core engaged throughout'
      ],
      benefits: ['Chest strength', 'Arm strength', 'Core stability']
    },
    {
      id: '2',
      name: 'Squats',
      category: 'strength',
      intensity: 'beginner',
      duration: '15-20 reps',
      description: 'Perfect for lower body strength and glutes',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower down as if sitting in a chair',
        'Keep knees behind toes',
        'Return to standing position'
      ],
      benefits: ['Leg strength', 'Glute activation', 'Core engagement']
    },
    {
      id: '3',
      name: 'Burpees',
      category: 'cardio',
      intensity: 'hard',
      duration: '30 seconds',
      description: 'Full-body high-intensity exercise',
      instructions: [
        'Start standing, then squat down',
        'Jump feet back into plank',
        'Do a push-up (optional)',
        'Jump feet forward, then jump up'
      ],
      benefits: ['Cardio endurance', 'Full body workout', 'Calorie burn']
    },
    {
      id: '4',
      name: 'Plank',
      category: 'core',
      intensity: 'medium',
      duration: '30-60 seconds',
      description: 'Excellent for core strength and stability',
      instructions: [
        'Start in push-up position',
        'Hold position with straight line from head to heels',
        'Keep core tight and breathe normally',
        'Hold for specified time'
      ],
      benefits: ['Core strength', 'Stability', 'Posture improvement']
    },
    {
      id: '5',
      name: 'Mountain Climbers',
      category: 'cardio',
      intensity: 'medium',
      duration: '30 seconds',
      description: 'Dynamic cardio and core exercise',
      instructions: [
        'Start in plank position',
        'Bring one knee toward chest',
        'Switch legs quickly',
        'Keep hips level throughout'
      ],
      benefits: ['Cardio fitness', 'Core strength', 'Agility']
    },
    {
      id: '6',
      name: 'Lunges',
      category: 'strength',
      intensity: 'medium',
      duration: '10-12 each leg',
      description: 'Great for leg strength and balance',
      instructions: [
        'Step forward into lunge position',
        'Lower until both knees at 90 degrees',
        'Push back to starting position',
        'Alternate legs'
      ],
      benefits: ['Leg strength', 'Balance', 'Hip flexibility']
    }
  ]

  const categories = [
    { value: 'all', label: 'All Exercises', color: 'from-purple-500 to-pink-500' },
    { value: 'strength', label: 'Strength', color: 'from-blue-500 to-cyan-500' },
    { value: 'cardio', label: 'Cardio', color: 'from-red-500 to-orange-500' },
    { value: 'core', label: 'Core', color: 'from-green-500 to-emerald-500' }
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredExercises = exercises.filter(exercise => {
    if (selectedCategory === 'all') return true
    return exercise.category === selectedCategory
  }).filter(exercise => {
    if (!profile?.intensity) return true
    const userIntensity = profile.intensity
    if (userIntensity === 'beginner') return exercise.intensity === 'beginner'
    if (userIntensity === 'medium') return ['beginner', 'medium'].includes(exercise.intensity)
    if (userIntensity === 'hard') return true
    return true
  })

  const toggleComplete = (exerciseId: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Exercise Library</h1>
          <p className="text-gray-600 text-lg">Discover exercises tailored to your fitness level</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === category.value
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20 transition-all duration-300 ${
                  completedExercises.includes(exercise.id) ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {/* Exercise Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                  </div>
                  <button
                    onClick={() => toggleComplete(exercise.id)}
                    className={`p-2 rounded-full transition-colors ${
                      completedExercises.includes(exercise.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-green-500 hover:text-white'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Exercise Details */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{exercise.duration}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getIntensityColor(exercise.intensity)}`}>
                    {exercise.intensity}
                  </span>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Instructions:</h4>
                  {exercise.instructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-600">{instruction}</p>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Exercise</span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Summary */}
        {completedExercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white text-center"
          >
            <Target className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Great Progress! 🎉</h3>
            <p className="text-green-100">
              You've completed {completedExercises.length} exercise{completedExercises.length > 1 ? 's' : ''} today. Keep it up!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}