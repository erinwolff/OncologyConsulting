import { useState } from 'react';
import { EMAIL, FORMSPREE_ENDPOINT } from '../site';

// Posts straight to Formspree, so no extra client library is needed.
// Spam protection: the hidden "_gotcha" field is Formspree's honeypot. Bots
// fill it in and Formspree silently drops those submissions.
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrors([]);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setErrors((data.errors ?? []).map((err) => err.message).filter(Boolean));
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-card form-card--success" role="status">
        <p>Thank you for your message!</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={6} required maxLength={5000} />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <div className="form-error" role="alert">
          {errors.length > 0 ? (
            <ul>{errors.map((m) => <li key={m}>{m}</li>)}</ul>
          ) : (
            <p>
              Sorry, your message could not be sent. Please try again or email{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          )}
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
