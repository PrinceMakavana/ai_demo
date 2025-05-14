import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetDomainDataMutation } from "@/store/services/project";
import { useDispatch } from "react-redux";
import { setDomainData } from "@/store/services/domainData";

const Hero = () => {
  const [getDomainData, { isLoading: domainDataLoading, isError: hasError }] = useGetDomainDataMutation();
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleAnalyze = async () => {
    if (domain.trim()) {
      try {
        const data = await getDomainData({ domain_name: domain })
          .unwrap();
        toast.success("Domain data fetched successfully");

        // Set domain data to Redux store
        dispatch(setDomainData(data));

      } catch (error) {
        console.error("Error fetching domain data:", error);
        toast.error("Failed to fetch domain data");
      }
      navigate("/analyze/search-engines", { state: { domain } });
    } else {
      toast.error("Please enter a domain to analyze");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="w-full py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-queryosity-blue mb-6 animate-fade-in">
          AI Search Is Changing Everything.
          <br />
          <span className="text-queryosity-teal">Is Your Brand Ready?</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          AI-powered search is transforming how customers find you online.
          Ensure your brand stays visible and relevant with Queryosity's
          AI Search Readiness platform.
        </p>

        <div className="w-full max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter the domain you want to check AI Search Readiness for"
              className="text-base px-4 py-6 flex-grow"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleAnalyze}
              className="bg-queryosity-blue hover:bg-queryosity-dark text-white px-8 py-6 text-base"
            >
              Analyze Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
