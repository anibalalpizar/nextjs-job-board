import Image from "next/image"
import type { Job } from "@prisma/client"
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react"
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png"

import { formatCurrency, formatRelativeDate } from "@/lib/utils"
import { Badge } from "./ui/badge"

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: {
  job: Job
}) {
  return (
    <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
      <Image
        className="rounded-lg self-center"
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase className="shrink-0" size={16} /> {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="shrink-0" size={16} />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 className="shrink-0" size={16} />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote className="shrink-0" size={16} />
            {formatCurrency(salary, "USD")}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock className="shrink-0" size={16} />
            {formatRelativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="shrink-0" size={16} />
          {formatRelativeDate(createdAt)}
        </span>
      </div>
    </article>
  )
}
