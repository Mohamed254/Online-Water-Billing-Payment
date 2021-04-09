import Axios from 'axios'
import React, { useState } from 'react'
import Modal from '../common/modal/Modal'
import DatePicker from 'react-date-picker'

function EditReadingModal({ toggle, user, readings, setReadings, reading }) {
    const [value, setValue] = useState({
        reading: reading?.reading,
        error: null,
    })
    const [date, onChange] = useState(new Date(reading.readingDate))

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!value.reading) {
            setValue({ ...value, error: 'reading is required' })

            setTimeout(() => {
                setValue({ ...value, error: null })
            }, 4000)

            return
        }

        const newReading = {
            userId: user?._id,
            reading: value.reading,
            readingDate: date,
            meterNo: user?.meterNo,
        }

        const config = { headers: { 'Content-Type': 'application/json' } }
        const url = `/api/readings/${reading?._id}`

        const { data } = await Axios.patch(url, newReading, config)

        const newReadings = readings.map((reading) => {
            if (reading?._id === data.reading._id) {
                reading = data.reading
            }
            return reading
        })

        setReadings(newReadings)
        toggle()

        return
    }
    return (
        <div className='readingform my-4'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Reading</label>
                    <input
                        className='form-control'
                        placeholder='Edit reading'
                        type='text'
                        name='reading'
                        required
                        value={value.reading}
                        onChange={handleChange}
                    />
                    {value.error && <small>{value.error}</small>}
                </div>
                <div className='form-group'>
                    <label>Reading</label>
                    <DatePicker
                        onChange={onChange}
                        value={date}
                        className='form-control'
                    />
                </div>

                <button className='btn text-black block' type='submit'>
                    Edit reading
                </button>
            </form>
        </div>
    )
}

export default EditReadingModal
