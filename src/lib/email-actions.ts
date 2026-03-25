import { getResendClient, FROM_EMAIL, ADMIN_EMAIL } from './email';

interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function sendEmailSafe({
  to,
  subject,
  react,
  retryCount = 2,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  retryCount?: number;
}): Promise<EmailResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const { data, error } = await getResendClient().emails.send({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        react,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, id: data?.id };
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retryCount) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error('Email failed after retries:', lastError);
  return { success: false, error: lastError?.message || 'Unknown error' };
}

export { ADMIN_EMAIL };
