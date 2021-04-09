import React from 'react'

import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                {/* <!-- sidebar --> */}
                <div className='col-xl-2 col-lg-3 col-md-4 sidebar fixed-top'>
                    {/* <a
            href='#!'
            className='navbar-brand text-white d-block mx-auto text-center py-3 mb-4 bottom-border'
          > */}
                    {/* CodeAndCreate */}
                    {/* </a> */}
                    {/* <div className='bottom-border pb-3'> */}
                    {/* <img
              src='../images/admin.jpeg'
              alt='admin'
              width='50'
              className='rounded-circle mr-3'
            /> */}
                    {/* <a href='#!' className='text-white'>
              Mohamed Khadar
            </a> */}
                    {/* </div> */}
                    <ul className=' navbar-nav flex-column mt-4'>
                        <li className='nav-item'>
                            <Link
                                to='/'
                                className='nav-link text-white p-3 mb-2 sidebar-link'>
                                <i class='fas fa-home text-light fa-lg mr-3'></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className='nav-item  '>
                            <a
                                href='#!'
                                className='nav-link text-white p-3 mb-2 sidebar-link'>
                                <i className='fas fa-user text-light fa-lg mr-3'></i>
                                Manage Agent
                            </a>
                        </li>
                        <li className='nav-item'>
                            <div className='dropdown '>
                                <button
                                    className=' btn btn-secondary dropdown-toggle  nav-link text-white p-1 mb-2 sidebar-link'
                                    type='button'
                                    id='dropdownMenuButton'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'>
                                    <i className='fa-fw fas fa-users text-light fa-lg mr-1'></i>
                                    Users Management
                                </button>
                                <div
                                    className='dropdown-menu'
                                    aria-labelledby='dropdownMenuButton'>
                                    <Link
                                        to='/UserRegistration'
                                        className='dropdown-item'>
                                        Register user
                                    </Link>
                                    {/* <a className='dropdown-item' href='#!'>
                    Bus Registration
                  </a> */}
                                    <Link
                                        to='/UserRegistration/edit'
                                        className='dropdown-item'>
                                        Update user
                                    </Link>
                                    <Link
                                        to='/UserRegistration/delete'
                                        className='dropdown-item'>
                                        Delete user
                                    </Link>
                                </div>
                            </div>
                        </li>

                        <li className='nav-item'>
                            <a
                                href='#!'
                                className='nav-link text-white p-3 mb-2 sidebar-link'>
                                <i className='fas fa-shopping-cart text-light fa-lg mr-3'></i>
                                Payment Management
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                href='#!'
                                className='nav-link text-white p-3 mb-2 sidebar-link'>
                                <i className='fas fa-chart-line text-light fa-lg mr-3'></i>
                                Graph
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                href='#!'
                                className='nav-link text-white p-3 mb-2 sidebar-link'>
                                <i className='fas fa-chart-bar text-light fa-lg mr-3'></i>
                                Reports
                            </a>
                        </li>
                    </ul>
                </div>

                {/* <!-- end of sidebar --> */}
            </div>
        </div>
    )
}

export default Sidebar
