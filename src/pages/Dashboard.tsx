
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
          <p className="text-gray-600">View your recent activities and updates</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <p className="text-gray-600">Your active projects</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Data Sources</h2>
          <p className="text-gray-600">Connected data sources</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
