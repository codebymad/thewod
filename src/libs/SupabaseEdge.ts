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

export async function getDailyWod(input: string) {
    const res = await callEdgeFunction("daily-wod", { input });

    if (!res || !res.object) return null;

    const meta =
        res.bucket.name +
        "_" +
        res.folder.name +
        "_" +
        res.file.name +
        "_" +
        res.objectIndex;

    return {
        data: res.object,
        meta,
    };
}

export async function getWeeklyWod(week: number, year: number) {
    const res = await callEdgeFunction("weekly-wod", {
        week: String(week),
        year: String(year),
    });

    if (!res || !Array.isArray(res)) return null;

    return res;
}