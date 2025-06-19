"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Upload,
  FlaskConical,
  Pill,
  Bot,
  Calendar,
  TrendingUp,
  Heart,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function GeniMedsDashboard() {
  const [notifications, setNotifications] = useState(3)

  const quickActions = [
    {
      title: "Upload Prescription",
      description: "Scan or upload prescription images",
      icon: Upload,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-white",
    },
    {
      title: "Lab Reports",
      description: "View and analyze lab results",
      icon: FlaskConical,
      gradient: "from-green-500 to-green-600",
      textColor: "text-white",
    },
    {
      title: "Find Alternatives",
      description: "Discover generic medicine options",
      icon: Pill,
      gradient: "from-purple-500 to-purple-600",
      textColor: "text-white",
    },
    {
      title: "Ask AI",
      description: "Get health insights and advice",
      icon: Bot,
      gradient: "from-orange-500 to-orange-600",
      textColor: "text-white",
    },
  ]

  const recentActivity = [
    {
      type: "prescription",
      title: "Prescription uploaded",
      description: "Metformin 500mg - 3 medicines extracted",
      time: "2 hours ago",
      icon: Upload,
      status: "success",
    },
    {
      type: "reminder",
      title: "Medicine reminder",
      description: "Lisinopril 10mg taken on time",
      time: "4 hours ago",
      icon: CheckCircle,
      status: "success",
    },
    {
      type: "lab",
      title: "Lab report analyzed",
      description: "Blood glucose levels reviewed",
      time: "1 day ago",
      icon: FlaskConical,
      status: "warning",
    },
    {
      type: "ai",
      title: "AI consultation",
      description: "Asked about side effects",
      time: "2 days ago",
      icon: Bot,
      status: "info",
    },
  ]

  const healthMetrics = [
    {
      label: "Blood Pressure",
      value: "120/80",
      trend: "stable",
      icon: Heart,
      color: "text-green-600",
    },
    {
      label: "Heart Rate",
      value: "72 bpm",
      trend: "up",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      label: "Adherence",
      value: "94%",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">GeniMeds</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Welcome & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Good morning, John!</h2>
              <p className="text-lg text-gray-600">How can we help you today?</p>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`h-32 md:h-36 p-3 flex flex-col items-center justify-center bg-gradient-to-br ${action.gradient} hover:opacity-90 transition-all duration-200 rounded-xl hover:scale-105 overflow-hidden`}
                      >
                        <IconComponent className={`w-7 h-7 md:w-8 md:h-8 ${action.textColor} flex-shrink-0 mb-2`} />
                        <div className="text-center w-full px-1">
                          <div
                            className={`font-medium text-xs md:text-sm ${action.textColor} leading-tight mb-1 break-words`}
                          >
                            {action.title}
                          </div>
                          <div
                            className={`text-xs opacity-90 ${action.textColor} leading-tight break-words hidden md:block`}
                          >
                            {action.description}
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            activity.status === "success"
                              ? "bg-green-100"
                              : activity.status === "warning"
                                ? "bg-yellow-100"
                                : activity.status === "info"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${
                              activity.status === "success"
                                ? "text-green-600"
                                : activity.status === "warning"
                                  ? "text-yellow-600"
                                  : activity.status === "info"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-base">{activity.title}</div>
                          <div className="text-gray-600 mt-1">{activity.description}</div>
                          <div className="flex items-center space-x-1 mt-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Health Insights & Emergency */}
          <div className="space-y-6">
            {/* Health Insights */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Health Insights</h3>
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div className="space-y-4">
                  {healthMetrics.map((metric, index) => {
                    const IconComponent = metric.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <IconComponent className={`w-6 h-6 ${metric.color}`} />
                          <div>
                            <div className="font-semibold text-gray-900 text-base">{metric.label}</div>
                            <div className="text-gray-600 text-lg font-medium">{metric.value}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {metric.trend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                          {metric.trend === "stable" && <div className="w-5 h-5 rounded-full bg-green-500" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <div className="font-semibold text-red-900 text-lg">Emergency Notice</div>
                    <div className="text-red-700 mt-2 leading-relaxed">
                      For medical emergencies, call 911 immediately. This app is not a substitute for professional
                      medical care.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
