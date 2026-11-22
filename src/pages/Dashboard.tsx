import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Calculator, Utensils, BookOpen, Heart, TrendingUp, Target, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  const { profile } = useAuth()

  const calculateBMI = () => {
    if (!profile?.height || !profile?.weight) return 0
    return (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { category: 'Obese', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const quickActions = [
    {
      title: 'BMI Calculator',
      description: 'Check your Body Mass Index',
      icon: Calculator,
      path: '/bmi',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Diet Plan',
      description: 'Get personalized nutrition advice',
      icon: Utensils,
      path: '/diet',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Exercises',
      description: 'Discover workout routines',
      icon: BookOpen,
      path: '/exercises',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Health Tips',
      description: 'Daily wellness guidance',
      icon: Heart,
      path: '/tips',
      color: 'from-red-500 to-orange-500'
    }
  ]

  const bmi = parseFloat(calculateBMI())
  const bmiInfo = getBMICategory(bmi)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {profile?.name || 'Fitness Enthusiast'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Ready to crush your fitness goals today?</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${bmiInfo.bg} ${bmiInfo.color}`}>
                {bmiInfo.category}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{bmi || 'N/A'}</h3>
            <p className="text-gray-600">Current BMI</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{profile?.target_weight || 'N/A'} kg</h3>
            <p className="text-gray-600">Target Weight</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{profile?.frequency || 0}</h3>
            <p className="text-gray-600">Days per Week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 capitalize">{profile?.intensity || 'N/A'}</h3>
            <p className="text-gray-600">Intensity Level</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={action.path}>
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Keep Going! You're Amazing! 🚀</h3>
              <p className="text-emerald-100 text-lg">
                Every step counts on your fitness journey. Stay consistent and you'll see amazing results!
              </p>
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="hidden lg:block"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}