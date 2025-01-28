"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserState } from "../../hooks/useGlobalState";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header = () => {
  const [user] = useUserState();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user.name && user.name.trim() !== "" ? user.name : "テストユーザー";

  return (
    <header className="bg-zinc-300 py-4 px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white">Secoma-Record</span>
        </Link>
        {user.isFetched && (
          <div>
            {!user.isSignedIn ? (
              <div className="flex space-x-4">
                <Link href="/sign_in">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">Sign In</Button>
                </Link>
                <Link href="/sign_up">
                  <Button className="bg-gray-500 text-white hover:bg-gray-600">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="font-semibold">
                      {displayName}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/visit_records" className="w-full">
                        訪問記録を見る
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/sign_out" className="w-full">
                        サインアウト
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
