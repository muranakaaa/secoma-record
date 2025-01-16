'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getShops } from '../lib/api';
import { Button } from './components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command';

type Shop = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

const HomePage = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const [inputText, setInputText] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops();
        setShops(data);
        setSearchResults(data); // 初期状態で全て表示
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    if (inputText) {
      setSearchResults(
        shops.filter((shop) =>
          shop.name.toLowerCase().includes(inputText.toLowerCase()),
        ),
      );
    } else {
      setSearchResults(shops);
    }
  }, [inputText, shops]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input && e.key === 'Escape') {
        input.blur();
      }
    },
    [],
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <Command
          shouldFilter={false}
          onKeyDown={handleKeyDown}
          className="relative w-full max-w-lg mx-auto"
        >
          <CommandInput
            ref={inputRef}
            value={inputText}
            placeholder="店舗名を検索"
            onValueChange={(text) => setInputText(text)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            className="border rounded-md px-4 py-2 w-full"
          />
          <div className="relative mt-2">
            {open && (
              <CommandList className="absolute left-0 top-0 w-full bg-white rounded shadow-md">
                <CommandEmpty className="p-4 text-gray-500">
                  一致する店舗が見つかりません
                </CommandEmpty>
                {searchResults.map((shop) => (
                  <CommandItem
                    key={shop.id}
                    value={shop.name}
                    onSelect={() => {
                      setInputText(shop.name);
                      setOpen(false);
                    }}
                    className="p-4 hover:bg-gray-100"
                  >
                    {shop.name}
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </div>
        </Command>
      </div>

      <h1 className="text-2xl font-bold mb-4">セイコーマート店舗一覧</h1>
      <ul className="space-y-4">
        {searchResults.map((shop) => (
          <li key={shop.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{shop.name}</h2>
            <p>住所: {shop.address}</p>
            <Link href={`/shop/${shop.id}`} className="text-blue-500 underline">
              <Button>詳細を見る</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
