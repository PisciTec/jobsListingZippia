import React, { useEffect, useState } from "react";

import styled from 'styled-components'
import Head from 'next/head';
import axios from 'axios';

const apiJobs = axios.create({baseURL:
  "https://www.zippia.com/api/"
})




const ListJobs = styled.div`
  width:40%;
  display: flex;
  flex-direction: column;
  flex:1;
`
const CompanyLogoImg = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius:2px !important;
  img {
    max-height:100%;
    max-height:100%;
  }
  margin-right: 1rem;
`
const CorpoJobs = styled.div`
    width:100%;
    justify-content:center;
    display: flex;
    flex:1;
`
const NewJobText = styled.div`
  display: flex;
  flex-direction: column;
  div:first-child{
    max-width: 310px;
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
    line-height: 22px;
  }
` 

NewJobText.Details = styled.div`
  margin-top: 20px;
  padding: 0px;
  span:first-child {
    color: #333;
    font-weight: 600;
  }
  .wrapper{
    width: 100% !important;
    display:flex;
    flex-direction: row !important;
    justify-content: space-between !important;
  }
  .salary {
    width: 100% !important;
  }
  .postedDate {
    width: 100% !important;
  }
`

const JobItem = styled.button`
  display: flex;
  padding:20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  margin-top:30px;
`
const JobHighlights = styled.div`
  display: flex;
  padding:20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  margin-top:30px;

`
const JobInfo = styled.div`
  margin-left: 30px;
  width:60%;
`
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
const [jobsUpdated, setJobsUpdated] = useState([])
const [selectedJob, setSelectedJob] = useState({})

function selectJob(key) {
  const job = jobsUpdated.find(element => element.listingHash === key);
  if(job != undefined)
    setSelectedJob(job)
}

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    const jobs = {
      "companySkills": true,
      "dismissedListingHashes": [],
      "fetchJobDesc": true,
      "jobTitle": "Business Analyst",
      "locations": [],
      "numJobs": 20,
      "previousListingHashes": []
      };
    apiJobs.post('jobs', jobs)  
        .then(response => {
          console.log(response.data)
          setJobsUpdated(response.data.jobs)});
    console.log(jobsUpdated);

// empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (<>
    <Head>
      <title>Developer Jobs</title>
    </Head>
    <Title>DEVELOPER JOBS NEAR ME</Title>
    <CorpoJobs>
      <ListJobs>
        {jobsUpdated.map((item)=>{
          return (
          <JobItem key={item.listingHash} className="jobitem" onClick={(e)=>selectJob(item.listingHash)}>
          <CompanyLogoImg>
            <img width="auto" height="auto" src={item.companyLogo}></img>
          </CompanyLogoImg>
          <NewJobText>
            <div>{item.jobTitle}</div>
            <NewJobText.Details>
              <span>{item.companyName}</span><br></br>
              {item.location}
              <div className="wrapper">
                <span className="salary">{item.estimatedSalary}</span><span className="postedDate">{item.postedDate}</span>
              </div>
            </NewJobText.Details>
          </NewJobText>
        </JobItem>)
        })}
      </ListJobs>
      {selectedJob != null && 
      <JobInfo>
        <JobHighlights>
          <CompanyLogoImg>
              <img width="auto" height="auto" src={selectedJob.companyLogo}></img>
            </CompanyLogoImg>
            <NewJobText>
              <div>{selectedJob.jobTitle}</div>
              <NewJobText.Details>
                <span>{selectedJob.companyName}</span><br></br>
                {selectedJob.location}
                <div className="wrapper">
                  <span className="salary">{selectedJob.estimatedSalary}</span><span className="postedDate">{selectedJob.postedDate}</span>
                </div>
              </NewJobText.Details>
            </NewJobText>
          </JobHighlights>
      </JobInfo> 
      }     
    </CorpoJobs>
  </>
  ) 

}
