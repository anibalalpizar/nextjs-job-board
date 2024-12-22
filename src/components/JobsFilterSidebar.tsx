import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { type JobFilter, jobFilterSchema } from "@/lib/validations"
import { JOBS_TYPES as jobTypes } from "@/constants/jobs.types"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"
import FormSubmitButton from "./FormSubmitButton"

async function filterJobs(formData: FormData) {
  "use server"

  const values = Object.fromEntries(formData.entries())

  const { search, type, location, remote } = jobFilterSchema.parse(values)

  const searchParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  })

  redirect(`/?${searchParams.toString()}`)
}

interface JobFilterSidebarProps {
  defaultValues: JobFilter
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              name="search"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.search}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Apply filters</FormSubmitButton>
        </div>
      </form>
    </aside>
  )
}
