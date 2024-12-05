'use server';

import { cookies } from 'next/headers';

export async function getCookies(): Promise<string> {
    const cookieStore = await cookies();

    return cookieStore.toString();
}
