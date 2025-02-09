"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import Typist from "react-typist";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [answer, setAnswer] = React.useState<string>("");

  const [isVisible, setIsVisible] = React.useState(false);
  const [displaySeeYou, setDisplay] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const sendEmail = async () => {
    let formattedDate = "";
    if (date) {
      formattedDate = date
        .toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
        .replace(" ", "-");
    }

    let subjectValue =
      answer === "Yes"
        ? "Icaiii said yes, Yayyy :>>"
        : "Icaii saidd no, meow meow meow meoww :<";
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "melcarlo.iguis@gmail.com",
          subject: subjectValue,
          html: `<p>When: ${formattedDate}</strong>!</p>`,
        }),
      });

      const result = await response.json();
      console.log("Email sent:", result);
      if (answer === "Yes") {
        setDisplay(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  if (displaySeeYou) {
    return (
      <div style={{ padding: "2rem", fontSize: "24px" }}>
        <p style={{ display: "inline" }}>Yayy, seee youuu Icaiii hehe</p>
        <Image src="/images/see-you.gif" alt="cat" width={250} height={250} />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontSize: "24px" }}>
      <Typist>
        <p>Hello Icaii,</p>
        <Typist.Delay ms={1000} />
        <br />
        <p style={{ display: "inline" }}>Will you be my duo forever?</p>
        <Typist.Backspace count={12} delay={100} />
        valentine? hehe
        <Typist.Delay ms={1000} />
        <br />
      </Typist>
      {isVisible && (
        <>
          <RadioGroup value={answer} onValueChange={setAnswer}>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="r1" />
                <Label htmlFor="r1" className="text-lg font-semibold">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="r2" />
                <Label htmlFor="r2" className="text-lg font-semibold">
                  No
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {answer === "" ? (
              <Image
                src="/images/please.gif"
                alt="cat"
                width={250}
                height={250}
              />
            ) : answer === "Yes" ? (
              <Image src="/images/yay.gif" alt="cat" width={250} height={250} />
            ) : (
              <Image src="/images/sad.gif" alt="cat" width={250} height={250} />
            )}
          </div>
        </>
      )}

      {answer !== "" && (
        <>
          {answer === "Yes" && <p>Pili ka po date, hehe</p>}
          <div className="flex gap-2 mt-2 justify-between">
            <Popover onOpenChange={setOpen} open={isOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  onClick={() => setOpen(true)}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  disabled={(date) =>
                    date.getTime() < new Date().setHours(0, 0, 0, 0)
                  } // ✅ Convert both to timestamps
                  mode="single"
                  selected={date}
                  onSelect={(e) => {
                    setDate(e);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={sendEmail}>Send answer</Button>
          </div>
        </>
      )}
    </div>
  );
}
