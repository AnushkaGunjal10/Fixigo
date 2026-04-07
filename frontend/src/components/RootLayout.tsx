import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, Car, Wrench, MessageSquare, User, LogOut, Bell } from "lucide-react";
import { FloatingChatbot } from "./FloatingChatbot";
import { getNotifications } from "../services/api";

type Notification = {
  id: string;
  message: string;
};

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: "Dashboard", path: "/app", icon: Home },
    { name: "Vehicles", path: "/app/add-vehicle", icon: Car },
    { name: "Mechanics", path: "/app/mechanics", icon: Wrench },
    { name: "Assistant", path: "/app/assistant", icon: MessageSquare },
    { name: "Profile", path: "/app/profile", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    getNotifications(user.user_id).then((data) => {
      setNotifications(Array.isArray(data) ? data : []);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <Wrench className="size-8" />
            <div>
              <h1 className="text-xl font-bold text-white">MechTech+</h1>
              <p className="text-xs text-white/80">Smart Mechanic Booking</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((currentValue) => !currentValue)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Bell className="size-4" />
                <span>Notifications ({notifications.length})</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-lg border bg-white text-foreground shadow-xl p-3 space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No notifications yet.</p>
                  ) : (
                    notifications.map((notification) => (
                      <p key={notification.id} className="rounded-md bg-slate-50 p-2 text-sm">
                        {notification.message}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <FloatingChatbot />

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="flex items-center justify-around py-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-muted-foreground transition-colors"
          >
            <LogOut className="size-5" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
