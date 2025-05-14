import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { RootState, setDomainData } from "@/store/services/domainData";
import { useUpdateDomainEnginesDataMutation } from "@/store/services/project";
const searchEngines = [
  {
    id: "perplexity",
    name: "Perplexity",
    logo: "public/lovable-uploads/913888da-44b9-4ecf-99ff-3f3eb9738407.png"
  },
  {
    id: "chatgpt",
    name: "ChatGPT Search",
    logo: "public/lovable-uploads/cd0c2ca6-0f33-49dd-b872-37b42c5829fa.png"
  },
  {
    id: "google",
    name: "Google SGE",
    logo: "public/lovable-uploads/3b4266fe-664d-4888-9760-5f6fda3b9516.png"
  },
  {
    id: "claude",
    name: "Claude Search",
    logo: "public/lovable-uploads/82826895-55a7-4126-b7a5-80d28d1a0f98.png"
  }
];

const SearchEngineSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain } = location.state || { domain: "example.com" };
  const [selectedEngines, setSelectedEngines] = useState<string[]>(["perplexity"]);
  const [updateDomainEnginesData, { isLoading }] = useUpdateDomainEnginesDataMutation();
  const dispatch = useDispatch();
  // Get domain data from Redux store
  const domainData = useSelector((state: RootState) => {
    return state.domainData?.data || {}
  });

  useEffect(() => {
    console.log("Domain data from Redux store:", domainData);
  }, [domainData]);

  const handleEngineToggle = (engineId: string) => {
    setSelectedEngines(prev =>
      prev.includes(engineId)
        ? prev.filter(id => id !== engineId)
        : [...prev, engineId]
    );
  };

  const handleContinue = async () => {
    if (selectedEngines.length > 0) {
      console.log("Selected engines:", selectedEngines);
      // Here you can dispatch the selected engines to your Redux store or API
      // For example:
      // dispatch(setSelectedEngines(selectedEngines));
      // Or if you want to navigate to the next page:
      try {
        const res = await updateDomainEnginesData({ domain_id: (domainData as any)?.project_id ?? "", engines: selectedEngines })
          .unwrap();
        console.log("Response from API:", res);
        dispatch(setDomainData(res))
        navigate("/analyze/competitors", {
          state: { domain, selectedEngines }
        });
        toast.success("Search engines updated successfully");

      } catch (error) {
        console.log("Error updating search engines:", error);
        toast.error("Failed to update search engines");

      }

      // navigate("/analyze/competitors", {
      //   state: { domain, selectedEngines }
      // });
    } else {
      toast.error("Please select at least one search engine");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Step 1 of 4</div>
              <div className="text-sm text-gray-500">{domain}</div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-queryosity-blue h-2 rounded-full w-1/4"></div>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-queryosity-blue mb-6">
                Which AI Search engine(s) do you want to grade your domain's AI Search Readiness for?
              </h1>
              <p className="text-gray-600 mb-10">
                Select the AI search engines that are most relevant to your target audience. You can select multiple options.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {searchEngines.map((engine) => (
                  <div
                    key={engine.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors flex items-center ${selectedEngines.includes(engine.id)
                      ? 'border-queryosity-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleEngineToggle(engine.id)}
                  >
                    <Checkbox
                      id={engine.id}
                      checked={selectedEngines.includes(engine.id)}
                      onCheckedChange={() => handleEngineToggle(engine.id)}
                      className="mr-3"
                    />
                    <img
                      src={engine.logo}
                      alt={engine.name}
                      className="w-10 h-10 mr-4 object-contain"
                    />
                    <label htmlFor={engine.id} className="text-lg font-medium cursor-pointer">
                      {engine.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleContinue}
                  disabled={selectedEngines.length === 0}
                  className="bg-queryosity-blue hover:bg-queryosity-dark text-white px-8"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchEngineSelection;
