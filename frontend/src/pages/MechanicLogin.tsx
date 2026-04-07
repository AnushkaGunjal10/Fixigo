import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Wrench } from "lucide-react";
import { loginMechanic } from "../services/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function MechanicLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await loginMechanic(email.trim(), password.trim());

    if (res.status === "success") {
      localStorage.setItem("mechanic", JSON.stringify(res));
      alert("Mechanic login successful");
      navigate("/mechanic");
    } else {
      alert("Invalid mechanic credentials");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="size-6 text-primary" />
            Mechanic Login
          </CardTitle>
          <CardDescription>Login to accept or reject assigned bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mechanic-email">Email</Label>
              <Input
                id="mechanic-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanic-password">Password</Label>
              <Input
                id="mechanic-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
