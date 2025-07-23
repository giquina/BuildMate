            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalBudget())}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalSpent())}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{getActiveProjects().length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{getCompletedProjects().length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => {
                  const statusInfo = statusConfig[project.status]
                  const StatusIcon = statusInfo.icon
                  
                  return (
                    <div
                      key={project.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedProject === project.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.location}</p>
                        </div>
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium ml-2">{formatCurrency(project.budget)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Spent:</span>
                          <span className="font-medium ml-2">{formatCurrency(project.spent)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex justify-between text-xs text-gray-500">
                        <span>Created: {new Date(project.createdAt).toLocaleDateString('en-GB')}</span>
                        <span>Updated: {new Date(project.lastUpdated).toLocaleDateString('en-GB')}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Project Details / Quick Actions */}
          <div className="space-y-6">
            {selectedProject ? (
              <>
                {/* Selected Project Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const project = projects.find(p => p.id === selectedProject)
                      if (!project) return null
                      
                      return (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{project.name}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span className="font-medium">{project.type.replace('_', ' ')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Budget:</span>
                                <span className="font-medium">{formatCurrency(project.budget)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Spent:</span>
                                <span className="font-medium">{formatCurrency(project.spent)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Remaining:</span>
                                <span className="font-medium text-green-600">
                                  {formatCurrency(project.budget - project.spent)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Button className="w-full" size="sm">
                              <Home className="h-4 w-4 mr-2" />
                              View Floorplan
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Manage Materials
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              View Professionals
                            </Button>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Select a Project</h3>
                  <p className="text-gray-600 text-sm">Click on a project to view details and manage</p>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Browse Materials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Find Professionals
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Materials added to cart</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Quote received from James Mitchell</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Floorplan updated</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Unlock Pro Features
                    </h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Unlimited projects, 3D views, priority support and more
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`status-badge border ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {project.daysLeft > 0 ? `${project.daysLeft} days left` : 'Complete'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Next: {project.nextMilestone}</p>
              </div>
              
              {/* Budget Section */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Spent</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(project.spent)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: ShoppingCart,
                  title: 'Materials ordered for Kitchen Renovation',
                  time: '2 hours ago',
                  color: 'green'
                },
                {
                  icon: Users,
                  title: 'Quote received from Elite Electrical',
                  time: '1 day ago',
                  color: 'blue'
                },
                {
                  icon: Calendar,
                  title: 'Foundation work scheduled',
                  time: '2 days ago',
                  color: 'orange'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${activity.color}-50 rounded-xl flex items-center justify-center`}>
                    <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}