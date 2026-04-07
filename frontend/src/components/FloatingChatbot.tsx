import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const getBotResponse = (userInput: string) => {
  if (userInput.includes("engine") || userInput.includes("start")) {
    return "For engine starting issues: check battery charge, fuel level, and whether the gear is in Park/Neutral. If you hear clicking, it may be a weak battery or starter issue.";
  }

  if (userInput.includes("battery") || userInput.includes("dead")) {
    return "For battery issues: try a jump start, check terminal corrosion, and make sure connections are tight. If the battery is older than 3-4 years, replacement may be needed.";
  }

  if (userInput.includes("tire") || userInput.includes("tyre") || userInput.includes("puncture")) {
    return "For a flat tyre: move to a safe spot, turn on hazard lights, use the spare tyre or puncture kit, and book a mechanic if you are not comfortable changing it.";
  }

  if (userInput.includes("brake")) {
    return "Brake issues are critical. If you hear grinding, feel vibration, or the pedal feels soft, avoid driving and book a mechanic immediately.";
  }

  if (userInput.includes("oil") || userInput.includes("leak")) {
    return "For oil leak concerns: check the dipstick, look for puddles under the vehicle, and watch for oil pressure warnings. Small leaks can get worse quickly.";
  }

  return "Tell me the symptom, warning light, sound, or vehicle issue. I can suggest a quick check or help you decide whether to book a mechanic.";
};

const quickQuestions = [
  "My car won't start",
  "Battery is dead",
  "Flat tire help",
  "Brake problems",
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi, I am your mechanic assistant. What vehicle issue are you facing?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(trimmedInput.toLowerCase()),
      },
    ]);
    setInputValue("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-6">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border bg-white shadow-2xl overflow-hidden">
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="size-5" />
              <div>
                <p className="font-bold text-white">Mechanic Assistant</p>
                <p className="text-xs text-white/80">Rule-based quick help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto bg-slate-50 p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-foreground shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="border-t bg-white p-3">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleQuickQuestion(question)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs hover:bg-slate-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t bg-white p-3 flex gap-2">
            <Input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Describe your issue..."
            />
            <Button onClick={handleSend} size="icon" disabled={!inputValue.trim()}>
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="size-14 rounded-full shadow-xl"
        aria-label="Open mechanic assistant"
      >
        <Bot className="size-6" />
      </Button>
    </div>
  );
}
