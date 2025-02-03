"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserState } from "../../hooks/useGlobalState";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header = () => {
  const [user] = useUserState();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-400 to-orange-500 py-2 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white hover:text-orange-100 transition-colors duration-200 flex items-center">
          <Image src="/logo.svg" alt="Logo" width={24} height={24} className="mr-2" />
          <span className="text-xl font-bold">Secoma-Record</span>
        </Link>
        {user.isFetched && (
          <div>
            {!user.isSignedIn ? (
              <div className="flex space-x-2">
                <Link href="/sign_in">
                  <Button size="sm" variant="secondary" className="bg-white text-orange-500 hover:bg-orange-100">ログイン</Button>
                </Link>
                <Link href="/sign_up">
                  <Button size="sm" variant="secondary" className="bg-white text-orange-500 hover:bg-orange-100">新規登録</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-orange-500">
                    <span className="mr-2">{user.name || "テストユーザー"}</span>
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
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
