import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { BarChart3Icon, BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";

const menus = [
    {
        name:"Dashboard",
        to:"/dashboard"      
    },
    {
        name:"Schedules",
        to:"/schedules"      
    },
    {
        name:"Tasks",
        to:"/tasks"      
    },
    {
        name:"Groups",
        to:"/groups"      
    }
];

export default function Navigation({}) {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-80 py-2">
      <div className="flex items-center justify-between">
        <span className="text-lx font-bold">Family Planner</span>

        <NavigationMenu>
            <NavigationMenuList>
                {menus.map((menu) => (
                    <NavigationMenuItem key={menu.name}>
                        {
                            menu.items ? (
                                <>
                                    <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        {menu.items.map((item) => (
                                            <NavigationMenuItem key={item.name}>
                                                <NavigationMenuLink asChild>
                                                    <Link to={item.to}>{item.name}</Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                                  {menu.name}
                                </Link> 
                            )
                        }
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>    

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/notifications">
                <BellIcon className="size-4" />
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              </Link>
          </Button>       
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/whitejo401.png" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">SJ Kim</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my/profile">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my/settings">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/logout">
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>  
        </div>        
      </div>
    </div>
  );
}