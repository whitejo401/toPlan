import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { BellIcon, PlusIcon, UsersIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { browserClient, makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | together plan" },
    { name: "description", content: "Share your plans with your Family and Friends" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = makeSSRClient(request); 
}


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
              함께하는 순간을 더욱 특별하게. 가족의 일정을 한눈에 보고 소통하세요.
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
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/whitejo401.png" className="h-16 w-16" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-800">Jonet</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  <span>Available</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://private-user-images.githubusercontent.com/35785822/459433827-00ec3876-d844-4a59-891d-569d2ae945de.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTA5NDUxNjQsIm5iZiI6MTc1MDk0NDg2NCwicGF0aCI6Ii8zNTc4NTgyMi80NTk0MzM4MjctMDBlYzM4NzYtZDg0NC00YTU5LTg5MWQtNTY5ZDJhZTk0NWRlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjI2VDEzMzQyNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU2NzQ4NmM4MGM0MTAzZDQ4ODUyODBiOTEyMzIxNzM5ODVmMGRiMDc1MTNmZDY0Y2JkOTVkYzYzNjM3NWUyMzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ehS28r2t_6UTciDyjsmOz0j5vFUMjO7q2JHbOgyGrEU" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-800">Lee</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                  <span>Busy</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://private-user-images.githubusercontent.com/35785822/459433982-1433d781-b2c9-4bce-8039-7d5482095be1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTA5NDUxNjQsIm5iZiI6MTc1MDk0NDg2NCwicGF0aCI6Ii8zNTc4NTgyMi80NTk0MzM5ODItMTQzM2Q3ODEtYjJjOS00YmNlLTgwMzktN2Q1NDgyMDk1YmUxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjI2VDEzMzQyNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFlNjJhYjBmNmY5ZjExYjFkODYwODAyMDkxYzdlZGZhZjBhMWUzMDVkZTQxNzJjNjJkZjMyZDFmZTY5OWViMmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.tP-W_xl19ahYdwH6ot5ej5Jh6jB2yB7K7o8f3JXw3CM" />
                  <AvatarFallback>N</AvatarFallback>
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