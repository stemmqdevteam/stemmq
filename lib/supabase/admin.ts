/**
 * Admin Supabase client stub for UI-only mode.
 * This module exists to keep legacy imports working without a Supabase backend.
 */
export function createAdminClient() {
  const noopResponse = {
    data: [],
    error: null,
    count: 0,
    session: null,
    user: null,
    subscription: { unsubscribe: () => {} },
  };

  const createChainableQuery = () => {
    const handler: ProxyHandler<any> = {
      get(_, prop) {
        if (prop === "then") {
          return (resolve: (value: any) => unknown, reject?: (reason: unknown) => unknown) =>
            Promise.resolve(noopResponse).then(resolve, reject);
        }
        if (prop === "catch") {
          return (reject: (reason: unknown) => unknown) => Promise.resolve(noopResponse).catch(reject);
        }
        if (prop === Symbol.toStringTag) return "Promise";
        return createChainableQuery();
      },
      apply() {
        return createChainableQuery();
      },
    };

    const query = function () {
      return createChainableQuery();
    };

    return new Proxy(query, handler);
  };

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: async () => ({
        data: { subscription: { unsubscribe: () => {} } },
        error: null,
      }),
      signInWithOAuth: async () => ({ data: { url: "/auth" }, error: null }),
      signInWithOtp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      exchangeCodeForSession: async () => ({ data: { session: null }, error: null }),
    },
    from: (..._args: Array<unknown>) => createChainableQuery(),
    rpc: async (..._args: Array<unknown>) => ({ data: null, error: null }),
  };
}
