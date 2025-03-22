'use client'

import { Button, Text } from '@repo/ui/units'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR from 'swr'
import SectionTitle from '../../../components/sectionTitle'
import Loading from '../../../components/units/loading'
import CustomTable from '../../../components/units/table'
import useGlobalCtx from '../../../hooks/useGlobalContext'
import useModal from '../../../hooks/useModal'
import { fetcher } from '../../../utils/axios.config'
import AddJobPosition from './addJob'

export default function NewsletterReleases() {
  const { setModal } = useModal()
  const { jobs, setJobs } = useGlobalCtx()
  const { data, isLoading, mutate } = useSWR('/jobs', fetcher)

  useEffect(() => {
    if (data) setJobs(data)
  }, [data])
  return (
    <div className="p-5">
      {isLoading ? (
        <Loading />
      ) : (
        jobs && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <SectionTitle
                title="Admissions"
                description="Manage admissions"
              />
              <Button
                variant={'secondary'}
                onClick={() => setModal(<AddJobPosition onDone={mutate} />)}
              >
                Add Program
              </Button>
            </div>
            <div>
              <CustomTable
                columns={['Title', 'Applicants', 'actions']}
                data={jobs.map((datum,i) => {
                  return {
                    title: (
                      <div className="flex items-center gap-4" key={i}> 
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-4">
                            <Text variant={'heading4'}>{datum.title} </Text>
                            {datum.isOpen && (
                              <span className="text-green-600 bg-green-100 p-1 rounded-lg">
                                Active
                              </span>
                            )}
                          </div>
                          <Text variant={'paragraph'}>{datum.location} </Text>
                        </div>
                      </div>
                    ),
                    applicants: (
                      <Text variant={'paragraph'}>
                        {' '}
                        {datum.applications.length}&nbsp;Applicants{' '}
                      </Text>
                    ),
                    actions: (
                      <Link
                        href={`/p/admissions/${datum.id}`}
                        className="text-brand-darkblue"
                      >
                        Details
                      </Link>
                    ),
                  }
                })}
                addCheckbox={true}
                addPagination={true}
                addSearch={true}
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}