import prisma from "@/lib/prisma"
import { jobFilterSchema } from "@/lib/validations"
import { JOBS_TYPES as jobTypes } from "@/constants/jobs.types"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

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

  // /?search=react&type=Full-time&location=Remote&remote=true
  redirect(`/${searchParams.toString()}`)
}

export default async function JobsFilterSidebar() {
  const distinctLocations = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ["location"],
  })

  const locations = distinctLocations
    .map((job) => job.location)
    .filter(Boolean) as string[]

  return (
    <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className=" flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input name="search" placeholder="Search jobs" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {jobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="scale-125 accent-black"
              id="remote"
              name="remote"
              type="checkbox"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button className="w-full" type="submit">
            Apply filters
          </Button>
        </div>
      </form>
    </aside>
  )
}
