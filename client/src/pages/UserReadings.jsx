import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import AddReadingModal from '../components/modals/AddReadingModal'
import EditReadingModal from '../components/modals/EditReading'

function UserReadings() {
    const { state } = useLocation()
    const [userReadings, setUserReadings] = useState([])
    const [prevReading, setPrevReading] = useState({})
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const fetchUserReadings = useCallback(async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }
            const url = `/api/readings/${state?._id}`

            const { data } = await axios.get(url, config)

            console.log(data)

            if (!data.length) {
                setUserReadings([])
                return
            }

            setUserReadings(data)
        } catch (error) {
            throw error
        }
    }, [state?.uid])

    useEffect(() => {
        fetchUserReadings()
    }, [fetchUserReadings])

    const deleteUserReading = async (id) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }
            const url = `/api/readings/${id}`

            const { data } = await axios.delete(url, config)

            const newReadings = userReadings.filter(
                (reading) => reading?._id !== data?.reading._id
            )

            setUserReadings(newReadings)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUserReadings()
    }, [fetchUserReadings])

    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    const toggleEdit = () => {
        setOpenEdit((prevState) => !prevState)
    }
    return (
        <>
            <Sidebar />
            <div className='userreadings'>
                <Navbar />
                <div className='userreadings__wrapper'>
                    <div className='userreadings__wrapper--header'>
                        <h2>{state?.firstname}'s readings</h2>
                        <button
                            className='btn btn--addreading'
                            onClick={toggle}>
                            Add reading
                        </button>
                    </div>
                    {open && (
                        <AddReadingModal
                            toggle={toggle}
                            user={state}
                            readings={userReadings}
                            setReadings={setUserReadings}
                        />
                    )}
                    {openEdit && (
                        <EditReadingModal
                            toggle={toggleEdit}
                            user={state}
                            readings={userReadings}
                            setReadings={setUserReadings}
                            reading={prevReading}
                        />
                    )}

                    <div className='userreadings__wrapper--table'>
                        <table className='readings--table'>
                            {!userReadings.length ? (
                                <caption className='text-center my-4'>
                                    No readings available
                                </caption>
                            ) : (
                                <caption className='text-center my-4'>
                                    {state?.firstname}'s water bill readings
                                </caption>
                            )}

                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>UserId</th>
                                    <th>Reading (units)</th>
                                    <th>Reading Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userReadings &&
                                    userReadings.map((reading, index) => (
                                        <tr
                                            key={reading?._id}
                                            className='mt-4'
                                            style={{ height: '3rem' }}>
                                            <td>{index}</td>
                                            <td>{reading?.userId}</td>
                                            <td>{reading?.reading} units</td>
                                            <td>
                                                {new Date(
                                                    reading?.readingDate
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setPrevReading(reading)
                                                        toggleEdit()
                                                    }}>
                                                    <i className='fas fa-pencil-alt'></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={async () => {
                                                        await deleteUserReading(
                                                            reading?._id
                                                        )
                                                    }}>
                                                    <i className='fas fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserReadings
