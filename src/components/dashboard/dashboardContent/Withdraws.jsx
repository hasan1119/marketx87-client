import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Withdraws = () => {
    return (
        <>
            <ul className="nav nav-tabs d-flex gap-4 p-3" role="tablist">
                <li role="presentation" className="active">
                    <NavLink
                        to="/dashboard/withdraws/withdraw"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "my_job_tab_active" : ""
                        }
                        role="tab"
                        data-toggle="tab"
                    >
                        withdraws
                    </NavLink>
                </li>
                <li role="presentation">
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "my_job_tab_active" : ""
                        }
                        to="/dashboard/withdraws/withdraws-list"
                        role="tab"
                        data-toggle="tab"
                    >
                        Withdraws List
                    </NavLink>
                </li>
            </ul>
            <div className="mx-3 my-2">
                <Outlet />
            </div>
        </>
    );
};

export default Withdraws;