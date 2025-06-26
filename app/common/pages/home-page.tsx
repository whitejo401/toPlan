import type { MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { BellIcon, PlusIcon, UsersIcon } from "lucide-react";
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
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-80 py-2">       
      <div className="w-full mb-4">
        <Card className="w-full min-h-[16rem] md:h-80 flex flex-col bg-transparent hover:bg-card/50 bg-cover bg-center rounded-xl shadow-lg">           
          <CardHeader className="flex flex-col justify-center h-full">
            <CardTitle className="text-xl sm:text-2xl font-semibold leading-tight sm:leading-none tracking-tight">
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

      <div className="w-full mt-4 flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/3 bg-transparent shadow-lg min-h-[16rem] md:h-60">           
          <CardHeader>
            <CardTitle>Family Members</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 justify-start">         
              <div className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarImage src="https://github.com/whitejo401.png" className="h-10 w-10" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-800">Jonet</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  <span>Available</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarImage src="https://placehold.co/60x60/FFD700/333333?text=L" className="h-10 w-10" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-800">Lee</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                  <span>Busy</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarImage src="https://placehold.co/60x60/8A2BE2/FFFFFF?text=J" className="h-10 w-10" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-800">Jaelyn</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-orange-500 mr-1"></span>
                  <span>At schhol</span>
                </div>
              </div>              
          </CardContent>
        </Card>  
        <Card className="w-full flex-col md:w-1/3 min-h-[16rem] md:h-60 bg-transparent rounded-xl shadow-lg">           
          <CardHeader className="flex flex-col">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="w-full text-left" asChild>
              <Link to="/tasks/create" className="flex items-center">
                <PlusIcon className="w-4 h-4" />
                <span className="w-24">Add Task</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full text-left" asChild>
              <Link to="/groups" className="flex items-center">
                <UsersIcon className="w-4 h-4" />
                <span className="w-24">Manage Groups</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>     
    </div>
  );
}