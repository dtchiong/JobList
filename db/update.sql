UPDATE lists
SET company_name = 'T4', job_title = 'barista', website = null, area = 'Milpitas',
    apply_method = 'online', apply_date = null, got_response = false,
    app_status = 'applied', interview_date = null, notes = 'testing testing 123'
WHERE user_id = '1' AND company_name = 'McDonalds'AND job_title = 'Hamburger Flipper'
RETURNING *;