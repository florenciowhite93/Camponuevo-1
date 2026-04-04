import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface AuditEvent {
  action: 'LOGIN' | 'LOGIN_FAILED' | 'REGISTER' | 'REGISTER_FAILED' | 'ACCESS_DENIED';
  user_email?: string;
  user_id?: string;
}

export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    await supabase.rpc('insert_audit_log', {
      p_table_name: 'auth',
      p_action: event.action,
      p_user_email: event.user_email,
      p_user_id: event.user_id,
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}
