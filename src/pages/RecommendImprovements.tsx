import React, { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ChevronDown, Search, Settings2, Sparkles, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Improvement {
  url: string;
  status: "Critical" | "Warning" | "Good";
  issues: {
    title: string;
    description: string;
    severity: "Critical" | "Warning" | "Good";
  }[];
}

type FilterStatus = 'All' | 'Critical' | 'Warning' | 'Good';

const RecommendImprovements = (): JSX.Element => {
  const pageSizeOptions = [5, 10, 25, 50];
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

  const [pages] = useState<Improvement[]>([
    {
      url: "https://example.com/home",
      status: "Critical",
      issues: [
        {
          title: "Optimize Image Loading",
          description: "Large hero images are causing slow page load times. Implement lazy loading and image optimization.",
          severity: "Critical"
        },
        {
          title: "Meta Description Missing",
          description: "Add meta description to improve SEO performance and search result appearance.",
          severity: "Warning"
        }
      ]
    },
    {
      url: "https://example.com/products",
      status: "Warning",
      issues: [
        {
          title: "Mobile Responsiveness Issues",
          description: "Product grid layout breaks on mobile devices. Implement responsive design fixes.",
          severity: "Warning"
        }
      ]
    },
    {
      url: "https://example.com/about",
      status: "Good",
      issues: [
        {
          title: "Content Readability",
          description: "Improve text contrast and paragraph spacing for better readability.",
          severity: "Good"
        }
      ]
    }
  ]);

  const getFilteredPages = useCallback(() => {
    return pages.filter(page => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          page.url.toLowerCase().includes(searchLower) ||
          page.issues.some(issue =>
            issue.title.toLowerCase().includes(searchLower) ||
            issue.description.toLowerCase().includes(searchLower)
          )
        );
      }
      return true;
    }).filter(page => {
      if (filterStatus === 'All') return true;
      return page.status === filterStatus;
    });
  }, [searchQuery, filterStatus, pages]);

  return (
    <div className="min-h-screen w-full min-w-[100vh] bg-background">
      <div className="flex-1 space-y-4 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-queryosity-blue mb-2">
            Recommend Improvements
            </h1>
            <p className="text-gray-600">
              Analyze and implement AI-powered improvements for your website
            </p>
          </div>
        </div>

        <div className="flex-1 grid gap-4 md:grid-cols-[1fr_auto_auto_auto] items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Status: {filterStatus}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => {
                  setFilterStatus('All');
                  setCurrentPage(1);
                }}>
                  <Settings2 className="h-4 w-4 mr-2" />
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setFilterStatus('Critical');
                  setCurrentPage(1);
                }}>
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Critical
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setFilterStatus('Warning');
                  setCurrentPage(1);
                }}>
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                  Warning
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setFilterStatus('Good');
                  setCurrentPage(1);
                }}>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Good
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Show: {pageSize}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {pageSizeOptions.map(size => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                  >
                    {size} per page
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full min-w-[100vh] mx-auto">
          <div className="grid gap-4 w-full">
            {getFilteredPages()
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((page, index) => (
              <Card key={index} className="overflow-hidden w-full">
                <CardContent className="p-6 w-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          {page.url}
                          <span className={`text-sm px-2 py-0.5 rounded ${page.status === "Critical" ? "bg-red-100 text-red-700" : page.status === "Warning" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                            {page.status}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Fix with AI
                    </Button>
                  </div>

                  <div className="w-full space-y-4">
                    {page.issues.map((issue, issueIndex) => (
                      <div
                        key={issueIndex}
                        className="flex items-start gap-4 p-4 rounded-lg border"
                      >
                        <div className={`rounded-full p-2 ${issue.severity === "Critical" ? "bg-red-100" : issue.severity === "Warning" ? "bg-yellow-100" : "bg-green-100"}`}>
                          <AlertCircle className={`h-5 w-5 ${issue.severity === "Critical" ? "text-red-500" : issue.severity === "Warning" ? "text-yellow-500" : "text-green-500"}`} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{issue.title}</h4>
                          <p className="text-gray-600 text-sm">{issue.description}</p>
                        </div>
                        <Button
                          className="ml-auto"
                          variant="outline"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Fix with AI
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div className="text-sm text-gray-500">
            {(() => {
              const filteredPages = getFilteredPages();
              const total = filteredPages.length;
              if (total === 0) return 'No results found';
              
              const start = (currentPage - 1) * pageSize + 1;
              const end = Math.min(currentPage * pageSize, total);
              return `Showing ${start} to ${end} of ${total} results`;
            })()} 
          </div>
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
            <div className="flex items-center gap-2 min-w-max">
              <Button 
                variant="outline" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="whitespace-nowrap"
              >
                Previous
              </Button>
              {Array.from(
                { length: Math.ceil(getFilteredPages().length / pageSize) },
                (_, i) => i + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  className={`${currentPage === page ? 'bg-blue-50' : ''} min-w-[40px]`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button 
                variant="outline" 
                disabled={currentPage >= Math.ceil(getFilteredPages().length / pageSize)}
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(getFilteredPages().length / pageSize), prev + 1))}
                className="whitespace-nowrap"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendImprovements;
