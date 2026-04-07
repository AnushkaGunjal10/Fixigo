import { useNavigate } from "react-router";
import {
  Wrench,
  Zap,
  Droplet,
  Wind,
  Gauge,
  AlertCircle,
  Battery,
  Disc,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export function IssueSelection() {
  const navigate = useNavigate();

  const issues = [
    {
      id: "engine",
      title: "Engine Problem",
      icon: Wrench,
      color: "bg-red-50 text-red-600 hover:bg-red-100",
      iconBg: "bg-red-100",
    },
    {
      id: "battery",
      title: "Battery Issue",
      icon: Battery,
      color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
      iconBg: "bg-yellow-100",
    },
    {
      id: "puncture",
      title: "Flat Tire / Puncture",
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      iconBg: "bg-orange-100",
    },
    {
      id: "brake",
      title: "Brake Problem",
      icon: Disc,
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      iconBg: "bg-purple-100",
    },
    {
      id: "electrical",
      title: "Electrical Issue",
      icon: Zap,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      iconBg: "bg-blue-100",
    },
    {
      id: "oil",
      title: "Oil Leak",
      icon: Droplet,
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      iconBg: "bg-green-100",
    },
    {
      id: "ac",
      title: "AC Problem",
      icon: Wind,
      color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100",
      iconBg: "bg-cyan-100",
    },
    {
      id: "speedometer",
      title: "Gauge Issue",
      icon: Gauge,
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
      iconBg: "bg-indigo-100",
    },
  ];

  const handleIssueSelect = (issueId: string) => {
    navigate("/app/mechanics");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 md:pb-8">
      <div className="text-center animate-in fade-in slide-in-from-top duration-500">
        <h1 className="mb-2">What's the Issue?</h1>
        <p className="text-muted-foreground">
          Select the problem you're experiencing with your vehicle
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {issues.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <div
              key={issue.id}
              className="animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card
                className={`${issue.color} cursor-pointer border-2 border-transparent hover:border-current transition-all shadow-md hover:shadow-lg hover:scale-105 duration-300`}
                onClick={() => handleIssueSelect(issue.id)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className={`${issue.iconBg} size-16 rounded-full flex items-center justify-center`}>
                    <Icon className="size-8" />
                  </div>
                  <h3 className="font-bold">{issue.title}</h3>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <AlertCircle className="size-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Need Emergency Assistance?</h3>
            <p className="text-white/90 mb-4">
              If you're in an emergency situation, we can connect you with the nearest available mechanic immediately.
            </p>
            <button
              onClick={() => navigate("/app/mechanics")}
              className="bg-secondary text-black px-8 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
            >
              Get Emergency Help Now
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}