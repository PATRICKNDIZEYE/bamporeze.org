export const jobTypes = [
    {
        label: 'Undergraduate',
        value: 'UNDERGRADUATE'
    },
    {
        label: 'Postgraduate',
        value: 'POSTGRADUATE'
    },
    {
        label: 'Doctorate',
        value: 'DOCTORATE'
    },

]

export const formatJobType = (jobtype: string) => {
    return jobTypes.find(job => job.value)!.label;
}