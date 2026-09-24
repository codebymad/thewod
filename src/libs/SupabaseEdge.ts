import { supabaseUrl, supabaseAnonKey } from "./SupabaseClient";

export async function callEdgeFunction(path: string, query: Record<string, string>) {
  const url = new URL(`${supabaseUrl}/functions/v1/${path}`);

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${supabaseAnonKey}`
    }
  });

  if (!res.ok) {
    console.error("Edge function error:", await res.text());
    return null;
  }

  return await res.json();
}

export async function callEdgeFunctionNEW(
  path: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  }
) {
  const url = new URL(`${supabaseUrl}/functions/v1/${path}`);

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${supabaseAnonKey}`,
      ...(options.headers ?? {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) return null;
  return await res.json();
}


export async function getDailyWod(input: string) {
  const res = await callEdgeFunction("daily-wod", { input });

  if (!res || !res.data) return null;
  return {
    data: res.data,
    id: res.id,
  };
}

export async function getDailyWodDB_HOME() {
  const res = await callEdgeFunction("addwod-agent", { home: "" });

  if (!res) return null;
  return res;
}

export async function getDailyWodDB_ALL() {
  const res = await callEdgeFunction("addwod-agent", { all: "" });

  if (!res) return null;
  return res;
}


export async function setUpdatedWOD(id: string, key: string, body: any = {}) {
  const res = await callEdgeFunctionNEW("update-wod", {
    method: "POST",
    headers: {
      id,
      key
    },
    body
  });

  if (!res) return null;
  return res;
}




export async function getWeeklyWod(week: number, year: number) {
  const res = await callEdgeFunction("weekly-wod", {
    week: String(week),
    year: String(year),
  });

  if (!res || !Array.isArray(res)) return null;

  return res;
}