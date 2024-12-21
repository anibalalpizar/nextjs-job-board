import prisma from "@/lib/prisma"
import JobListItem from "@/components/JobsListItem"
import JobsFilterSidebar from "@/components/JobsFilterSidebar"
import H1 from "@/components/ui/h1"

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  })
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
        <JobsFilterSidebar />
        <div className="grow space-y-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  )
}
