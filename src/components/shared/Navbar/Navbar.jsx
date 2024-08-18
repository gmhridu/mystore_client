import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Keyboard,
  CreditCard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  User,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navList = (
    <ul className="menu menu-horizontal px-1 text-base font-medium flex space-x-6">
      <NavLink
        className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        to={"/about"}
      >
        About
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        to={"/service"}
      >
        Service
      </NavLink>
    </ul>
  );

  return (
    <main>
      <nav className="flex justify-between px-8 items-center py-6">
        <section className="flex items-center gap-x-6">
          {/* menu */}
          <div className="block sm:hidden">
            <Sheet>
              <SheetTrigger className="outline-none" asChild>
                <FiMenu className="text-3xl cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full justify-center items-center">
                  {navList}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* logo */}
          <Link to={"/"} className="text-4xl">
            My Shop
          </Link>
          {/* desktop menu */}
          <div className="hidden sm:block">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
            >
              {navList}
            </motion.div>
          </div>
        </section>
        {/* sidebar mobile menu */}
        <section className="flex items-center gap-4">
          {/* card icon */}
          <AiOutlineShoppingCart className="text-2xl" />
          {/*  avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2 cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard className="mr-2 h-4 w-4" />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Team</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </nav>
      <hr />
    </main>
  );
};

export default Navbar;
