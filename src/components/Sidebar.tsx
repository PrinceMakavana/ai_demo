
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search, Users, ListFilter, LayoutDashboard, Home } from "lucide-react";

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between">
            <div className="text-lg font-bold text-queryosity-blue">Queryosity</div>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === '/'} 
                  onClick={() => navigate('/')}
                  tooltip="Home"
                >
                  <Home className="mr-2" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === '/analyze/search-engines'} 
                  onClick={() => navigate('/analyze/search-engines', { state: { domain: "example.com" } })}
                  tooltip="Search Engines"
                >
                  <Search className="mr-2" />
                  <span>Search Engines</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === '/analyze/competitors'} 
                  onClick={() => navigate('/analyze/competitors', { state: { domain: "example.com", selectedEngines: ["perplexity"] } })}
                  tooltip="Competitors"
                >
                  <Users className="mr-2" />
                  <span>Competitors</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === '/analyze/queries'} 
                  onClick={() => navigate('/analyze/queries', { 
                    state: { 
                      domain: "example.com", 
                      selectedEngines: ["perplexity"], 
                      selectedCompetitors: ["competitor1.com"] 
                    } 
                  })}
                  tooltip="Queries"
                >
                  <ListFilter className="mr-2" />
                  <span>Queries</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === '/dashboard'} 
                  onClick={() => navigate('/dashboard', { 
                    state: { 
                      domain: "example.com", 
                      selectedEngines: ["perplexity"], 
                      selectedCompetitors: ["competitor1.com"],
                      queries: [{ id: "q1", text: "product features", importance: 4 }]
                    } 
                  })}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
