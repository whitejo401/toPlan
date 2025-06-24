import type { MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { BellIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | together plan" },
    { name: "description", content: "Share your plans with your Family and Friends" },
  ];
};

export default function HomePage() {
  return (
    <div className="w-full px-80 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-80 py-2">       
      <div className="w-full mb-4">
        <Card className="w-full h-64 md:h-80 flex flex-col bg-transparent hover:bg-card/50 bg-cover bg-center rounded-xl shadow-lg">           
          <CardHeader className="flex flex-col justify-center h-full">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                Plan your week with Family
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              가족과 함께 주간 일정을 계획하고 관리하세요. 약속, 작업, 이벤트를 손쉽게 관리하세요.
            </CardDescription>
          </CardHeader>
          <CardFooter className="py-4">
              <Button variant="outline" className="w-fit">
                Get Started
              </Button>  
          </CardFooter>
        </Card>  
      </div>   

      <div className="w-full mt-4 flex gap-4 h-40 md:h-60">
        <Card className="w-2/3 flex  bg-transparent hover:bg-card/50 bg-cover bg-center rounded-xl shadow-lg">           
          <CardHeader className="flex flex-col">
            <CardTitle className="text-lg font-semibold leading-none tracking-tight">
                Family Members
            </CardTitle>
          </CardHeader>
        </Card>  
        <Card className="w-1/3 flex bg-transparent hover:bg-card/50 bg-cover bg-center rounded-xl shadow-lg">           
          <CardHeader className="flex flex-col">
            <CardTitle className="text-lg font-semibold leading-none tracking-tight">
                Quick Actions
            </CardTitle>
          </CardHeader>
        </Card>
      </div>     
    </div>
  );
}