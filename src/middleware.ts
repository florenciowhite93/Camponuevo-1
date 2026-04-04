import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const path = request.nextUrl.pathname;

  const sensitivePaths = ['/login', '/registro', '/checkout'];
  const isSensitivePath = sensitivePaths.some(p => path.startsWith(p));

  if (isSensitivePath) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const rateLimitKey = `rate:${ip}:${path}`;

    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor intenta de nuevo en 15 minutos.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      );
    }
  }

  if (path.startsWith('/admin')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', '/admin');
      return NextResponse.redirect(redirectUrl);
    }

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!perfil?.is_admin) {
      const redirectUrl = new URL('/', request.url);
      redirectUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/registro', '/checkout'],
};
