const Pool = require("../config/db");

const selectAllJobs = ({ limit, offset, sort, sortby, search }) => {
    let query = 'SELECT * FROM jobs'
    let where = false
    if (search?.searchName) {
        if (where === false) {
            query += ` WHERE job_name ILIKE '%${search.searchName}%'`
            where = true
        } else {
            query += ` AND job_name ILIKE '%${search.searchName}%'`
        }
    }

    if (search?.searchLocation) {
        if (where === false) {
            query += ` WHERE job_location ILIKE '%${search.searchLocation}%'`
            where = true
        } else {
            query += ` AND job_location ILIKE '%${search.searchLocation}%'`
        }
    }

    if (search?.searchType) {
        if (where === false) {
            query += ` WHERE job_type ILIKE '%${search.searchType}%'`
            where = true
        } else {
            query += ` AND job_type ILIKE '%${search.searchType}%'`
        }
    }

    query += ` ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    console.log(query)
    return Pool.query(query);
};

const selectJob = (job_id) => {
    return Pool.query(`SELECT * FROM jobs WHERE job_id = '${job_id}'`); 
};

const insertJob = (data) => {
    const { job_id, job_name, job_location, job_type, job_desc } = data;
    return Pool.query(
        `INSERT INTO jobs(job_id, job_name, job_location, job_type, job_desc) VALUES($1, $2, $3, $4, $5)`,
        [job_id, job_name, job_location, job_type, job_desc]
    );
};

const updateJob = (data) => {
    const { job_id, job_name, job_location, job_type, job_desc } = data;
    return Pool.query(
        `UPDATE jobs SET job_name = '${job_name}', job_location = '${job_location}', job_type = '${job_type}' , job_desc = '${job_desc}' WHERE job_id = '${job_id}'`
    );
};

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM jobs");
};

const findIdJob = (job_id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT job_id FROM jobs WHERE job_id = '${job_id}'`, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err);
            }
        })
    );
};

module.exports = {
    selectAllJobs,
    selectJob,
    insertJob,
    updateJob,
    countData,
    findIdJob,
};
