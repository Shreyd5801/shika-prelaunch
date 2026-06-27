import { useState } from 'react';

const API_KEY      = import.meta.env.VITE_WAITLISTER_API_KEY;
const WAITLIST_KEY = import.meta.env.VITE_WAITLISTER_KEY || 'shika';

export function useWaitlist() {
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function submit(email) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(
        `https://waitlister.me/api/v1/waitlist/${WAITLIST_KEY}/sign-up`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
          body:    JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(`You're on the list! 🔥 Position #${data.position ?? ''}`);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  function reset() { setStatus('idle'); setMessage(''); }

  return { status, message, submit, reset };
}
