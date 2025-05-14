import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Search, X } from "lucide-react";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useSuggestDoaminCompetitorsMutation } from "@/store/services/project";
import { useSelector } from "react-redux";
import { RootState } from "@/store/services/domainData";
import { toast } from "sonner";

// Mock suggested competitors based on domain
const getStaticSuggestedCompetitors = (domain: string) => {
  const defaultCompetitors = [
    { id: "comp1", name: "competitor1.com", selected: true },
    { id: "comp2", name: "competitor2.com", selected: true },
    { id: "comp3", name: "competitorsite.com", selected: false },
    { id: "comp4", name: "industryexample.com", selected: false }
  ];

  return defaultCompetitors;
};

const CompetitorSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain, selectedEngines } = location.state || { domain: "example.com", selectedEngines: ["perplexity"] };
  const [getSuggestedCompetitors, { isLoading: domainDataLoading, isError: hasError }] = useSuggestDoaminCompetitorsMutation();
  // Get domain data from Redux store

  const domainData = useSelector((state: RootState) => {
    return (state.domainData?.data as any) || {};
  });

  const retriveSuggestedCompetitors = async (project_id: string) => {
    console.log("Retrieving suggested competitors for project ID:", project_id);
    if (domain) {
      try {
        const data = await getSuggestedCompetitors({ project_id: project_id })
          .unwrap();
        console.log("Competitors data fetched successfully: ", data);
        // Set domain data to Redux store
        // dispatch(setDomainData(data));
      } catch (error) {
        console.error("Error fetching competitors data:", error);
        toast.error("Failed to fetch competitors data");
      }
    } else {
      toast.error("Please enter a domain to analyze");
    }
  };
  useEffect(() => {
    console.log("/analyze/competitors Domain data from Redux store: ", domainData);
    if (domainData?.competitors != undefined && domainData?.competitors != null) {
      console.log("Competitors data from API: ", domainData?.competitors);

      // const competitors = domainData?.competitors.map((comp: any) => ({
      //   id: comp.id,
      //   name: comp.name,
      //   selected: true
      // }));
      // setCompetitors(competitors);

    } else {
      console.log("Competitors data not found in API response");
      retriveSuggestedCompetitors(domainData.project_id);
    }
  }, [domainData]);

  const [competitors, setCompetitors] = useState(getStaticSuggestedCompetitors(domain));
  const [searchQuery, setSearchQuery] = useState("");
  const [newCompetitor, setNewCompetitor] = useState("");

  const handleCompetitorToggle = (id: string) => {
    setCompetitors(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, selected: !comp.selected } : comp
      )
    );
  };

  const handleAddCompetitor = () => {
    if (newCompetitor && !competitors.some(c => c.name === newCompetitor)) {
      setCompetitors([
        ...competitors,
        { id: `comp${competitors.length + 1}`, name: newCompetitor, selected: true }
      ]);
      setNewCompetitor("");
    }
  };

  const handleContinue = () => {
    const selectedCompetitors = competitors.filter(c => c.selected).map(c => c.name);
    console.log("selectedCompetitors  == ", selectedCompetitors);
    
    // navigate("/analyze/queries", {
    //   state: { domain, selectedEngines, selectedCompetitors }
    // });
  };

  const filteredCompetitors = competitors.filter(comp =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Step 2 of 4</div>
              <div className="text-sm text-gray-500">{domain}</div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-queryosity-blue h-2 rounded-full w-2/4"></div>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-queryosity-blue mb-6">
                Which competitors do you want to monitor as well?
              </h1>
              <p className="text-gray-600 mb-8">
                We've suggested some competitors based on your domain. You can add or remove competitors from the list.
              </p>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search competitors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Add new competitor domain..."
                      value={newCompetitor}
                      onChange={(e) => setNewCompetitor(e.target.value)}
                      className="pl-4 pr-10"
                    />
                    <PlusCircle
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-queryosity-blue cursor-pointer"
                      onClick={handleAddCompetitor}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredCompetitors.map((comp) => (
                    <div
                      key={comp.id}
                      className={`border rounded-lg p-4 transition-colors flex items-center justify-between ${comp.selected
                        ? 'border-queryosity-blue bg-blue-50'
                        : 'border-gray-200'
                        }`}
                    >
                      <div className="flex items-center">
                        <Checkbox
                          id={comp.id}
                          checked={comp.selected}
                          onCheckedChange={() => handleCompetitorToggle(comp.id)}
                          className="mr-3"
                        />
                        <label htmlFor={comp.id} className="text-lg font-medium cursor-pointer">
                          {comp.name}
                        </label>
                      </div>
                      <X
                        className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={() => setCompetitors(competitors.filter(c => c.id !== comp.id))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={() => navigate("/analyze/search-engines", { state: { domain } })}
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
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

export default CompetitorSelection;
