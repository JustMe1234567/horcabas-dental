import { clinic } from "@/lib/clinic";
import { Icon } from "./Icon";

export function TopInfoBar() {
  return <div className="bg-deep-navy text-white"><div className="container-page flex min-h-11 flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 text-xs md:justify-between">
    <a href={clinic.mapHref} target="_blank" rel="noreferrer" className="hidden min-h-8 items-center gap-2 hover:text-[#8ed8f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex"><Icon name="pin" className="h-4 w-4 shrink-0 text-[#68c7e8]"/>Lower Langcangan, Oroquieta City</a>
    <span className="hidden items-center gap-2 lg:flex"><Icon name="clock" className="h-4 w-4 text-[#68c7e8]"/>Appointments scheduled by phone</span>
    <a href={clinic.phoneHref} className="flex min-h-8 items-center gap-2 font-semibold hover:text-[#8ed8f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Icon name="phone" className="h-4 w-4 text-[#68c7e8]"/>{clinic.phoneDisplay}</a>
  </div></div>;
}
