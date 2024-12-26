"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { draftToMarkdown } from "markdown-draft-js"
import { X } from "lucide-react"

import { CreateJob, createJobSchema } from "@/lib/validations"
import {
  JOBS_TYPES as jobs_types,
  LOCATIONS_TYPES as locations_types,
} from "@/constants/jobs.types"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import H1 from "@/components/ui/h1"
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import LocationInput from "@/components/LocationInput"
import { Label } from "@/components/ui/label"
import RichTextEditor from "@/components/RichTextEditor"
import LoadingButton from "@/components/LoadingButton"

export default function NewJobForm() {
  const form = useForm<CreateJob>({
    resolver: zodResolver(createJobSchema),
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: CreateJob) {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="">
        <div className="space-y-5 text-center">
          <H1>Find your perfect developer</H1>
          <p className="text-muted-foreground">
            We have the best developers in the world. You can find the perfect
            developer for your project here
          </p>
        </div>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <div>
          <h2 className="font-semibold">Job Details</h2>
          <p className="text-muted-foreground">
            Provide the details of the job you want to post
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior React Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select Job Type
                      </option>
                      {jobs_types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onChange={(e) => {
                        field.onChange(e)
                        if (e.currentTarget.value === "Remote") {
                          setValue("location", "Remote", {
                            shouldValidate: true,
                          })
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select Job Type
                      </option>
                      {locations_types.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true })
                        }}
                        type="button"
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email address"
                            type="email"
                            {...field}
                          />
                          <span className="mx-auto">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            trigger("applicationEmail")
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. $50,000"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Post Job
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  )
}
