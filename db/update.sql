UPDATE lists
SET company_name = 'T4', job_title = 'barista', city = 'Milpitas', website = null,
    apply_date = null, app_status = 'applied', interview_date = null, 
    notes = 'testing testing 123'
WHERE user_id = '1' AND company_name = 'McDonalds'AND job_title = 'Hamburger Flipper' AND city = 'SF'
RETURNING *;