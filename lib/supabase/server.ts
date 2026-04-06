type NoopResponse = {
  data: any;
  error: null;
  count?: number;
  session?: null;
  user?: null;
  subscription?: { unsubscribe: () => void };
};

const noopResponse: NoopResponse = {
  data: [],
  error: null,
  count: 0,
  session: null,
  user: null,
  subscription: { unsubscribe: () => {} },
};

function createChainableQuery() {
  const handler: ProxyHandler<any> = {
    get(_, prop) {
      if (prop === "then") {
        return (resolve: (value: NoopResponse) => unknown, reject?: (reason: unknown) => unknown) =>
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
}

export async function createClient() {
  const auth = {
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
  };

  return {
    auth,
    from: () => createChainableQuery(),
    rpc: async () => ({ data: null, error: null }),
  };
}
