import type { JobFilter } from "@/lib/validations"
import JobsFilterSidebar from "@/components/JobsFilterSidebar"
import H1 from "@/components/ui/h1"
import JobResults from "@/components/JobResults"

interface PageProps {
  searchParams: {
    search?: string
    type?: string
    location?: string
    remote?: string
  }
}

export default async function Home(props: PageProps) {
  const { searchParams } = props
  const { search, type, location, remote } = await searchParams

  const filterValues: JobFilter = {
    search,
    type,
    location,
    remote: remote === "true",
  }

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your next job</H1>
        <p className="text-muted-foreground">
          Browse through thousands of full-time or part-time jobs near you or
          worldwide.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobsFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
