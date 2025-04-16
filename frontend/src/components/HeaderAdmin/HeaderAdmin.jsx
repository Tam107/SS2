import { Tooltip } from 'antd'
import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LuGitPullRequestCreateArrow } from 'react-icons/lu';

const HeaderAdmin = () => {
  return (
    <>
        <div className="h-14 flex items-center justify-end">
            <div className="flex items-center justify-between mr-4 gap-6">
            <div className="flex items-center">
            <Tooltip title="Request as a teacher" arrow>
                <LuGitPullRequestCreateArrow
                    className="text-gray-600 cursor-pointer"
                    size="30"
                />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <Tooltip title="Dashboard" arrow>
                <DashboardIcon
                    className="text-gray-600 cursor-pointer"
                    fontSize="large"
                />
                </Tooltip>
              </div>
             
            </div>
          </div>
    </>
  )
}

export default HeaderAdmin
