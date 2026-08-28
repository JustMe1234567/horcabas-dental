import { Icon } from "./Icon";

const reviews = [
  { quote: "The team explained everything clearly and made my visit feel completely stress-free.", name: "Sample Patient", place: "Oroquieta City" },
  { quote: "A bright, clean clinic with genuinely kind staff. Our whole family feels well cared for.", name: "Sample Patient", place: "Misamis Occidental" },
  { quote: "Professional, gentle, and attentive. I left feeling confident about my treatment plan.", name: "Sample Patient", place: "Oroquieta City" },
];

export function Testimonials() {
  return <section id="reviews" className="section-pad bg-pale-blue"><div className="container-page"><div className="text-center"><p className="eyebrow">What our patients say</p><h2 className="section-title">Trusted by Happy Smiles</h2><p className="mx-auto mt-4 max-w-xl text-sm text-muted">Sample testimonials shown for layout preview. Replace with verified patient feedback before publishing.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.map(({ quote, name, place }, index) => <figure key={index} className="card p-7"><Icon name="quote" className="h-8 w-8 text-dental" /><div className="mt-4 tracking-[.18em] text-[#b97812]" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-4 leading-7 text-body">“{quote}”</blockquote><figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-light-blue font-serif font-bold text-dental" aria-hidden="true">S</span><span><strong className="block text-sm text-navy">{name}</strong><span className="text-xs text-muted">{place}</span></span></figcaption></figure>)}</div></div></section>;
}
