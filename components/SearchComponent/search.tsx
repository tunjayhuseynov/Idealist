"use client";

import { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type ContextType<T> = { posts: T[]; setPosts: (value: T[]) => void };

const PostContext = createContext<ContextType<any>>({
  posts: [],
  setPosts: (value: any) => {},
});

export default function SearchComponent<T>({ children }: IProps) {
  const [posts, setPosts] = useState<T[]>([]);

  return (
    <div>
      <PostContext.Provider
        value={{
          posts: [],
          setPosts,
        }}
      >
        <div className="grid grid-cols-[66%,33%]">
          <div id="posts"></div>
          <div id="filter">{children}</div>
        </div>
      </PostContext.Provider>
    </div>
  );
}
