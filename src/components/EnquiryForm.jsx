import { useState } from 'react';
import { useLanguage } from '../LanguageContext.jsx';
import { firebaseReady, sendEnquiry } from '../firebase.js';

const EMPTY = { name: '', email: '', message: '' };

export default function EnquiryForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  if (!firebaseReady) return null;

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (status === 'sent' || status === 'failed') setStatus('idle');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    sendEnquiry(values)
      .then(() => { setValues(EMPTY); setStatus('sent'); })
      .catch(() => setStatus('failed'));
  };

  return (
    <form className="enquiry-form rounded-[var(--radius)] mt-8 mx-auto max-w-[620px] p-6 text-left grid gap-3" onSubmit={onSubmit}>
      <h3 className="enquiry-title text-[1.05rem] font-semibold">{f.title}</h3>
      <div className="grid gap-3 min-[521px]:grid-cols-2">
        <input className="enquiry-input" name="name" type="text" required maxLength={100} placeholder={f.name} aria-label={f.name} value={values.name} onChange={onChange} />
        <input className="enquiry-input" name="email" type="email" required maxLength={150} placeholder={f.email} aria-label={f.email} value={values.email} onChange={onChange} />
      </div>
      <textarea className="enquiry-input" name="message" required maxLength={2000} rows={4} placeholder={f.message} aria-label={f.message} value={values.message} onChange={onChange} />
      <div className="flex items-center gap-3 flex-wrap">
        <button type="submit" className="btn btn-primary enquiry-submit relative inline-flex items-center gap-2 px-[26px] py-[13px] rounded-full font-semibold text-[0.95rem] text-white border-none cursor-pointer" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.send}
        </button>
        {status === 'sent' && <span className="enquiry-status ok" role="status">{f.sent}</span>}
        {status === 'failed' && <span className="enquiry-status fail" role="alert">{f.failed}</span>}
      </div>
    </form>
  );
}
