"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocateFixed, Lock, LogOut, Mic, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { axiosPrivate } from "@/config/axios";
import useAuth from "@/hooks/useAuth";
import { generateErrorMessage } from "@/lib/utils";

export default function NavUser() {
  const { logOut, auth } = useAuth();
  const handleLogout = async () => {
    try {
      await axiosPrivate("/auth/logout");
      logOut();
    } catch (error) {
      toast.error(generateErrorMessage(error));
    }
  };

  console.log("User: ", auth.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer">
          <Avatar>
            <AvatarImage
              src={
                auth?.user?.image
                  ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${auth.user.image}`
                  : undefined
              }
            />
            <AvatarFallback>
              {auth?.user?.name?.[0]}

            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>

          <DropdownMenuLabel>
            {auth?.user?.name}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem
            render={<Link href="/profile?tab=profile" />}
          >
            <User size={16} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile?tab=address" />}
          >
            <LocateFixed size={16} />
            Address
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile?tab=password" />}
          >
            <Lock size={16} />
            Password
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile?tab=orders" />}
          >
            <ShoppingBag size={16} />
            Orders
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile?tab=requests" />}
          >
            <Mic size={16} />
            Requests
          </DropdownMenuItem>

        </DropdownMenuGroup>


        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<button type="button" onClick={handleLogout} />}
          variant="destructive"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
