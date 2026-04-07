import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function MechAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm your MechTech+ AI Assistant. How can I help you today? You can ask me about common vehicle problems, DIY fixes, or troubleshooting tips.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        sender: "bot",
        text: getBotResponse(inputValue.toLowerCase()),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    if (userInput.includes("engine") || userInput.includes("start")) {
      return "For engine starting issues, here are some DIY checks:\n\n1. Check if the battery is charged (look for dim lights)\n2. Ensure the gear is in Park/Neutral\n3. Listen for clicking sounds when turning the key\n4. Check if there's fuel in the tank\n\nIf these don't help, I can connect you with a mechanic nearby. Would you like me to find one?";
    } else if (userInput.includes("battery") || userInput.includes("dead")) {
      return "Battery issues are common! Here's what you can do:\n\n1. Try jump-starting the car\n2. Check for corrosion on battery terminals\n3. Ensure connections are tight\n4. Test with a multimeter (should read 12.6V when off)\n\nIf the battery is more than 3-4 years old, it might need replacement. Should I help you book a mechanic?";
    } else if (userInput.includes("tire") || userInput.includes("puncture")) {
      return "Flat tire? Here's a quick guide:\n\n1. Move to a safe location\n2. Turn on hazard lights\n3. Use the spare tire if available\n4. Loosen lug nuts before jacking up the car\n5. Replace the tire and tighten in a star pattern\n\nNeed immediate roadside assistance? I can find the nearest mechanic for you!";
    } else if (userInput.includes("brake")) {
      return "Brake issues need immediate attention! Common signs:\n\n1. Squeaking or grinding noises\n2. Soft or spongy brake pedal\n3. Vibration when braking\n4. Longer stopping distances\n\n⚠️ This is a safety concern. I recommend booking a mechanic right away. Should I find available mechanics near you?";
    } else if (userInput.includes("oil") || userInput.includes("leak")) {
      return "Oil leak concerns:\n\n1. Check oil level with dipstick\n2. Look for puddles under the car\n3. Check for burning oil smell\n4. Monitor the oil pressure warning light\n\nSmall leaks can worsen quickly. Would you like me to schedule an inspection with a professional mechanic?";
    } else {
      return "I understand you're having vehicle issues. To better assist you, could you please specify:\n\n• What symptoms are you experiencing?\n• Any warning lights on the dashboard?\n• When did the problem start?\n\nOr I can help you:\n✓ Book a mechanic\n✓ Find emergency assistance\n✓ Get DIY troubleshooting tips\n\nWhat would you prefer?";
    }
  };

  const quickQuestions = [
    "My car won't start",
    "Battery is dead",
    "Flat tire help",
    "Brake problems",
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8">
      <div className="mb-6 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="mb-2">MechAgent Assistant</h1>
        <p className="text-muted-foreground">
          Get instant DIY solutions and troubleshooting help
        </p>
      </div>

      <Card className="shadow-xl animate-in fade-in slide-in-from-bottom duration-500">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="size-6" />
            </div>
            <div>
              <p className="text-lg text-white">AI Mechanic Assistant</p>
              <p className="text-sm font-normal text-white/80">Always here to help</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom duration-300 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary text-black"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="size-4" />
                  ) : (
                    <Bot className="size-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-white text-foreground shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-white">
              <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      setInputValue(question);
                    }}
                    className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe your problem..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" disabled={!inputValue.trim()}>
                <Send className="size-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 animate-in fade-in slide-in-from-bottom duration-700">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-center gap-4">
            <Wrench className="size-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold mb-1">Can't fix it yourself?</h4>
              <p className="text-sm text-muted-foreground">
                Book a professional mechanic instantly
              </p>
            </div>
            <Button>Book Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
