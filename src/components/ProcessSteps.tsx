
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Grade AI Search Readiness",
    description: "Our proprietary algorithms analyze your digital presence across major AI search engines",
    icon: "public/lovable-uploads/913888da-44b9-4ecf-99ff-3f3eb9738407.png"
  },
  {
    number: 2,
    title: "Recommend Improvements",
    description: "Receive actionable insights based on impact analysis and root cause identification",
    icon: "public/lovable-uploads/cd0c2ca6-0f33-49dd-b872-37b42c5829fa.png"
  },
  {
    number: 3,
    title: "Implement Recommendations",
    description: "Our AI assistant helps you implement changes tailored to your specific needs",
    icon: "public/lovable-uploads/3b4266fe-664d-4888-9760-5f6fda3b9516.png"
  },
  {
    number: 4,
    title: "Measure Impact",
    description: "Track progress with continuous monitoring and iterative improvements",
    icon: "public/lovable-uploads/82826895-55a7-4126-b7a5-80d28d1a0f98.png"
  }
];

const ProcessSteps = () => {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-queryosity-blue mb-16">
          Our Four-Step Approach to AI Search Readiness
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-queryosity-blue text-white flex items-center justify-center font-bold mr-3">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-queryosity-blue">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <div className="flex justify-center">
                  <img src={step.icon} alt={step.title} className="h-20 object-contain" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
