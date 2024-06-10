"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

function ReactQueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
