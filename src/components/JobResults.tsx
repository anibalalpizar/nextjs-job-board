import prisma from "@/lib/prisma"
import JobListItem from "./JobsListItem"
import type { JobFilter } from "@/lib/validations"
import { Prisma } from "@prisma/client"

interface JobResultsProps {
  filterValues: JobFilter
}

export default async function JobResults({
  filterValues: { search, type, location, remote },
}: JobResultsProps) {
  // "react developer" => "react & developer"
  const searchString = search
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ")

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { companyName: { contains: searchString } },
          { type: { contains: searchString } },
          { locationType: { contains: searchString } },
          { location: { contains: searchString } },
        ],
      }
    : {}

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found with the selected filters.
        </p>
      )}
    </div>
  )
}
