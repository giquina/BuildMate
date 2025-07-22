            {/* Floorplan Options */}
            <div className="lg:col-span-2 space-y-4">
              {floorplans.map((plan, index) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-600">
                          {plan.totalArea}m² • {plan.rooms.length} rooms • Estimated {formatCurrency(plan.estimatedCost)}
                        </p>
                      </div>
                      {selectedPlan === index && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    
                    {/* SVG Floorplan Preview */}
                    <div className="bg-white rounded-lg p-4 mb-4 border">
                      <div 
                        dangerouslySetInnerHTML={{ __html: plan.svgData }}
                        className="w-full flex justify-center"
                      />
                    </div>
                    
                    {/* Room List */}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {plan.rooms.map((room, roomIndex) => (
                        <div key={roomIndex} className="bg-gray-50 rounded px-3 py-2">
                          <div className="font-medium text-gray-900">{room.name}</div>
                          <div className="text-gray-600">{room.area}m²</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Project Summary & Actions */}
            <div className="space-y-6">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">{formatCurrency(projectData.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{projectData.postcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{projectData.projectType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium">{projectData.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium">{projectData.style}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Plan Summary */}
              {floorplans.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Area:</span>
                      <span className="font-medium">{floorplans[selectedPlan].totalArea}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rooms:</span>
                      <span className="font-medium">{floorplans[selectedPlan].rooms.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Cost:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(floorplans[selectedPlan].estimatedCost)}
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Budget remaining:</div>
                      <div className="font-medium text-blue-600">
                        {formatCurrency(projectData.budget - floorplans[selectedPlan].estimatedCost)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleProceedToMaterials}
                  disabled={floorplans.length === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Materials
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/professionals')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Find Professionals
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Upgrade Prompt */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        Unlock Pro Features
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Get 3D visualizations, unlimited projects, and premium exports
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}