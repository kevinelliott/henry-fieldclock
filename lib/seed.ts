import { createServiceClient } from './supabase'

export async function seedDemoData() {
  const supabase = createServiceClient()

  // Create a demo company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: 'Demo Field Services LLC',
      overtime_threshold_hours: 8,
      gps_radius_feet: 500,
    })
    .select()
    .single()

  if (companyError) {
    console.error('Error creating company:', companyError)
    return
  }

  // Create demo workers
  const { data: workers, error: workersError } = await supabase
    .from('workers')
    .insert([
      {
        company_id: company.id,
        name: 'Mike Johnson',
        email: 'mike@demo.com',
        phone: '555-0101',
        role: 'field',
        hourly_rate: 28,
        worker_token: 'demo-token-1',
      },
      {
        company_id: company.id,
        name: 'Sarah Williams',
        email: 'sarah@demo.com',
        phone: '555-0102',
        role: 'field',
        hourly_rate: 32,
        worker_token: 'demo-token-2',
      },
      {
        company_id: company.id,
        name: 'Carlos Rivera',
        email: 'carlos@demo.com',
        phone: '555-0103',
        role: 'lead',
        hourly_rate: 40,
        worker_token: 'demo-token-3',
      },
    ])
    .select()

  if (workersError) {
    console.error('Error creating workers:', workersError)
    return
  }

  // Create demo jobs
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .insert([
      {
        company_id: company.id,
        name: 'HVAC Installation - Oak Street',
        client_name: 'Johnson Family',
        address: '123 Oak Street, Springfield, IL 62701',
        latitude: 39.7817,
        longitude: -89.6501,
        status: 'active',
        start_date: '2026-03-01',
        end_date: '2026-03-15',
      },
      {
        company_id: company.id,
        name: 'Plumbing Repair - Elm Ave',
        client_name: 'Riverside Apartments',
        address: '456 Elm Avenue, Springfield, IL 62702',
        latitude: 39.7950,
        longitude: -89.6440,
        status: 'active',
        start_date: '2026-03-05',
        end_date: '2026-03-20',
      },
    ])
    .select()

  if (jobsError) {
    console.error('Error creating jobs:', jobsError)
    return
  }

  // Create demo time entries
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (workers && workers.length > 0 && jobs && jobs.length > 0) {
    const { error: entriesError } = await supabase
      .from('time_entries')
      .insert([
        {
          worker_id: workers[0].id,
          job_id: jobs[0].id,
          clock_in: new Date(today.getTime() + 8 * 60 * 60 * 1000).toISOString(),
          clock_out: new Date(today.getTime() + 16 * 60 * 60 * 1000).toISOString(),
          clock_in_lat: 39.7817,
          clock_in_lng: -89.6501,
          clock_out_lat: 39.7817,
          clock_out_lng: -89.6501,
          hours_worked: 8,
          notes: 'Completed unit installation',
        },
        {
          worker_id: workers[1].id,
          job_id: jobs[1].id,
          clock_in: new Date(today.getTime() + 7 * 60 * 60 * 1000).toISOString(),
          clock_out: new Date(today.getTime() + 15.5 * 60 * 60 * 1000).toISOString(),
          clock_in_lat: 39.7950,
          clock_in_lng: -89.6440,
          clock_out_lat: 39.7950,
          clock_out_lng: -89.6440,
          hours_worked: 8.5,
          notes: 'Main line repair',
        },
        {
          worker_id: workers[2].id,
          job_id: jobs[0].id,
          clock_in: new Date(today.getTime() + 8 * 60 * 60 * 1000).toISOString(),
          clock_out: null,
          clock_in_lat: 39.7817,
          clock_in_lng: -89.6501,
          clock_out_lat: null,
          clock_out_lng: null,
          hours_worked: null,
          notes: null,
        },
      ])

    if (entriesError) {
      console.error('Error creating time entries:', entriesError)
      return
    }
  }

  console.log('Demo data seeded successfully!')
  return { company, workers, jobs }
}
