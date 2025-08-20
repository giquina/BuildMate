'use client'

import React, { useState, useEffect } from 'react'
import { XPTracking, XP_LEVELS } from '@/types/freemium'
import { cn } from '@/lib/utils'
import { Card } from './Card'
import { Progress } from './Progress'

interface ProgressTrackingProps {
  userXP: XPTracking
  projectProgress?: ProjectProgress[]
  dailyGoals?: DailyGoal[]
  weeklyGoals?: WeeklyGoal[]
  className?: string
}

interface ProjectProgress {
  id: string
  name: string
  totalSteps: number
  completedSteps: number
  category: 'design' | 'materials' | 'planning' | 'execution'
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
}

interface DailyGoal {
  id: string
  title: string
  description: string
  progress: number
  target: number
  xpReward: number
  completed: boolean
  icon: string
}

interface WeeklyGoal {
  id: string
  title: string
  description: string
  progress: number
  target: number
  xpReward: number
  completed: boolean
  daysLeft: number
  icon: string
}

interface SkillProgress {
  skill: string
  level: number
  xp: number
  nextLevelXP: number
  icon: string
  color: string
}

const categoryColors = {
  design: 'from-purple-400 to-purple-600',
  materials: 'from-orange-400 to-orange-600',
  planning: 'from-blue-400 to-blue-600',
  execution: 'from-green-400 to-green-600'
}

const priorityColors = {
  low: 'border-gray-300 bg-gray-50',
  medium: 'border-yellow-300 bg-yellow-50',
  high: 'border-red-300 bg-red-50'
}

function ProjectProgressCard({ project }: { project: ProjectProgress }) {
  const progressPercentage = (project.completedSteps / project.totalSteps) * 100
  const isOverdue = project.dueDate && new Date() > project.dueDate
  const isDueSoon = project.dueDate && 
    project.dueDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000 && // 3 days
    !isOverdue

  return (
    <Card className={cn(
      'p-4 border-l-4 transition-all duration-300 hover:shadow-md',
      priorityColors[project.priority],
      isOverdue && 'border-red-500',
      isDueSoon && 'border-yellow-500'
    )}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{project.name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <div className={cn(
              'px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r text-white',
              categoryColors[project.category]
            )}>
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
            {isOverdue && (
              <span className="text-xs text-red-600 font-medium">Overdue</span>
            )}
            {isDueSoon && (
              <span className="text-xs text-yellow-600 font-medium">Due Soon</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-xs text-gray-500">
            {project.completedSteps}/{project.totalSteps} steps
          </div>
        </div>
      </div>

      <Progress value={progressPercentage} className="mb-2" />
      
      {project.dueDate && (
        <div className="text-xs text-gray-500">
          Due: {project.dueDate.toLocaleDateString()}
        </div>
      )}
    </Card>
  )
}

function XPLevelProgress({ userXP }: { userXP: XPTracking }) {
  const currentLevel = XP_LEVELS.find(level => level.level === userXP.currentLevel)
  const nextLevel = XP_LEVELS.find(level => level.level === userXP.currentLevel + 1)
  
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Level {userXP.currentLevel}
          </h3>
          <p className="text-sm text-blue-600 font-medium">
            {currentLevel?.title || 'Builder'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {userXP.totalXP.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total XP</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to Level {userXP.currentLevel + 1}</span>
          <span className="font-medium text-gray-900">
            {userXP.xpToNextLevel} XP needed
          </span>
        </div>
        
        <div className="relative">
          <Progress value={userXP.levelProgress} className="h-3" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white drop-shadow">
              {Math.round(userXP.levelProgress)}%
            </span>
          </div>
        </div>
        
        {nextLevel && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Next: {nextLevel.title}
          </p>
        )}
      </div>
    </Card>
  )
}

function DailyGoalsSection({ goals }: { goals: DailyGoal[] }) {
  const completedGoals = goals.filter(goal => goal.completed).length
  const totalXP = goals.reduce((sum, goal) => sum + (goal.completed ? goal.xpReward : 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🎯</span>
          Daily Goals
        </h3>
        <div className="text-sm text-gray-600">
          {completedGoals}/{goals.length} completed (+{totalXP} XP)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => (
          <Card 
            key={goal.id} 
            className={cn(
              'p-4 transition-all duration-300',
              goal.completed 
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'hover:shadow-md'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{goal.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <p className="text-xs text-gray-500">{goal.description}</p>
                </div>
              </div>
              {goal.completed && (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Progress 
                value={(goal.progress / goal.target) * 100} 
                className={cn(
                  'h-2',
                  goal.completed && 'opacity-75'
                )} 
              />
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">
                  {goal.progress}/{goal.target}
                </span>
                <span className="font-medium text-blue-600">
                  +{goal.xpReward} XP
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function WeeklyGoalsSection({ goals }: { goals: WeeklyGoal[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <span className="mr-2">📅</span>
        Weekly Challenges
      </h3>

      <div className="space-y-4">
        {goals.map(goal => (
          <Card key={goal.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{goal.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {Math.round((goal.progress / goal.target) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {goal.daysLeft} days left
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={(goal.progress / goal.target) * 100} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {goal.progress}/{goal.target}
                </span>
                <span className="font-medium text-orange-600">
                  +{goal.xpReward} XP
                </span>
              </div>
            </div>

            {goal.completed && (
              <div className="mt-3 text-center text-green-600 font-medium text-sm">
                ✅ Completed! XP Awarded
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function SkillProgressSection({ userXP }: { userXP: XPTracking }) {
  // Mock skill data - in real app this would come from props or context
  const skills: SkillProgress[] = [
    {
      skill: 'Design Planning',
      level: 3,
      xp: 750,
      nextLevelXP: 1000,
      icon: '🎨',
      color: 'from-purple-400 to-purple-600'
    },
    {
      skill: 'Budget Management',
      level: 2,
      xp: 400,
      nextLevelXP: 600,
      icon: '💰',
      color: 'from-green-400 to-green-600'
    },
    {
      skill: 'Material Selection',
      level: 4,
      xp: 1200,
      nextLevelXP: 1500,
      icon: '🔨',
      color: 'from-orange-400 to-orange-600'
    },
    {
      skill: 'AI Optimization',
      level: 1,
      xp: 150,
      nextLevelXP: 300,
      icon: '🤖',
      color: 'from-blue-400 to-blue-600'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <span className="mr-2">⚡</span>
        Skill Levels
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map(skill => (
          <Card key={skill.skill} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white',
                  'bg-gradient-to-br',
                  skill.color
                )}>
                  <span className="text-lg">{skill.icon}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                  <p className="text-xs text-gray-500">Level {skill.level}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {skill.xp}
                </div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            </div>

            <div className="space-y-1">
              <Progress 
                value={(skill.xp / skill.nextLevelXP) * 100} 
                className="h-2"
              />
              <p className="text-xs text-gray-500 text-center">
                {skill.nextLevelXP - skill.xp} XP to Level {skill.level + 1}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ProgressTracking({ 
  userXP, 
  projectProgress = [], 
  dailyGoals = [], 
  weeklyGoals = [], 
  className 
}: ProgressTrackingProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'goals' | 'skills'>('overview')

  // Mock data for demonstration
  const mockDailyGoals: DailyGoal[] = dailyGoals.length ? dailyGoals : [
    {
      id: '1',
      title: 'Generate AI Suggestions',
      description: 'Use AI to optimize your project',
      progress: 2,
      target: 3,
      xpReward: 50,
      completed: false,
      icon: '🤖'
    },
    {
      id: '2',
      title: 'Update Project Progress',
      description: 'Mark completed steps in your project',
      progress: 1,
      target: 1,
      xpReward: 25,
      completed: true,
      icon: '✅'
    },
    {
      id: '3',
      title: 'Browse Materials',
      description: 'Explore material options',
      progress: 0,
      target: 5,
      xpReward: 30,
      completed: false,
      icon: '🔍'
    }
  ]

  const mockWeeklyGoals: WeeklyGoal[] = weeklyGoals.length ? weeklyGoals : [
    {
      id: '1',
      title: 'Complete Project Planning',
      description: 'Finish planning phase for your current project',
      progress: 3,
      target: 5,
      xpReward: 200,
      completed: false,
      daysLeft: 4,
      icon: '📋'
    },
    {
      id: '2',
      title: 'Connect with Professionals',
      description: 'Contact 2 verified professionals',
      progress: 1,
      target: 2,
      xpReward: 150,
      completed: false,
      daysLeft: 6,
      icon: '🤝'
    }
  ]

  const mockProjects: ProjectProgress[] = projectProgress.length ? projectProgress : [
    {
      id: '1',
      name: 'Kitchen Extension',
      totalSteps: 12,
      completedSteps: 8,
      category: 'design',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      priority: 'high'
    },
    {
      id: '2',
      name: 'Bathroom Renovation',
      totalSteps: 8,
      completedSteps: 3,
      category: 'materials',
      priority: 'medium'
    }
  ]

  const overallProgress = mockProjects.length > 0 
    ? Math.round(mockProjects.reduce((sum, project) => 
        sum + (project.completedSteps / project.totalSteps), 0
      ) / mockProjects.length * 100)
    : 0

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with overall progress */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">You're {overallProgress}% Complete</h2>
            <p className="text-green-600 font-medium">Keep up the excellent progress!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">{overallProgress}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
        </div>
        
        <Progress value={overallProgress} className="h-4" />
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>{mockProjects.length} active projects</span>
          <span>🔥 {userXP.dailyXP} XP earned today</span>
        </div>
      </div>

      {/* XP Progress */}
      <XPLevelProgress userXP={userXP} />

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: '📊' },
          { key: 'projects', label: 'Projects', icon: '🏗️' },
          { key: 'goals', label: 'Goals', icon: '🎯' },
          { key: 'skills', label: 'Skills', icon: '⚡' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={cn(
              'flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all',
              'text-sm font-medium',
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <DailyGoalsSection goals={mockDailyGoals.slice(0, 2)} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                <div className="space-y-4">
                  {mockProjects.slice(0, 2).map(project => (
                    <ProjectProgressCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
                <div className="space-y-4">
                  {mockWeeklyGoals.slice(0, 1).map(goal => (
                    <Card key={goal.id} className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xl">{goal.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{goal.title}</h4>
                          <p className="text-xs text-gray-500">{goal.daysLeft} days left</p>
                        </div>
                      </div>
                      <Progress value={(goal.progress / goal.target) * 100} />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            {mockProjects.map(project => (
              <ProjectProgressCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-8">
            <DailyGoalsSection goals={mockDailyGoals} />
            <WeeklyGoalsSection goals={mockWeeklyGoals} />
          </div>
        )}

        {activeTab === 'skills' && <SkillProgressSection userXP={userXP} />}
      </div>
    </div>
  )
}