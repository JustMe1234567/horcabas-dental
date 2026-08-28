import { clinic } from "@/lib/clinic";
import { Icon, type IconName } from "./Icon";

const services: { icon: IconName; title: string; body: string }[] = [
  { icon: "tooth", title: "Dental Consultation", body: "Clear assessments and guidance for your oral health needs." },
  { icon: "sparkle", title: "Oral Prophylaxis", body: "Gentle professional cleaning for a fresher, healthier smile." },
  { icon: "shield", title: "Tooth Extraction", body: "Careful treatment focused on safety, comfort, and recovery." },
  { icon: "heart", title: "Teeth Whitening", body: "Professional care to help brighten your natural smile." },
  { icon: "users", title: "Dental Fillings", body: "Restorative treatment designed to protect comfort and function." },
];

export function Services() {
  return <section id="services" className="section-pad scroll-mt-8 bg-white"><div className="container-page"><div className="grid gap-6 md:grid-cols-[1fr_.75fr] md:items-end"><div><p className="eyebrow">Our dental services</p><h2 className="section-title max-w-xl">Comprehensive Care for a Healthy Smile</h2></div><p className="max-w-xl leading-7 md:justify-self-end">From preventive care to restorative treatment, our clinic provides professional dental services for patients of all ages.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{services.map(({ icon, title, body }) => <article key={title} className="card group p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-soft"><span className="grid h-12 w-12 place-items-center rounded-full bg-light-blue text-dental"><Icon name={icon} className="h-7 w-7" /></span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p><a href={clinic.phoneHref} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-dental focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dental">Call to learn more <Icon name="arrow" className="h-4 w-4" /></a></article>)}</div></div></section>;
}
