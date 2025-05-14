
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

const LockedFeatures = () => {
  return (
    <div className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-queryosity-blue mb-16">
          Advanced Features Coming Soon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recommend Improvements */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                  Recommend Improvements
                </h3>
                <p className="text-gray-600 mb-6">
                  Unlock personalized recommendations based on our root cause analysis of your AI search performance.
                </p>
              </div>
              <div className="blur-card h-48 bg-gray-100">
                <img 
                  src="public/lovable-uploads/cd0c2ca6-0f33-49dd-b872-37b42c5829fa.png" 
                  alt="Recommendations" 
                  className="w-full h-full object-cover" 
                />
                <div className="coming-soon-badge flex items-center">
                  <LockIcon className="h-4 w-4 mr-2" /> Coming Soon
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Implement Recommendations */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                  Implement Recommendations
                </h3>
                <p className="text-gray-600 mb-6">
                  Turn insights into action with our AI-powered implementation assistant to improve your content.
                </p>
              </div>
              <div className="blur-card h-48 bg-gray-100">
                <img 
                  src="public/lovable-uploads/3b4266fe-664d-4888-9760-5f6fda3b9516.png" 
                  alt="Implementation" 
                  className="w-full h-full object-cover" 
                />
                <div className="coming-soon-badge flex items-center">
                  <LockIcon className="h-4 w-4 mr-2" /> Coming Soon
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Measure Impact */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                  Measure Impact
                </h3>
                <p className="text-gray-600 mb-6">
                  Track your progress and see real-time improvements in your AI search performance metrics.
                </p>
              </div>
              <div className="blur-card h-48 bg-gray-100">
                <img 
                  src="public/lovable-uploads/82826895-55a7-4126-b7a5-80d28d1a0f98.png" 
                  alt="Impact Measurement" 
                  className="w-full h-full object-cover" 
                />
                <div className="coming-soon-badge flex items-center">
                  <LockIcon className="h-4 w-4 mr-2" /> Coming Soon
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LockedFeatures;
