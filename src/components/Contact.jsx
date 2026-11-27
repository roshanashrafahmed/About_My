import { useLanguage } from '../LanguageContext.jsx';
import EnquiryForm from './EnquiryForm.jsx';
import { ICONS } from './icons.jsx';

export default function Contact() {
  const { t } = useLanguage();

  const cards = [
    { icon: 'mail', label: t.contact.email, value: 'roshankurshankmb@gmail.com', href: 'mailto:roshankurshankmb@gmail.com' },
    { icon: 'phone', label: t.contact.phone, value: '+91 82707 81635', href: 'tel:+918270781635' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'roshanfullstack', href: 'https://linkedin.com/in/roshanfullstack', external: true },
    { icon: 'pin', label: t.contact.location, value: t.contact.locationValue, href: 'https://www.google.com/maps/search/?api=1&query=Namakkal%2C+India', external: true },
  ];

  return (
    <section className="section contact-section relative overflow-hidden text-center py-[50px]" id="contact">
      <div className="rain-lines absolute inset-0 flex justify-evenly z-[1] pointer-events-none" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="container contact-inner relative z-[2] w-full max-w-[1180px] mx-auto px-6" data-animate>
        <h2 className="section-title centered relative flex w-fit mx-auto items-center justify-center gap-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.02em] mb-3 pb-2.5"><span className="tag text-[0.8rem] font-bold rounded-lg px-3 py-1.5">{t.contact.tag}</span>{t.contact.title}</h2>
        <p className="contact-sub max-w-[480px] mx-auto mb-[50px]">{t.contact.sub}</p>

        <div className="focus-grid grid grid-cols-1 min-[521px]:grid-cols-2 min-[961px]:grid-cols-4 gap-5 text-left">
          {cards.map((c) => (
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
              className="focus-card relative overflow-hidden flex flex-col rounded-[var(--radius)] p-6"
              key={c.label}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="focus-icon shrink-0 grid place-items-center w-14 h-14 rounded-2xl">{ICONS[c.icon]}</span>
                <h4 className="text-[1.12rem] font-bold leading-tight">{c.label}</h4>
              </div>
              <span className="focus-rule block w-9 h-[3px] rounded-full mb-4 ml-[72px]" />
              <p className="focus-tags text-[0.9rem] font-medium mb-5 break-words">{c.value}</p>
              <span className="focus-arrow mt-auto self-end grid place-items-center w-9 h-9 rounded-full">{ICONS.arrow}</span>
            </a>
          ))}
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
