import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../reducers/user.reducer";



const Edit = () => {
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector((state) => state.auth)
    const [username, setUsername] = useState(user?.userName || '')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setUsername(e.target.value)
        setSuccess(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Payload envoyé:", { username })
        dispatch(updateUserProfile({ userName: username }))
        if (!error) {
            setSuccess(true)
        }
    }


    return (
        <main className="main bg-dark">
            <div className="sign-in-content">
                <h1>Edit user info</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">User name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="firstname">First name</label>
                        <input
                            type="text"
                            id="firstname"
                            value={user?.firstName}
                            className="input-off"
                            disabled
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            value={user?.lastName}
                            className="input-off"
                            disabled
                        />
                    </div>
                    <div className="edit-buttons-flex">
                        <Link to={`/user`}>
                            <button className="edit-button">Cancel</button>
                        </Link>
                        <button type="submit" className="edit-button" disabled={loading}>
                            {loading ? 'loading...' : "Save"}
                        </button>

                    </div>
                    {error && <p>{error}</p>}
                    {success && <p className="edit-success">Profile update !</p>}
                </form>
            </div>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
            </section>
        </main>
    )
}

export default Edit;