const {
  selectAllJobs,
  selectJob,
  insertJob,
  updateJob,
  countData,
  findIdJob,
  searchJobByName,
  searchJobByLocation,
  searchJobByType,
} = require("../models/jobs");

const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

let jobController = {
  getAllJobs: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "job_id";
      const sort = req.query.sort || "ASC";
      const searchName = req.query.searchName || "";
      const searchLocation = req.query.searchLocation || "";
      const searchType = req.query.searchType || "";
      const search = {
        searchName,
        searchLocation,
        searchType
    }
    console.log(search)
      const result = await selectAllJobs({
        limit,
        offset,
        sortby,
        sort,
        search
      });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "Get all jobs successfully!",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getDetailJob: async (req, res) => {
    const job_id = String(req.params.id);
    const { rowCount } = await findIdJob(job_id);
    if (!rowCount) {
      return res.json({ message: "ID is not found" });
    }

    selectJob(job_id)
      .then((result) => {
        // client.setEx(`products/${id}`,60*60,JSON.stringify(result.rows))
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  createJob: async (req, res) => {
    const { job_name, job_location, job_type, job_desc } = req.body;

    const job_id = uuidv4();

    const data = {
      job_id,
      job_name,
      job_location,
      job_type,
      job_desc,
    };

    console.log(data);
    insertJob(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Job created succesfully!")
      )
      .catch((err) => res.send(err));
  },
  updateJob: async (req, res) => {
    try {
      const job_id = String(req.params.id);
      const { job_name, job_location, job_type, job_desc } = req.body;

      const { rowCount } = await findIdJob(job_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }

      const data = {
        job_id,
        job_name,
        job_location,
        job_type,
        job_desc,
      };

      updateJob(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Job updated successfully!")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = jobController;
